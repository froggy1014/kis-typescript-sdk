import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

// Extend Zod with OpenAPI
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export const domesticElwRegistry = new OpenAPIRegistry();
export const domesticElwRouter: Router = express.Router();

// ELW 현재가 시세
domesticElwRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-elw-price",
  tags: ["국내주식 ELW 시세"],
  summary: "ELW 현재가 시세",
  description: "ELW의 현재가 시세 정보를 조회합니다 (TR_ID: FHKEW15010000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["W"]).default("W").describe("조건 시장 분류 코드 (W: ELW)"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKEW15010000").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    output: z.object({
      elw_shrn_iscd: z.string().describe("ELW 단축 종목코드"),
      hts_kor_isnm: z.string().describe("HTS 한글 종목명"),
      elw_prpr: z.string().describe("ELW 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      elw_hgpr: z.string().describe("ELW 고가"),
      elw_lwpr: z.string().describe("ELW 저가"),
      elw_oprc: z.string().describe("ELW 시가"),
      elw_mxpr: z.string().describe("ELW 상한가"),
      elw_llam: z.string().describe("ELW 하한가"),
      exrc_pric: z.string().describe("행사가격"),
      elw_expi_dt: z.string().describe("ELW 만료일자"),
      elw_cls_code: z.string().describe("ELW 구분 코드"),
      cnvs_rate: z.string().describe("전환비율"),
      undl_aset_cd: z.string().describe("기초자산 코드"),
      undl_aset_nm: z.string().describe("기초자산 명"),
      thco_aset_pric: z.string().describe("기초자산 현재가"),
      undl_aset_prdy_vrss: z.string().describe("기초자산 전일 대비"),
      undl_aset_prdy_vrss_sign: z.string().describe("기초자산 전일 대비 부호"),
      undl_aset_prdy_ctrt: z.string().describe("기초자산 전일 대비율"),
      iv: z.string().describe("내재 변동성"),
      delt: z.string().describe("델타"),
      gama: z.string().describe("감마"),
      thet: z.string().describe("세타"),
      vega: z.string().describe("베가"),
      rho: z.string().describe("로"),
      prmm_rate: z.string().describe("프리미엄율"),
      brk_evn_pnt: z.string().describe("손익분기점"),
      cpvl_pric: z.string().describe("전환가치"),
      time_val: z.string().describe("시간가치"),
      intr_val: z.string().describe("내재가치"),
      lvrg_rate: z.string().describe("레버리지율"),
      efct_lvrg_rate: z.string().describe("유효레버리지율"),
    }).describe("ELW 현재가 정보"),
  }), "ELW 현재가 조회 성공"),
});

// ELW 종목검색
domesticElwRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-elw-search",
  tags: ["국내주식 ELW 시세"],
  summary: "ELW 종목검색",
  description: "조건에 맞는 ELW 종목을 검색합니다 (TR_ID: FHKEW15020000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["W"]).default("W").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().optional().describe("기초자산 코드 (전체 조회 시 공백)"),
      FID_PRC_CLS_CODE: z.enum(["0", "1", "2"]).default("0").describe("가격 구분 코드 (0:전체, 1:콜, 2:풋)"),
      FID_INPUT_DATE_1: z.string().optional().describe("만료일 시작일 (YYYYMMDD)"),
      FID_INPUT_DATE_2: z.string().optional().describe("만료일 종료일 (YYYYMMDD)"),
      CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
      CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKEW15020000").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    ctx_area_fk100: z.string().describe("연속조회검색조건100"),
    ctx_area_nk100: z.string().describe("연속조회키100"),
    output: z.array(z.object({
      elw_shrn_iscd: z.string().describe("ELW 단축 종목코드"),
      hts_kor_isnm: z.string().describe("HTS 한글 종목명"),
      elw_prpr: z.string().describe("ELW 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      exrc_pric: z.string().describe("행사가격"),
      elw_expi_dt: z.string().describe("ELW 만료일자"),
      elw_cls_code: z.string().describe("ELW 구분 코드"),
      cnvs_rate: z.string().describe("전환비율"),
      undl_aset_cd: z.string().describe("기초자산 코드"),
      undl_aset_nm: z.string().describe("기초자산 명"),
      prmm_rate: z.string().describe("프리미엄율"),
      brk_evn_pnt: z.string().describe("손익분기점"),
      lvrg_rate: z.string().describe("레버리지율"),
    })).describe("ELW 검색 결과"),
  }), "ELW 종목검색 성공"),
});

// ELW 기초자산 목록조회
domesticElwRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-elw-underlying-asset",
  tags: ["국내주식 ELW 시세"],
  summary: "ELW 기초자산 목록조회",
  description: "ELW의 기초자산 목록을 조회합니다 (TR_ID: FHKEW15030000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["W"]).default("W").describe("조건 시장 분류 코드"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKEW15030000").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    output: z.array(z.object({
      undl_aset_cd: z.string().describe("기초자산 코드"),
      undl_aset_nm: z.string().describe("기초자산 명"),
      undl_aset_cls_code: z.string().describe("기초자산 구분 코드"),
      undl_aset_cls_name: z.string().describe("기초자산 구분명"),
    })).describe("기초자산 목록"),
  }), "ELW 기초자산 목록조회 성공"),
});

// ELW 거래량순위
domesticElwRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-elw-volume-rank",
  tags: ["국내주식 ELW 시세"],
  summary: "ELW 거래량순위",
  description: "ELW 거래량 순위를 조회합니다 (TR_ID: FHKEW15040000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["W"]).default("W").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().optional().describe("기초자산 코드 (전체 조회시 공백)"),
      FID_PRC_CLS_CODE: z.enum(["0", "1", "2"]).default("0").describe("가격 구분 코드"),
      CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
      CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKEW15040000").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    ctx_area_fk100: z.string().describe("연속조회검색조건100"),
    ctx_area_nk100: z.string().describe("연속조회키100"),
    output: z.array(z.object({
      hts_rank: z.string().describe("HTS 순위"),
      elw_shrn_iscd: z.string().describe("ELW 단축 종목코드"),
      hts_kor_isnm: z.string().describe("HTS 한글 종목명"),
      elw_prpr: z.string().describe("ELW 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      undl_aset_cd: z.string().describe("기초자산 코드"),
      undl_aset_nm: z.string().describe("기초자산 명"),
      vol_tnrt: z.string().describe("거래량 회전율"),
    })).describe("ELW 거래량 순위"),
  }), "ELW 거래량순위 조회 성공"),
});

// ELW 상승률순위
domesticElwRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-elw-rise-rank",
  tags: ["국내주식 ELW 시세"],
  summary: "ELW 상승률순위",
  description: "ELW 상승률 순위를 조회합니다 (TR_ID: FHKEW15050000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["W"]).default("W").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().optional().describe("기초자산 코드"),
      FID_PRC_CLS_CODE: z.enum(["0", "1", "2"]).default("0").describe("가격 구분 코드"),
      FID_RANK_SORT_CLS_CODE: z.enum(["0", "1"]).default("0").describe("순위 정렬 구분 코드 (0:상승률, 1:하락률)"),
      CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
      CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKEW15050000").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    ctx_area_fk100: z.string().describe("연속조회검색조건100"),
    ctx_area_nk100: z.string().describe("연속조회키100"),
    output: z.array(z.object({
      hts_rank: z.string().describe("HTS 순위"),
      elw_shrn_iscd: z.string().describe("ELW 단축 종목코드"),
      hts_kor_isnm: z.string().describe("HTS 한글 종목명"),
      elw_prpr: z.string().describe("ELW 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      undl_aset_cd: z.string().describe("기초자산 코드"),
      undl_aset_nm: z.string().describe("기초자산 명"),
      exrc_pric: z.string().describe("행사가격"),
      elw_expi_dt: z.string().describe("ELW 만료일자"),
      prmm_rate: z.string().describe("프리미엄율"),
      lvrg_rate: z.string().describe("레버리지율"),
    })).describe("ELW 상승률 순위"),
  }), "ELW 상승률순위 조회 성공"),
});

// ELW 신규상장종목
domesticElwRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-elw-new-listing",
  tags: ["국내주식 ELW 시세"],
  summary: "ELW 신규상장종목",
  description: "신규 상장된 ELW 종목을 조회합니다 (TR_ID: FHKEW15060000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["W"]).default("W").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().optional().describe("기초자산 코드"),
      FID_INPUT_DATE_1: z.string().describe("시작일자 (YYYYMMDD)"),
      FID_INPUT_DATE_2: z.string().describe("종료일자 (YYYYMMDD)"),
      CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
      CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKEW15060000").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    ctx_area_fk100: z.string().describe("연속조회검색조건100"),
    ctx_area_nk100: z.string().describe("연속조회키100"),
    output: z.array(z.object({
      elw_shrn_iscd: z.string().describe("ELW 단축 종목코드"),
      hts_kor_isnm: z.string().describe("HTS 한글 종목명"),
      elw_prpr: z.string().describe("ELW 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      lstn_dt: z.string().describe("상장일자"),
      elw_expi_dt: z.string().describe("ELW 만료일자"),
      exrc_pric: z.string().describe("행사가격"),
      undl_aset_cd: z.string().describe("기초자산 코드"),
      undl_aset_nm: z.string().describe("기초자산 명"),
      cnvs_rate: z.string().describe("전환비율"),
      prmm_rate: z.string().describe("프리미엄율"),
      lvrg_rate: z.string().describe("레버리지율"),
    })).describe("신규상장 ELW 목록"),
  }), "ELW 신규상장종목 조회 성공"),
});

// ELW 만기예정_만기종목
domesticElwRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-elw-expiry",
  tags: ["국내주식 ELW 시세"],
  summary: "ELW 만기예정_만기종목",
  description: "만기 예정 또는 만료된 ELW 종목을 조회합니다 (TR_ID: FHKEW15070000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["W"]).default("W").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().optional().describe("기초자산 코드"),
      FID_INPUT_DATE_1: z.string().describe("만기일자 시작일 (YYYYMMDD)"),
      FID_INPUT_DATE_2: z.string().describe("만기일자 종료일 (YYYYMMDD)"),
      FID_EXPI_CLS_CODE: z.enum(["0", "1"]).default("0").describe("만기구분코드 (0:만기예정, 1:만기종목)"),
      CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
      CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKEW15070000").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    ctx_area_fk100: z.string().describe("연속조회검색조건100"),
    ctx_area_nk100: z.string().describe("연속조회키100"),
    output: z.array(z.object({
      elw_shrn_iscd: z.string().describe("ELW 단축 종목코드"),
      hts_kor_isnm: z.string().describe("HTS 한글 종목명"),
      elw_prpr: z.string().describe("ELW 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      elw_expi_dt: z.string().describe("ELW 만료일자"),
      exrc_pric: z.string().describe("행사가격"),
      undl_aset_cd: z.string().describe("기초자산 코드"),
      undl_aset_nm: z.string().describe("기초자산 명"),
      cnvs_rate: z.string().describe("전환비율"),
      rmnd_dt_cnt: z.string().describe("잔존일수"),
      prmm_rate: z.string().describe("프리미엄율"),
      lvrg_rate: z.string().describe("레버리지율"),
    })).describe("만기예정/만기종목 ELW 목록"),
  }), "ELW 만기예정_만기종목 조회 성공"),
});

// ELW 당일급변종목
domesticElwRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-elw-sudden-change",
  tags: ["국내주식 ELW 시세"],
  summary: "ELW 당일급변종목",
  description: "당일 급등락한 ELW 종목을 조회합니다 (TR_ID: FHKEW15080000)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["W"]).default("W").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().optional().describe("기초자산 코드"),
      FID_RANK_SORT_CLS_CODE: z.enum(["0", "1"]).default("0").describe("순위 정렬 구분 (0:상승률, 1:하락률)"),
      FID_INPUT_PRICE_1: z.string().optional().describe("최소 등락률"),
      FID_INPUT_PRICE_2: z.string().optional().describe("최대 등락률"),
      CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
      CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("FHKEW15080000").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    ctx_area_fk100: z.string().describe("연속조회검색조건100"),
    ctx_area_nk100: z.string().describe("연속조회키100"),
    output: z.array(z.object({
      hts_rank: z.string().describe("HTS 순위"),
      elw_shrn_iscd: z.string().describe("ELW 단축 종목코드"),
      hts_kor_isnm: z.string().describe("HTS 한글 종목명"),
      elw_prpr: z.string().describe("ELW 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      undl_aset_cd: z.string().describe("기초자산 코드"),
      undl_aset_nm: z.string().describe("기초자산 명"),
      vol_tnrt: z.string().describe("거래량 회전율"),
      elw_hgpr: z.string().describe("ELW 고가"),
      elw_lwpr: z.string().describe("ELW 저가"),
    })).describe("급변종목 ELW 목록"),
  }), "ELW 당일급변종목 조회 성공"),
});