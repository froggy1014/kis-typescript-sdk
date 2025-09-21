import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { getApiInfo, getTrId, supportsMockTrading } from "../utils/kis-tr-id-mappings";

/**
 * URL에서 /uapi 접두사를 제거하고 TR_ID를 가져오는 함수
 */
function getTrIdFromUrl(url: string, environment: "real" | "mock" = "real"): string | undefined {
  // 쿼리 파라미터 제거
  const pathWithoutQuery = url.split("?")[0];

  // /uapi 접두사 제거
  const normalizedPath = pathWithoutQuery.replace(/^\/uapi/, "");

  // 매핑된 TR_ID 조회
  const trId = getTrId(normalizedPath, environment);

  if (trId) {
    return trId;
  }

  // OAuth 엔드포인트 특별 처리
  if (pathWithoutQuery.includes("/oauth2/")) {
    return "OAUTH2";
  }

  return undefined;
}

// Axios 인스턴스 설정 (템플릿)
export const customInstance = axios.create({
  baseURL: process.env.KIS_BASE_URL || "https://openapi.koreainvestment.com:9443",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
customInstance.interceptors.request.use(
  (config) => {
    // 요청 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      const method = config.method?.toUpperCase();
      const logData: Record<string, any> = {};

      if (config.data) {
        logData.data = config.data;
      }
      if (config.params) {
        logData.params = config.params;
      }

      console.log(`[API Request] ${method} ${config.url}`, logData);
    }

    config.headers.appkey = process.env.KIS_APP_KEY;
    config.headers.appsecret = process.env.KIS_APP_SECRET;
    config.headers.Authorization = `Bearer ${process.env.KIS_ACCESS_TOKEN}`;
    config.headers.custtype = process.env.KIS_CUST_TYPE;

    // 환경 감지 (모의투자 vs 실전투자)
    const baseUrl = config.baseURL || customInstance.defaults.baseURL || "";
    const isMockTrading = baseUrl.includes("openapivts") || baseUrl.includes("29443");
    const environment = isMockTrading ? "mock" : "real";

    // URL에 따라 자동으로 TR_ID 설정
    const trId = getTrIdFromUrl(config.url || "", environment);
    if (trId) {
      config.headers.tr_id = trId;
      if (process.env.NODE_ENV === "development") {
        const normalizedUrl = (config.url || "").replace(/^\/uapi/, "");
        const apiInfo = getApiInfo(normalizedUrl);
        console.log(`[TR_ID Auto Mapping] ${config.url} -> ${trId} (${environment})`);
        if (apiInfo) {
          console.log(`[API Info] ${apiInfo.name} (${apiInfo.category})`);
          if (environment === "mock" && !supportsMockTrading(normalizedUrl)) {
            console.warn(`[Mock Trading Warning] This endpoint may not support mock trading`);
          }
        }
      }
    } else {
      // 매핑되지 않은 경우 환경변수 폴백 또는 경고
      const fallbackTrId = process.env.KIS_TR_ID;
      if (fallbackTrId) {
        config.headers.tr_id = fallbackTrId;
        console.warn(`[TR_ID Warning] No mapping found for ${config.url}, using fallback: ${fallbackTrId}`);
      } else {
        console.warn(`[TR_ID Warning] No TR_ID found for ${config.url} and no fallback set`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
customInstance.interceptors.response.use(
  (response) => {
    // 응답 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    // 에러 핸들링 로직
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    console.error(`[API Error] ${status || "Network"}: ${message}`);

    // 특정 에러 코드에 대한 전역 처리
    if (status === 401) {
      // 인증 만료 처리
      console.warn("Authentication failed");
    }

    return Promise.reject(error);
  },
);

// orval에서 사용할 admin instance 함수
export const kisInstance = <T = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return customInstance(config);
};

export default kisInstance;
