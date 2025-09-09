import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

// Extend Zod with OpenAPI
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export const domesticQuotationsRegistry = new OpenAPIRegistry();
export const domesticQuotationsRouter: Router = express.Router();

// 주식현재가 시세 (가장 많이 사용하는 API)
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-price",
  tags: ["국내주식 기본시세"],
  summary: "주식현재가 시세",
  description: `국내주식의 현재가 시세 정보를 조회합니다

**TR_ID:** FHKST01010100 (실전/모의 동일)`,
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드 (J: 주식)"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리, 예: 005930)"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKST01010100").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입 (P:개인, B:법인)"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부 (0:성공)"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    output: z.object({
      iscd_stat_cls_code: z.string().describe("종목 상태 구분 코드"),
      marg_rate: z.string().describe("증거금 비율"),
      rprs_mrkt_kor_name: z.string().describe("대표시장 한글명"),
      bstp_kor_isnm: z.string().describe("업종 한글 종목명"),
      temp_stop_yn: z.string().describe("임시정지 여부"),
      oprc_rang_cont_yn: z.string().describe("가격 범위 연장 여부"),
      stck_prpr: z.string().describe("주식 현재가"),
      stck_shrn_iscd: z.string().describe("주식 단축 종목코드"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      stck_oprc: z.string().describe("주식 시가"),
      stck_hgpr: z.string().describe("주식 고가"),
      stck_lwpr: z.string().describe("주식 저가"),
      stck_mxpr: z.string().describe("주식 상한가"),
      stck_llam: z.string().describe("주식 하한가"),
    }).describe("응답 상세"),
  }), "주식 현재가 조회 성공"),
});

// 호가/예상체결
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn",
  tags: ["국내주식 기본시세"],
  summary: "주식현재가 호가/예상체결",
  description: "주식의 호가 정보와 예상체결 정보를 조회합니다 (TR_ID: FHKST01010200)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKST01010200").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    output1: z.object({
      stck_prpr: z.string().describe("주식 현재가"),
      stck_oprc: z.string().describe("주식 시가"),
      stck_hgpr: z.string().describe("주식 고가"),
      stck_lwpr: z.string().describe("주식 저가"),
      askp1: z.string().describe("매도호가1"),
      askp2: z.string().describe("매도호가2"),
      askp3: z.string().describe("매도호가3"),
      askp4: z.string().describe("매도호가4"),
      askp5: z.string().describe("매도호가5"),
      bidp1: z.string().describe("매수호가1"),
      bidp2: z.string().describe("매수호가2"),
      bidp3: z.string().describe("매수호가3"),
      bidp4: z.string().describe("매수호가4"),
      bidp5: z.string().describe("매수호가5"),
    }).describe("호가 정보"),
    output2: z.object({
      antc_cnpr: z.string().describe("예상 체결가"),
      antc_cntg_vrss: z.string().describe("예상 체결 대비"),
      antc_cntg_vrss_sign: z.string().describe("예상 체결 대비 부호"),
      antc_cntg_prdy_ctrt: z.string().describe("예상 체결 전일 대비율"),
      antc_vol: z.string().describe("예상 거래량"),
    }).describe("예상체결 정보"),
  }), "호가/예상체결 조회 성공"),
});

// 일별시세
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-daily-price",
  tags: ["국내주식 기본시세"],
  summary: "주식현재가 일자별",
  description: "주식의 일자별 시세 정보를 조회합니다 (TR_ID: FHKST01010400)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
      FID_PERIOD_DIV_CODE: z.enum(["D", "W", "M"]).default("D").describe("기간분류코드 (D:일봉, W:주봉, M:월봉)"),
      FID_ORG_ADJ_PRC: z.enum(["0", "1"]).default("0").describe("수정주가 여부 (0:수정안함, 1:수정함)"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKST01010400").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    output: z.array(z.object({
      stck_bsop_date: z.string().describe("주식 영업 일자"),
      stck_oprc: z.string().describe("주식 시가"),
      stck_hgpr: z.string().describe("주식 고가"),
      stck_lwpr: z.string().describe("주식 저가"),
      stck_clpr: z.string().describe("주식 종가"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      flng_cls_code: z.string().describe("락 구분 코드"),
      prtt_rate: z.string().describe("분할 비율"),
      mod_yn: z.string().describe("분할변경여부"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_vrss: z.string().describe("전일 대비"),
      revl_issu_reas: z.string().describe("재평가사유"),
    })).describe("일별시세 목록"),
  }), "일별시세 조회 성공"),
});