import { getApiInfo, getTrId, STATISTICS, supportsMockTrading } from "./kis-tr-id-mappings";

/**
 * URL에서 TR_ID를 가져오는 헬퍼 함수
 */
export function getTrIdForEndpoint(path: string, environment: "real" | "mock" = "real"): string | undefined {
  // /uapi 접두사 제거
  const normalizedPath = path.replace(/^\/uapi/, "");

  // 쿼리 파라미터 제거
  const pathWithoutQuery = normalizedPath.split("?")[0];

  return getTrId(pathWithoutQuery, environment);
}

/**
 * 환경 감지 함수 (baseURL 기반)
 */
export function detectEnvironment(baseURL: string): "real" | "mock" {
  return baseURL.includes("openapivts") || baseURL.includes("29443") ? "mock" : "real";
}

/**
 * API 엔드포인트 정보 조회
 */
export function getEndpointInfo(path: string) {
  const normalizedPath = path.replace(/^\/uapi/, "").split("?")[0];
  return getApiInfo(normalizedPath);
}

/**
 * 모의투자 지원 여부 확인
 */
export function isMockTradingSupported(path: string): boolean {
  const normalizedPath = path.replace(/^\/uapi/, "").split("?")[0];
  return supportsMockTrading(normalizedPath);
}

/**
 * API 통계 정보 반환
 */
export function getApiStatistics() {
  return STATISTICS;
}

/**
 * 한국투자증권 API 클라이언트 클래스
 */
export class KoreaInvestmentClient {
  private baseURL: string;
  private environment: "real" | "mock";

  constructor(baseURL: string = "https://openapi.koreainvestment.com:9443") {
    this.baseURL = baseURL;
    this.environment = detectEnvironment(baseURL);
  }

  /**
   * 환경 설정 변경
   */
  setEnvironment(environment: "real" | "mock") {
    this.environment = environment;
    this.baseURL =
      environment === "mock"
        ? "https://openapivts.koreainvestment.com:29443"
        : "https://openapi.koreainvestment.com:9443";
  }

  /**
   * 현재 환경 반환
   */
  getEnvironment(): "real" | "mock" {
    return this.environment;
  }

  /**
   * baseURL 반환
   */
  getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * 엔드포인트의 TR_ID 조회
   */
  getTrIdForEndpoint(path: string): string | undefined {
    return getTrIdForEndpoint(path, this.environment);
  }

  /**
   * 엔드포인트 정보 조회
   */
  getEndpointInfo(path: string) {
    return getEndpointInfo(path);
  }

  /**
   * 모의투자 지원 여부 확인
   */
  isMockTradingSupported(path: string): boolean {
    return isMockTradingSupported(path);
  }

  /**
   * 모의투자에서 지원되지 않는 엔드포인트 사용 시 경고
   */
  validateEndpoint(path: string): { isValid: boolean; warning?: string } {
    if (this.environment === "mock" && !this.isMockTradingSupported(path)) {
      return {
        isValid: false,
        warning: `This endpoint (${path}) does not support mock trading`,
      };
    }

    const trId = this.getTrIdForEndpoint(path);
    if (!trId) {
      return {
        isValid: false,
        warning: `No TR_ID mapping found for endpoint: ${path}`,
      };
    }

    return { isValid: true };
  }
}
