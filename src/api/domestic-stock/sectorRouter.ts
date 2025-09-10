import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

extendZodWithOpenApi(z);

export const domesticSectorRegistry = new OpenAPIRegistry();
export const domesticSectorRouter: Router = express.Router();

// Common response schemas
const CommonResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
});

// 1. 국내업종 현재지수
const IndexPriceQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드 (업종: U)"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드 (코스피:0001, 코스닥:1001, 코스피200:2001)"),
});

const IndexPriceResponseSchema = CommonResponseSchema.extend({
  output: z.object({
    bstp_nmix_prpr: z.string().describe("업종 지수 현재가"),
    bstp_nmix_prdy_vrss: z.string().describe("업종 지수 전일 대비"),
    prdy_vrss_sign: z.string().describe("전일 대비 부호"),
    bstp_nmix_prdy_ctrt: z.string().describe("업종 지수 전일 대비율"),
    acml_vol: z.string().describe("누적 거래량"),
    prdy_vol: z.string().describe("전일 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
    prdy_tr_pbmn: z.string().describe("전일 거래 대금"),
    bstp_nmix_oprc: z.string().describe("업종 지수 시가"),
    prdy_nmix_vrss_nmix_oprc: z.string().describe("전일 지수 대비 지수 시가"),
    oprc_vrss_prpr_sign: z.string().describe("시가 대비 현재가 부호"),
    bstp_nmix_oprc_prdy_ctrt: z.string().describe("업종 지수 시가 전일 대비율"),
    bstp_nmix_hgpr: z.string().describe("업종 지수 최고가"),
    prdy_nmix_vrss_nmix_hgpr: z.string().describe("전일 지수 대비 지수 최고가"),
    hgpr_vrss_prpr_sign: z.string().describe("최고가 대비 현재가 부호"),
    bstp_nmix_hgpr_prdy_ctrt: z.string().describe("업종 지수 최고가 전일 대비율"),
    bstp_nmix_lwpr: z.string().describe("업종 지수 최저가"),
    prdy_clpr_vrss_lwpr: z.string().describe("전일 종가 대비 최저가"),
    lwpr_vrss_prpr_sign: z.string().describe("최저가 대비 현재가 부호"),
    prdy_clpr_vrss_lwpr_rate: z.string().describe("전일 종가 대비 최저가 비율"),
    ascn_issu_cnt: z.string().describe("상승 종목 수"),
    uplm_issu_cnt: z.string().describe("상한 종목 수"),
    stnr_issu_cnt: z.string().describe("보합 종목 수"),
    down_issu_cnt: z.string().describe("하락 종목 수"),
    lslm_issu_cnt: z.string().describe("하한 종목 수"),
    dryy_bstp_nmix_hgpr: z.string().describe("연중업종지수최고가"),
    dryy_hgpr_vrss_prpr_rate: z.string().describe("연중 최고가 대비 현재가 비율"),
    dryy_bstp_nmix_hgpr_date: z.string().describe("연중업종지수최고가일자"),
    dryy_bstp_nmix_lwpr: z.string().describe("연중업종지수최저가"),
    dryy_lwpr_vrss_prpr_rate: z.string().describe("연중 최저가 대비 현재가 비율"),
    dryy_bstp_nmix_lwpr_date: z.string().describe("연중업종지수최저가일자"),
    total_askp_rsqn: z.string().describe("총 매도호가 잔량"),
    total_bidp_rsqn: z.string().describe("총 매수호가 잔량"),
    seln_rsqn_rate: z.string().describe("매도 잔량 비율"),
    shnu_rsqn_rate: z.string().describe("매수 잔량 비율"),
    ntby_rsqn: z.string().describe("순매수 잔량"),
  }).describe("응답상세"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-index-price",
  tags: ["국내주식 업종/기타"],
  summary: "국내업종 현재지수",
  description: "국내업종의 현재지수 정보를 조회합니다 (TR_ID: FHPUP02100000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: IndexPriceQuerySchema,
  },
  responses: createApiResponse(IndexPriceResponseSchema, "국내업종 현재지수 조회 성공"),
});

// 2. 국내휴장일조회
const HolidayQuerySchema = z.object({
  BASS_DT: z.string().min(8).max(8).describe("기준일자 (YYYYMMDD)"),
  CTX_AREA_NK: z.string().max(20).describe("연속조회키 (공백으로 입력)"),
  CTX_AREA_FK: z.string().max(20).describe("연속조회검색조건 (공백으로 입력)"),
});

const HolidayResponseSchema = CommonResponseSchema.extend({
  ctx_area_nk: z.string().describe("연속조회키"),
  ctx_area_fk: z.string().describe("연속조회검색조건"),
  output: z.array(z.object({
    bass_dt: z.string().describe("기준일자 (YYYYMMDD)"),
    wday_dvsn_cd: z.string().describe("요일구분코드 (01:일요일~07:토요일)"),
    bzdy_yn: z.string().describe("영업일여부 (Y/N)"),
    tr_day_yn: z.string().describe("거래일여부 (Y/N)"),
    opnd_yn: z.string().describe("개장일여부 (Y/N)"),
    sttl_day_yn: z.string().describe("결제일여부 (Y/N)"),
  })).describe("휴장일 정보 목록"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/chk-holiday",
  tags: ["국내주식 업종/기타"],
  summary: "국내휴장일조회",
  description: "국내 주식시장의 영업일, 거래일, 개장일, 결제일 여부를 조회합니다 (TR_ID: CTCA0903R)",
  security: [{ bearerAuth: [] }],
  request: {
    query: HolidayQuerySchema,
  },
  responses: createApiResponse(HolidayResponseSchema, "국내휴장일조회 성공"),
});

// 3. 국내주식업종기간별시세(일/주/월/년)
const IndexChartQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드 (업종: U)"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드"),
  FID_PERIOD_DIV_CODE: z.string().min(1).max(1).describe("FID 기간 분류 코드 (D:일, W:주, M:월, Y:년)"),
  FID_ORG_ADJ_PRC: z.string().min(1).max(1).describe("FID 수정주가 원주가 가격 (0:수정주가, 1:원주가)"),
});

const IndexChartResponseSchema = CommonResponseSchema.extend({
  output1: z.object({
    prdy_vrss: z.string().describe("전일 대비"),
    prdy_vrss_sign: z.string().describe("전일 대비 부호"),
    prdy_ctrt: z.string().describe("전일 대비율"),
    stck_prdy_clpr: z.string().describe("주식 전일 종가"),
    acml_vol: z.string().describe("누적 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
    hts_kor_isnm: z.string().describe("HTS 한글 종목명"),
    stck_prpr: z.string().describe("주식 현재가"),
  }).describe("기본 정보"),
  output2: z.array(z.object({
    stck_bsop_date: z.string().describe("주식 영업 일자"),
    stck_clpr: z.string().describe("주식 종가"),
    stck_oprc: z.string().describe("주식 시가"),
    stck_hgpr: z.string().describe("주식 최고가"),
    stck_lwpr: z.string().describe("주식 최저가"),
    acml_vol: z.string().describe("누적 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
    flng_cls_code: z.string().describe("락 구분 코드"),
    prtt_rate: z.string().describe("분할 비율"),
    mod_yn: z.string().describe("분할변경여부"),
    prdy_vrss_sign: z.string().describe("전일 대비 부호"),
    prdy_vrss: z.string().describe("전일 대비"),
    revl_issu_reas: z.string().describe("재평가사유코드"),
  })).describe("기간별 시세 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-daily-indexchartprice",
  tags: ["국내주식 업종/기타"],
  summary: "국내주식업종기간별시세(일/주/월/년)",
  description: "국내주식 업종의 기간별 차트 시세를 조회합니다 (TR_ID: FHKUP03500100)",
  security: [{ bearerAuth: [] }],
  request: {
    query: IndexChartQuerySchema,
  },
  responses: createApiResponse(IndexChartResponseSchema, "국내주식업종기간별시세 조회 성공"),
});

// 4. 국내업종 시간별지수(분)
const IndexTimeQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드 (업종: U)"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드"),
  FID_INPUT_HOUR_1: z.string().min(1).max(6).describe("FID 입력 시간1 (HHMMSS)"),
});

const IndexTimeResponseSchema = CommonResponseSchema.extend({
  output: z.array(z.object({
    stck_cntg_hour: z.string().describe("주식 체결 시간"),
    stck_prpr: z.string().describe("주식 현재가"),
    stck_oprc: z.string().describe("주식 시가"),
    stck_hgpr: z.string().describe("주식 최고가"),
    stck_lwpr: z.string().describe("주식 최저가"),
    cntg_vol: z.string().describe("체결 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
  })).describe("시간별 지수 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-index-timeprice",
  tags: ["국내주식 업종/기타"],
  summary: "국내업종 시간별지수(분)",
  description: "국내업종의 분단위 시간별 지수를 조회합니다 (TR_ID: FHPUP02110200)",
  security: [{ bearerAuth: [] }],
  request: {
    query: IndexTimeQuerySchema,
  },
  responses: createApiResponse(IndexTimeResponseSchema, "국내업종 시간별지수(분) 조회 성공"),
});

// 5. 국내업종 구분별전체시세
const IndexCategoryQuerySchema = z.object({
  FID_RSFL_CTG2: z.string().min(1).max(2).describe("FID 응답 플래그 코드2"),
  FID_BLNG_EXCC: z.string().min(1).max(2).describe("FID 소속 구분 코드"),
  FID_TRGT_CLS_CODE: z.string().min(1).max(2).describe("FID 대상 구분 코드"),
  FID_TRGT_EXLS_YN: z.string().min(1).max(1).describe("FID 대상 제외 여부"),
});

const IndexCategoryResponseSchema = CommonResponseSchema.extend({
  output: z.array(z.object({
    bstp_cls_code: z.string().describe("업종 구분 코드"),
    bstp_cls_name: z.string().describe("업종 구분 명"),
    bstp_nmix_prpr: z.string().describe("업종 지수 현재가"),
    bstp_nmix_prdy_vrss: z.string().describe("업종 지수 전일 대비"),
    prdy_vrss_sign: z.string().describe("전일 대비 부호"),
    bstp_nmix_prdy_ctrt: z.string().describe("업종 지수 전일 대비율"),
    acml_vol: z.string().describe("누적 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
    bstp_nmix_oprc: z.string().describe("업종 지수 시가"),
    bstp_nmix_hgpr: z.string().describe("업종 지수 최고가"),
    bstp_nmix_lwpr: z.string().describe("업종 지수 최저가"),
    futs_prpr: z.string().describe("선물 현재가"),
  })).describe("업종별 시세 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-index-category-price",
  tags: ["국내주식 업종/기타"],
  summary: "국내업종 구분별전체시세",
  description: "국내 업종별 구분에 따른 전체 시세 정보를 조회합니다 (TR_ID: FHPUP02140000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: IndexCategoryQuerySchema,
  },
  responses: createApiResponse(IndexCategoryResponseSchema, "국내업종 구분별전체시세 조회 성공"),
});

// 6. 업종 분봉조회
const IndexMinuteQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드 (업종: U)"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드"),
  FID_INPUT_DATE_1: z.string().min(8).max(8).describe("FID 입력 일자1 (YYYYMMDD)"),
  FID_INPUT_DATE_2: z.string().min(8).max(8).describe("FID 입력 일자2 (YYYYMMDD)"),
  FID_PW_DATA_INCU_YN: z.string().min(1).max(1).describe("FID 과거 데이터 포함 여부 (Y/N)"),
});

const IndexMinuteResponseSchema = CommonResponseSchema.extend({
  output1: z.object({
    prdy_vrss: z.string().describe("전일 대비"),
    prdy_vrss_sign: z.string().describe("전일 대비 부호"),
    prdy_ctrt: z.string().describe("전일 대비율"),
    stck_prdy_clpr: z.string().describe("주식 전일 종가"),
    acml_vol: z.string().describe("누적 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
    hts_kor_isnm: z.string().describe("HTS 한글 종목명"),
    stck_prpr: z.string().describe("주식 현재가"),
  }).describe("기본 정보"),
  output2: z.array(z.object({
    stck_bsop_date: z.string().describe("주식 영업 일자"),
    stck_cntg_hour: z.string().describe("주식 체결 시간"),
    stck_prpr: z.string().describe("주식 현재가"),
    stck_oprc: z.string().describe("주식 시가"),
    stck_hgpr: z.string().describe("주식 최고가"),
    stck_lwpr: z.string().describe("주식 최저가"),
    cntg_vol: z.string().describe("체결 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
  })).describe("분봉 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-time-indexchartprice",
  tags: ["국내주식 업종/기타"],
  summary: "업종 분봉조회",
  description: "업종의 분봉 차트 데이터를 조회합니다 (TR_ID: FHKUP03500200)",
  security: [{ bearerAuth: [] }],
  request: {
    query: IndexMinuteQuerySchema,
  },
  responses: createApiResponse(IndexMinuteResponseSchema, "업종 분봉조회 성공"),
});

// 7. 국내주식 예상체결지수 추이
const ExpIndexTrendQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드"),
});

const ExpIndexTrendResponseSchema = CommonResponseSchema.extend({
  output: z.array(z.object({
    stck_bsop_date: z.string().describe("주식 영업 일자"),
    stck_cntg_hour: z.string().describe("주식 체결 시간"),
    bstp_nmix_prdy_vrss: z.string().describe("업종 지수 전일 대비"),
    prdy_vrss_sign: z.string().describe("전일 대비 부호"),
    bstp_nmix_prdy_ctrt: z.string().describe("업종 지수 전일 대비율"),
    bstp_nmix_prpr: z.string().describe("업종 지수 현재가"),
    acml_vol: z.string().describe("누적 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
  })).describe("예상체결지수 추이 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/exp-index-trend",
  tags: ["국내주식 업종/기타"],
  summary: "국내주식 예상체결지수 추이",
  description: "국내주식의 예상체결지수 추이를 조회합니다 (TR_ID: FHPST01840000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: ExpIndexTrendQuerySchema,
  },
  responses: createApiResponse(ExpIndexTrendResponseSchema, "국내주식 예상체결지수 추이 조회 성공"),
});

// 8. 국내주식 예상체결 전체지수
const ExpTotalIndexQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드"),
});

const ExpTotalIndexResponseSchema = CommonResponseSchema.extend({
  output: z.array(z.object({
    bstp_cls_code: z.string().describe("업종 구분 코드"),
    bstp_cls_name: z.string().describe("업종 구분 명"),
    bstp_nmix_prpr: z.string().describe("업종 지수 현재가"),
    bstp_nmix_prdy_vrss: z.string().describe("업종 지수 전일 대비"),
    prdy_vrss_sign: z.string().describe("전일 대비 부호"),
    bstp_nmix_prdy_ctrt: z.string().describe("업종 지수 전일 대비율"),
    acml_vol: z.string().describe("누적 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
  })).describe("예상체결 전체지수 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/exp-total-index",
  tags: ["국내주식 업종/기타"],
  summary: "국내주식 예상체결 전체지수",
  description: "국내주식의 예상체결 전체지수를 조회합니다 (TR_ID: FHKUP11750000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: ExpTotalIndexQuerySchema,
  },
  responses: createApiResponse(ExpTotalIndexResponseSchema, "국내주식 예상체결 전체지수 조회 성공"),
});

// 9. 국내선물 영업일조회
const MarketTimeQuerySchema = z.object({
  BASS_DT: z.string().min(8).max(8).describe("기준일자 (YYYYMMDD)"),
  CTX_AREA_NK: z.string().max(20).describe("연속조회키"),
  CTX_AREA_FK: z.string().max(20).describe("연속조회검색조건"),
});

const MarketTimeResponseSchema = CommonResponseSchema.extend({
  ctx_area_nk: z.string().describe("연속조회키"),
  ctx_area_fk: z.string().describe("연속조회검색조건"),
  output: z.array(z.object({
    bass_dt: z.string().describe("기준일자"),
    wday_dvsn_cd: z.string().describe("요일구분코드"),
    bzdy_yn: z.string().describe("영업일여부"),
    tr_day_yn: z.string().describe("거래일여부"),
    opnd_yn: z.string().describe("개장일여부"),
    sttl_day_yn: z.string().describe("결제일여부"),
  })).describe("영업일 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/market-time",
  tags: ["국내주식 업종/기타"],
  summary: "국내선물 영업일조회",
  description: "국내 선물시장의 영업일 정보를 조회합니다 (TR_ID: HHMCM000002C0)",
  security: [{ bearerAuth: [] }],
  request: {
    query: MarketTimeQuerySchema,
  },
  responses: createApiResponse(MarketTimeResponseSchema, "국내선물 영업일조회 성공"),
});

// 10. 국내업종 시간별지수(초)
const IndexTickQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드 (업종: U)"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드"),
  FID_INPUT_HOUR_1: z.string().min(1).max(6).describe("FID 입력 시간1 (HHMMSS)"),
});

const IndexTickResponseSchema = CommonResponseSchema.extend({
  output: z.array(z.object({
    stck_cntg_hour: z.string().describe("주식 체결 시간"),
    stck_prpr: z.string().describe("주식 현재가"),
    stck_oprc: z.string().describe("주식 시가"),
    stck_hgpr: z.string().describe("주식 최고가"),
    stck_lwpr: z.string().describe("주식 최저가"),
    cntg_vol: z.string().describe("체결 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
  })).describe("틱별 지수 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-index-tickprice",
  tags: ["국내주식 업종/기타"],
  summary: "국내업종 시간별지수(초)",
  description: "국내업종의 초단위 시간별 지수를 조회합니다 (TR_ID: FHPUP02110100)",
  security: [{ bearerAuth: [] }],
  request: {
    query: IndexTickQuerySchema,
  },
  responses: createApiResponse(IndexTickResponseSchema, "국내업종 시간별지수(초) 조회 성공"),
});

// 11. 국내업종 일자별지수
const IndexDailyQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드 (업종: U)"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드"),
  FID_INPUT_DATE_1: z.string().min(8).max(8).describe("FID 입력 일자1 (YYYYMMDD)"),
  FID_PERIOD_DIV_CODE: z.string().min(1).max(1).describe("FID 기간 분류 코드 (D:일, W:주, M:월)"),
  FID_ORG_ADJ_PRC: z.string().min(1).max(1).describe("FID 수정주가 원주가 가격 (0:수정주가, 1:원주가)"),
});

const IndexDailyResponseSchema = CommonResponseSchema.extend({
  output: z.array(z.object({
    stck_bsop_date: z.string().describe("주식 영업 일자"),
    bstp_nmix_prpr: z.string().describe("업종 지수 현재가"),
    bstp_nmix_oprc: z.string().describe("업종 지수 시가"),
    bstp_nmix_hgpr: z.string().describe("업종 지수 최고가"),
    bstp_nmix_lwpr: z.string().describe("업종 지수 최저가"),
    acml_vol: z.string().describe("누적 거래량"),
    acml_tr_pbmn: z.string().describe("누적 거래 대금"),
    mod_yn: z.string().describe("분할변경여부"),
  })).describe("일자별 지수 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-index-daily-price",
  tags: ["국내주식 업종/기타"],
  summary: "국내업종 일자별지수",
  description: "국내업종의 일자별 지수를 조회합니다 (TR_ID: FHPUP02120000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: IndexDailyQuerySchema,
  },
  responses: createApiResponse(IndexDailyResponseSchema, "국내업종 일자별지수 조회 성공"),
});

// 12. 금리 종합(국내채권/금리)
const InterestQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드"),
});

const InterestResponseSchema = CommonResponseSchema.extend({
  output: z.array(z.object({
    bond_name: z.string().describe("채권명"),
    bond_prpr: z.string().describe("채권 현재가"),
    bond_prdy_vrss: z.string().describe("채권 전일 대비"),
    prdy_vrss_sign: z.string().describe("전일 대비 부호"),
    bond_prdy_ctrt: z.string().describe("채권 전일 대비율"),
    bond_yield: z.string().describe("채권 수익률"),
    bond_yield_prdy_vrss: z.string().describe("채권 수익률 전일 대비"),
    yield_prdy_vrss_sign: z.string().describe("수익률 전일 대비 부호"),
  })).describe("금리 종합 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/comp-interest",
  tags: ["국내주식 업종/기타"],
  summary: "금리 종합(국내채권/금리)",
  description: "국내 채권 및 금리 종합 정보를 조회합니다 (TR_ID: FHPST07020000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: InterestQuerySchema,
  },
  responses: createApiResponse(InterestResponseSchema, "금리 종합 조회 성공"),
});

// 13. 변동성완화장치(VI) 현황
const ViStatusQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드"),
});

const ViStatusResponseSchema = CommonResponseSchema.extend({
  output: z.array(z.object({
    mksc_shrn_iscd: z.string().describe("유가증권 단축 종목코드"),
    hts_kor_isnm: z.string().describe("HTS 한글 종목명"),
    vi_cls_code: z.string().describe("VI 구분 코드"),
    vi_cls_name: z.string().describe("VI 구분 명"),
    vi_strt_time: z.string().describe("VI 시작 시간"),
    vi_end_time: z.string().describe("VI 종료 시간"),
    vi_trgr_prc: z.string().describe("VI 발동 가격"),
    vi_stnd_prc: z.string().describe("VI 기준 가격"),
    vi_uplm_prc: z.string().describe("VI 상한 가격"),
    vi_lwlm_prc: z.string().describe("VI 하한 가격"),
  })).describe("VI 현황 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-vi-status",
  tags: ["국내주식 업종/기타"],
  summary: "변동성완화장치(VI) 현황",
  description: "변동성완화장치(VI) 현황을 조회합니다 (TR_ID: FHPST01390000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: ViStatusQuerySchema,
  },
  responses: createApiResponse(ViStatusResponseSchema, "변동성완화장치(VI) 현황 조회 성공"),
});

// 14. 종합 시황/공시(제목)
const NewsTitleQuerySchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().min(1).max(2).describe("FID 조건 시장 분류 코드"),
  FID_INPUT_ISCD: z.string().min(1).max(12).describe("FID 입력 종목코드"),
  FID_INPUT_DATE_1: z.string().min(8).max(8).describe("FID 입력 일자1 (YYYYMMDD)"),
});

const NewsTitleResponseSchema = CommonResponseSchema.extend({
  output: z.array(z.object({
    news_id: z.string().describe("뉴스 ID"),
    news_date: z.string().describe("뉴스 일자"),
    news_time: z.string().describe("뉴스 시간"),
    news_title: z.string().describe("뉴스 제목"),
    news_cnts: z.string().describe("뉴스 내용"),
    orgn_news_code: z.string().describe("원본 뉴스 코드"),
    orgn_news_name: z.string().describe("원본 뉴스명"),
    stck_shrn_iscd: z.string().describe("주식 단축 종목코드"),
  })).describe("시황/공시 제목 정보"),
});

domesticSectorRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/news-title",
  tags: ["국내주식 업종/기타"],
  summary: "종합 시황/공시(제목)",
  description: "종합 시황 및 공시 제목 정보를 조회합니다 (TR_ID: FHKST01011800)",
  security: [{ bearerAuth: [] }],
  request: {
    query: NewsTitleQuerySchema,
  },
  responses: createApiResponse(NewsTitleResponseSchema, "종합 시황/공시 제목 조회 성공"),
});

// Route handlers
domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/inquire-index-price", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "국내업종 현재지수 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: {
        bstp_nmix_prpr: "857.60",
        bstp_nmix_prdy_vrss: "-1.61",
        prdy_vrss_sign: "5",
        bstp_nmix_prdy_ctrt: "-0.19",
        acml_vol: "1312496",
        prdy_vol: "1222188",
        acml_tr_pbmn: "11507962",
        prdy_tr_pbmn: "11203385",
        bstp_nmix_oprc: "863.69",
        prdy_nmix_vrss_nmix_oprc: "4.48",
        oprc_vrss_prpr_sign: "2",
        bstp_nmix_oprc_prdy_ctrt: "0.52",
        bstp_nmix_hgpr: "864.24",
        prdy_nmix_vrss_nmix_hgpr: "5.03",
        hgpr_vrss_prpr_sign: "2",
        bstp_nmix_hgpr_prdy_ctrt: "0.59",
        bstp_nmix_lwpr: "854.72",
        prdy_clpr_vrss_lwpr: "-4.49",
        lwpr_vrss_prpr_sign: "5",
        prdy_clpr_vrss_lwpr_rate: "-0.52",
        ascn_issu_cnt: "828",
        uplm_issu_cnt: "5",
        stnr_issu_cnt: "94",
        down_issu_cnt: "716",
        lslm_issu_cnt: "1",
        dryy_bstp_nmix_hgpr: "890.06",
        dryy_hgpr_vrss_prpr_rate: "3.65",
        dryy_bstp_nmix_hgpr_date: "20240109",
        dryy_bstp_nmix_lwpr: "786.28",
        dryy_lwpr_vrss_prpr_rate: "-9.07",
        dryy_bstp_nmix_lwpr_date: "20240201",
        total_askp_rsqn: "24146999",
        total_bidp_rsqn: "40450437",
        seln_rsqn_rate: "37.38",
        shnu_rsqn_rate: "62.62",
        ntby_rsqn: "16303438"
      }
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/chk-holiday", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "국내휴장일조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "KIOK0500",
      msg1: "조회가 계속됩니다..다음버튼을 Click 하십시오.",
      ctx_area_nk: "20230119            ",
      ctx_area_fk: "20221227            ",
      output: [
        {
          bass_dt: "20221227",
          wday_dvsn_cd: "03",
          bzdy_yn: "Y",
          tr_day_yn: "Y",
          opnd_yn: "Y",
          sttl_day_yn: "Y"
        },
        {
          bass_dt: "20230101",
          wday_dvsn_cd: "01",
          bzdy_yn: "N",
          tr_day_yn: "Y",
          opnd_yn: "N",
          sttl_day_yn: "N"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/inquire-daily-indexchartprice", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "국내주식업종기간별시세 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output1: {
        prdy_vrss: "-1.61",
        prdy_vrss_sign: "5",
        prdy_ctrt: "-0.19",
        stck_prdy_clpr: "859.21",
        acml_vol: "1312496",
        acml_tr_pbmn: "11507962",
        hts_kor_isnm: "코스닥",
        stck_prpr: "857.60"
      },
      output2: [
        {
          stck_bsop_date: "20240101",
          stck_clpr: "857.60",
          stck_oprc: "863.69",
          stck_hgpr: "864.24",
          stck_lwpr: "854.72",
          acml_vol: "1312496",
          acml_tr_pbmn: "11507962",
          flng_cls_code: "00",
          prtt_rate: "1.0000",
          mod_yn: "N",
          prdy_vrss_sign: "5",
          prdy_vrss: "-1.61",
          revl_issu_reas: "00"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/inquire-index-timeprice", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "국내업종 시간별지수(분) 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: [
        {
          stck_cntg_hour: "153000",
          stck_prpr: "857.60",
          stck_oprc: "857.60",
          stck_hgpr: "858.20",
          stck_lwpr: "857.00",
          cntg_vol: "12450",
          acml_tr_pbmn: "125430000"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/inquire-index-category-price", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "국내업종 구분별전체시세 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: [
        {
          bstp_cls_code: "001",
          bstp_cls_name: "코스피",
          bstp_nmix_prpr: "2450.12",
          bstp_nmix_prdy_vrss: "10.25",
          prdy_vrss_sign: "2",
          bstp_nmix_prdy_ctrt: "0.42",
          acml_vol: "458720000",
          acml_tr_pbmn: "12450000000",
          bstp_nmix_oprc: "2448.50",
          bstp_nmix_hgpr: "2455.80",
          bstp_nmix_lwpr: "2445.20",
          futs_prpr: "245.50"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/inquire-time-indexchartprice", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "업종 분봉조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output1: {
        prdy_vrss: "-1.61",
        prdy_vrss_sign: "5",
        prdy_ctrt: "-0.19",
        stck_prdy_clpr: "859.21",
        acml_vol: "1312496",
        acml_tr_pbmn: "11507962",
        hts_kor_isnm: "코스닥",
        stck_prpr: "857.60"
      },
      output2: [
        {
          stck_bsop_date: "20240101",
          stck_cntg_hour: "153000",
          stck_prpr: "857.60",
          stck_oprc: "857.60",
          stck_hgpr: "858.20",
          stck_lwpr: "857.00",
          cntg_vol: "12450",
          acml_tr_pbmn: "125430000"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/exp-index-trend", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "국내주식 예상체결지수 추이 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: [
        {
          stck_bsop_date: "20240101",
          stck_cntg_hour: "083000",
          bstp_nmix_prdy_vrss: "-1.61",
          prdy_vrss_sign: "5",
          bstp_nmix_prdy_ctrt: "-0.19",
          bstp_nmix_prpr: "857.60",
          acml_vol: "1312496",
          acml_tr_pbmn: "11507962"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/exp-total-index", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "국내주식 예상체결 전체지수 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: [
        {
          bstp_cls_code: "001",
          bstp_cls_name: "코스피",
          bstp_nmix_prpr: "2450.12",
          bstp_nmix_prdy_vrss: "10.25",
          prdy_vrss_sign: "2",
          bstp_nmix_prdy_ctrt: "0.42",
          acml_vol: "458720000",
          acml_tr_pbmn: "12450000000"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/market-time", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "국내선물 영업일조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      ctx_area_nk: "20230119            ",
      ctx_area_fk: "20221227            ",
      output: [
        {
          bass_dt: "20221227",
          wday_dvsn_cd: "03",
          bzdy_yn: "Y",
          tr_day_yn: "Y",
          opnd_yn: "Y",
          sttl_day_yn: "Y"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/inquire-index-tickprice", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "국내업종 시간별지수(초) 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: [
        {
          stck_cntg_hour: "153001",
          stck_prpr: "857.60",
          stck_oprc: "857.60",
          stck_hgpr: "858.20",
          stck_lwpr: "857.00",
          cntg_vol: "450",
          acml_tr_pbmn: "4350000"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/inquire-index-daily-price", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "국내업종 일자별지수 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: [
        {
          stck_bsop_date: "20240101",
          bstp_nmix_prpr: "857.60",
          bstp_nmix_oprc: "863.69",
          bstp_nmix_hgpr: "864.24",
          bstp_nmix_lwpr: "854.72",
          acml_vol: "1312496",
          acml_tr_pbmn: "11507962",
          mod_yn: "N"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/comp-interest", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "금리 종합 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: [
        {
          bond_name: "국고채3년",
          bond_prpr: "103.50",
          bond_prdy_vrss: "0.25",
          prdy_vrss_sign: "2",
          bond_prdy_ctrt: "0.24",
          bond_yield: "3.45",
          bond_yield_prdy_vrss: "-0.05",
          yield_prdy_vrss_sign: "5"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/inquire-vi-status", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "변동성완화장치(VI) 현황 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: [
        {
          mksc_shrn_iscd: "005930",
          hts_kor_isnm: "삼성전자",
          vi_cls_code: "1",
          vi_cls_name: "정적VI",
          vi_strt_time: "143000",
          vi_end_time: "143500",
          vi_trgr_prc: "75000",
          vi_stnd_prc: "74500",
          vi_uplm_prc: "76500",
          vi_lwlm_prc: "72500"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});

domesticSectorRouter.get("/uapi/domestic-stock/v1/quotations/news-title", async (_req, res) => {
  const serviceResponse = {
    success: true,
    message: "종합 시황/공시 제목 조회 성공",
    responseObject: {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: [
        {
          news_id: "202401011234567",
          news_date: "20240101",
          news_time: "143000",
          news_title: "[공시] 삼성전자 분기 실적 발표",
          news_cnts: "삼성전자가 2024년 1분기 실적을 발표했습니다.",
          orgn_news_code: "001",
          orgn_news_name: "연합뉴스",
          stck_shrn_iscd: "005930"
        }
      ]
    },
    statusCode: 200,
  };
  handleServiceResponse(serviceResponse, res);
});