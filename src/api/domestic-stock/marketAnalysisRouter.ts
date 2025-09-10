import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

export const marketAnalysisRegistry = new OpenAPIRegistry();
export const marketAnalysisRouter: Router = express.Router();

// Common Zod schemas for reuse
const CommonHeaderSchema = z.object({
  authorization: z.string().describe("Bearer 토큰"),
  appkey: z.string().describe("앱키"),
  appsecret: z.string().describe("앱시크릿"),
  tr_id: z.string().describe("거래ID"),
  custtype: z.string().default("P").describe("고객 타입 (B: 법인, P: 개인)"),
});

// 1. 거래량순위 API
const VolumeRankingRequestSchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().openapi({ example: "J" }).describe("시장구분코드 (J:KRX, NX:NXT)"),
  FID_COND_SCR_DIV_CODE: z.string().default("20171").openapi({ example: "20171" }).describe("화면구분코드"),
  FID_INPUT_ISCD: z.string().default("0000").openapi({ example: "0000" }).describe("종목코드 (0000:전체)"),
  FID_DIV_CLS_CODE: z.string().default("0").openapi({ example: "0" }).describe("분류구분 (0:전체, 1:보통주, 2:우선주)"),
  FID_BLNG_CLS_CODE: z.string().default("0").openapi({ example: "0" }).describe("소속구분코드"),
  FID_TRGT_CLS_CODE: z.string().default("111111111").openapi({ example: "111111111" }).describe("대상구분코드"),
  FID_TRGT_EXLS_CLS_CODE: z.string().default("000000").openapi({ example: "000000" }).describe("대상제외구분코드"),
  FID_INPUT_PRICE_1: z.string().default("0").openapi({ example: "0" }).describe("입력가격1"),
  FID_INPUT_PRICE_2: z.string().default("0").openapi({ example: "0" }).describe("입력가격2"),
  FID_VOL_CNT: z.string().default("0").openapi({ example: "0" }).describe("거래량수"),
  FID_INPUT_DATE_1: z.string().default("0").openapi({ example: "0" }).describe("입력날짜1"),
});

const VolumeRankingResponseSchema = z.object({
  output: z.array(
    z.object({
      hts_kor_isnm: z.string().describe("종목명"),
      mksc_shrn_iscd: z.string().describe("단축종목코드"),
      data_rank: z.string().describe("순위"),
      stck_prpr: z.string().describe("현재가"),
      prdy_vrss_sign: z.string().describe("전일대비부호"),
      prdy_vrss: z.string().describe("전일대비"),
      prdy_ctrt: z.string().describe("전일대비율"),
      acml_vol: z.string().describe("누적거래량"),
      prdy_vol: z.string().describe("전일거래량"),
      lstn_stcn: z.string().describe("상장주수"),
      avrg_vol: z.string().describe("평균거래량"),
      vol_inrt: z.string().describe("거래량증가율"),
      vol_tnrt: z.string().describe("거래량회전율"),
      acml_tr_pbmn: z.string().describe("누적거래대금"),
    })
  ),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

marketAnalysisRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/volume-rank",
  description: "국내주식 거래량순위 조회",
  summary: "거래량순위",
  tags: ["국내주식 시장분석"],
  request: {
    headers: CommonHeaderSchema.extend({
      tr_id: z.literal("FHPST01710000"),
    }),
    query: VolumeRankingRequestSchema,
  },
  responses: createApiResponse(VolumeRankingResponseSchema, "거래량순위 조회 성공"),
});

marketAnalysisRouter.get("/volume-rank", async (_req, res) => {
  const mockData = {
    output: [
      {
        hts_kor_isnm: "삼성전자",
        mksc_shrn_iscd: "005930",
        data_rank: "1",
        stck_prpr: "65100",
        prdy_vrss_sign: "5",
        prdy_vrss: "-300",
        prdy_ctrt: "-0.46",
        acml_vol: "8958147",
        prdy_vol: "12334657",
        lstn_stcn: "5969782550",
        avrg_vol: "8958147",
        vol_inrt: "72.63",
        vol_tnrt: "0.15",
        acml_tr_pbmn: "584861890300",
      },
    ],
    rt_cd: "0",
    msg_cd: "MCA00000",
    msg1: "정상처리 되었습니다.",
  };

  const serviceResponse = ServiceResponse.success("거래량순위 조회 성공", mockData);
  return handleServiceResponse(serviceResponse, res);
});

// 2. 등락률순위 API
const FluctuationRankingRequestSchema = z.object({
  fid_cond_mrkt_div_code: z.string().openapi({ example: "J" }).describe("시장구분코드 (J:KRX, NX:NXT)"),
  fid_cond_scr_div_code: z.string().default("20170").openapi({ example: "20170" }).describe("화면구분코드"),
  fid_input_iscd: z.string().default("0000").openapi({ example: "0000" }).describe("종목코드"),
  fid_rank_sort_cls_code: z.string().default("0").openapi({ example: "0" }).describe("순위정렬구분 (0:상승율순, 1:하락율순)"),
  fid_input_cnt_1: z.string().default("0").openapi({ example: "0" }).describe("입력수1"),
  fid_prc_cls_code: z.string().default("0").openapi({ example: "0" }).describe("가격구분코드"),
  fid_input_price_1: z.string().default("").openapi({ example: "" }).describe("입력가격1"),
  fid_input_price_2: z.string().default("").openapi({ example: "" }).describe("입력가격2"),
  fid_vol_cnt: z.string().default("").openapi({ example: "" }).describe("거래량수"),
  fid_trgt_cls_code: z.string().default("0").openapi({ example: "0" }).describe("대상구분코드"),
  fid_trgt_exls_cls_code: z.string().default("0").openapi({ example: "0" }).describe("대상제외구분코드"),
  fid_div_cls_code: z.string().default("0").openapi({ example: "0" }).describe("분류구분코드"),
  fid_rsfl_rate1: z.string().default("").openapi({ example: "" }).describe("등락비율1"),
  fid_rsfl_rate2: z.string().default("").openapi({ example: "" }).describe("등락비율2"),
});

const FluctuationRankingResponseSchema = z.object({
  output: z.array(
    z.object({
      stck_shrn_iscd: z.string().describe("종목코드"),
      data_rank: z.string().describe("순위"),
      hts_kor_isnm: z.string().describe("종목명"),
      stck_prpr: z.string().describe("현재가"),
      prdy_vrss: z.string().describe("전일대비"),
      prdy_vrss_sign: z.string().describe("전일대비부호"),
      prdy_ctrt: z.string().describe("전일대비율"),
      acml_vol: z.string().describe("누적거래량"),
      stck_hgpr: z.string().describe("최고가"),
      hgpr_hour: z.string().describe("최고가시간"),
      stck_lwpr: z.string().describe("최저가"),
      lwpr_hour: z.string().describe("최저가시간"),
      lwpr_vrss_prpr_rate: z.string().describe("최저가대비현재가비율"),
      hgpr_vrss_prpr_rate: z.string().describe("최고가대비현재가비율"),
      cnnt_ascn_dynu: z.string().describe("연속상승일수"),
      cnnt_down_dynu: z.string().describe("연속하락일수"),
    })
  ),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

marketAnalysisRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/ranking/fluctuation",
  description: "국내주식 등락률순위 조회",
  summary: "등락률순위",
  tags: ["국내주식 시장분석"],
  request: {
    headers: CommonHeaderSchema.extend({
      tr_id: z.literal("FHPST01700000"),
    }),
    query: FluctuationRankingRequestSchema,
  },
  responses: createApiResponse(FluctuationRankingResponseSchema, "등락률순위 조회 성공"),
});

marketAnalysisRouter.get("/ranking/fluctuation", async (_req, res) => {
  const mockData = {
    output: [
      {
        stck_shrn_iscd: "000040",
        data_rank: "1",
        hts_kor_isnm: "KR모터스",
        stck_prpr: "1821",
        prdy_vrss: "197",
        prdy_vrss_sign: "2",
        prdy_ctrt: "12.13",
        acml_vol: "2267183",
        stck_hgpr: "1861",
        hgpr_hour: "100214",
        stck_lwpr: "1301",
        lwpr_hour: "090239",
        lwpr_vrss_prpr_rate: "39.97",
        hgpr_vrss_prpr_rate: "-2.15",
        cnnt_ascn_dynu: "1",
        cnnt_down_dynu: "0",
      },
    ],
    rt_cd: "0",
    msg_cd: "MCA00000",
    msg1: "정상처리 되었습니다.",
  };

  const serviceResponse = ServiceResponse.success("등락률순위 조회 성공", mockData);
  return handleServiceResponse(serviceResponse, res);
});

// 3. 시가총액순위 API
const MarketCapRankingRequestSchema = z.object({
  fid_cond_mrkt_div_code: z.string().openapi({ example: "J" }).describe("시장구분코드 (J:KRX, NX:NXT)"),
  fid_cond_scr_div_code: z.string().default("20174").openapi({ example: "20174" }).describe("화면구분코드"),
  fid_div_cls_code: z.string().default("0").openapi({ example: "0" }).describe("분류구분 (0:전체, 1:보통주, 2:우선주)"),
  fid_input_iscd: z.string().default("0000").openapi({ example: "0000" }).describe("종목코드"),
  fid_trgt_cls_code: z.string().default("0").openapi({ example: "0" }).describe("대상구분코드"),
  fid_trgt_exls_cls_code: z.string().default("0").openapi({ example: "0" }).describe("대상제외구분코드"),
  fid_input_price_1: z.string().default("").openapi({ example: "" }).describe("입력가격1"),
  fid_input_price_2: z.string().default("").openapi({ example: "" }).describe("입력가격2"),
  fid_vol_cnt: z.string().default("").openapi({ example: "" }).describe("거래량수"),
});

const MarketCapRankingResponseSchema = z.object({
  output: z.array(
    z.object({
      mksc_shrn_iscd: z.string().describe("종목코드"),
      data_rank: z.string().describe("순위"),
      hts_kor_isnm: z.string().describe("종목명"),
      stck_prpr: z.string().describe("현재가"),
      prdy_vrss: z.string().describe("전일대비"),
      prdy_vrss_sign: z.string().describe("전일대비부호"),
      prdy_ctrt: z.string().describe("전일대비율"),
      acml_vol: z.string().describe("누적거래량"),
      lstn_stcn: z.string().describe("상장주수"),
      stck_avls: z.string().describe("시가총액"),
      mrkt_whol_avls_rlim: z.string().describe("시장전체시가총액비중"),
    })
  ),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

marketAnalysisRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/ranking/market-cap",
  description: "국내주식 시가총액상위 조회",
  summary: "시가총액상위",
  tags: ["국내주식 시장분석"],
  request: {
    headers: CommonHeaderSchema.extend({
      tr_id: z.literal("FHPST01740000"),
    }),
    query: MarketCapRankingRequestSchema,
  },
  responses: createApiResponse(MarketCapRankingResponseSchema, "시가총액순위 조회 성공"),
});

marketAnalysisRouter.get("/ranking/market-cap", async (_req, res) => {
  const mockData = {
    output: [
      {
        mksc_shrn_iscd: "005930",
        data_rank: "1",
        hts_kor_isnm: "삼성전자",
        stck_prpr: "72700",
        prdy_vrss: "400",
        prdy_vrss_sign: "2",
        prdy_ctrt: "0.55",
        acml_vol: "3686661",
        lstn_stcn: "5969782550",
        stck_avls: "4340032",
        mrkt_whol_avls_rlim: "15.77",
      },
    ],
    rt_cd: "0",
    msg_cd: "MCA00000",
    msg1: "정상처리 되었습니다.",
  };

  const serviceResponse = ServiceResponse.success("시가총액순위 조회 성공", mockData);
  return handleServiceResponse(serviceResponse, res);
});

// 4. 시장별 투자자매매동향(일별) API
const InvestorTradingTrendRequestSchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().default("U").openapi({ example: "U" }).describe("조건시장분류코드 (업종 U)"),
  FID_INPUT_ISCD: z.string().default("0001").openapi({ example: "0001" }).describe("업종분류코드"),
  FID_INPUT_DATE_1: z.string().openapi({ example: "20240517" }).describe("검색시작일 (YYYYMMDD)"),
  FID_INPUT_ISCD_1: z.string().default("KSP").openapi({ example: "KSP" }).describe("시장구분 (KSP:코스피, KSQ:코스닥)"),
  FID_INPUT_DATE_2: z.string().openapi({ example: "20240517" }).describe("검색종료일 (YYYYMMDD)"),
  FID_INPUT_ISCD_2: z.string().default("0001").openapi({ example: "0001" }).describe("업종분류코드"),
});

const InvestorTradingTrendResponseSchema = z.object({
  output: z.array(
    z.object({
      stck_bsop_date: z.string().describe("영업일자"),
      bstp_nmix_prpr: z.string().describe("업종지수현재가"),
      bstp_nmix_prdy_vrss: z.string().describe("업종지수전일대비"),
      prdy_vrss_sign: z.string().describe("전일대비부호"),
      bstp_nmix_prdy_ctrt: z.string().describe("업종지수전일대비율"),
      frgn_ntby_qty: z.string().describe("외국인순매수수량"),
      frgn_ntby_tr_pbmn: z.string().describe("외국인순매수거래대금"),
      prsn_ntby_qty: z.string().describe("개인순매수수량"),
      prsn_ntby_tr_pbmn: z.string().describe("개인순매수거래대금"),
      orgn_ntby_qty: z.string().describe("기관계순매수수량"),
      orgn_ntby_tr_pbmn: z.string().describe("기관계순매수거래대금"),
      scrt_ntby_qty: z.string().describe("증권순매수수량"),
      scrt_ntby_tr_pbmn: z.string().describe("증권순매수거래대금"),
    })
  ),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

marketAnalysisRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-investor-daily-by-market",
  description: "시장별 투자자매매동향 일별 조회",
  summary: "투자자매매동향",
  tags: ["국내주식 시장분석"],
  request: {
    headers: CommonHeaderSchema.extend({
      tr_id: z.literal("FHPTJ04040000"),
    }),
    query: InvestorTradingTrendRequestSchema,
  },
  responses: createApiResponse(InvestorTradingTrendResponseSchema, "투자자매매동향 조회 성공"),
});

marketAnalysisRouter.get("/investor-trading-trend", async (_req, res) => {
  const mockData = {
    output: [
      {
        stck_bsop_date: "20240517",
        bstp_nmix_prpr: "2724.62",
        bstp_nmix_prdy_vrss: "-28.38",
        prdy_vrss_sign: "5",
        bstp_nmix_prdy_ctrt: "-1.03",
        frgn_ntby_qty: "-18565",
        frgn_ntby_tr_pbmn: "-597490",
        prsn_ntby_qty: "22524",
        prsn_ntby_tr_pbmn: "720787",
        orgn_ntby_qty: "-4738",
        orgn_ntby_tr_pbmn: "-150685",
        scrt_ntby_qty: "-1148",
        scrt_ntby_tr_pbmn: "-18893",
      },
    ],
    rt_cd: "0",
    msg_cd: "MCA00000",
    msg1: "정상처리 되었습니다.",
  };

  const serviceResponse = ServiceResponse.success("투자자매매동향 조회 성공", mockData);
  return handleServiceResponse(serviceResponse, res);
});

// 5. 프로그램매매 종합현황(일별) API
const ProgramTradingStatusRequestSchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().default("J").openapi({ example: "J" }).describe("시장분류코드 (J:KRX, NX:NXT, UN:통합)"),
  FID_MRKT_CLS_CODE: z.string().default("K").openapi({ example: "K" }).describe("시장구분코드 (K:코스피, Q:코스닥)"),
  FID_INPUT_DATE_1: z.string().default("").openapi({ example: "" }).describe("검색시작일 (8개월 이상 과거 조회 불가)"),
  FID_INPUT_DATE_2: z.string().default("").openapi({ example: "" }).describe("검색종료일"),
});

const ProgramTradingStatusResponseSchema = z.object({
  output: z.array(
    z.object({
      stck_bsop_date: z.string().describe("영업일자"),
      arbt_entm_seln_vol: z.string().describe("차익위탁매도거래량"),
      arbt_entm_seln_tr_pbmn: z.string().describe("차익위탁매도거래대금"),
      nabt_entm_seln_vol: z.string().describe("비차익위탁매도거래량"),
      nabt_entm_seln_tr_pbmn: z.string().describe("비차익위탁매도거래대금"),
      arbt_entm_shnu_vol: z.string().describe("차익위탁매수거래량"),
      arbt_entm_shnu_tr_pbmn: z.string().describe("차익위탁매수거래대금"),
      nabt_entm_shnu_vol: z.string().describe("비차익위탁매수거래량"),
      nabt_entm_shnu_tr_pbmn: z.string().describe("비차익위탁매수거래대금"),
      arbt_entm_ntby_qty: z.string().describe("차익위탁순매수수량"),
      arbt_entm_ntby_tr_pbmn: z.string().describe("차익위탁순매수거래대금"),
      nabt_entm_ntby_qty: z.string().describe("비차익위탁순매수수량"),
      nabt_entm_ntby_tr_pbmn: z.string().describe("비차익위탁순매수거래대금"),
    })
  ),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

marketAnalysisRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/comp-program-trade-daily",
  description: "프로그램매매 종합현황 일별 조회",
  summary: "프로그램매매현황",
  tags: ["국내주식 시장분석"],
  request: {
    headers: CommonHeaderSchema.extend({
      tr_id: z.literal("FHPPG04600001"),
    }),
    query: ProgramTradingStatusRequestSchema,
  },
  responses: createApiResponse(ProgramTradingStatusResponseSchema, "프로그램매매현황 조회 성공"),
});

marketAnalysisRouter.get("/program-trading-status", async (_req, res) => {
  const mockData = {
    output: [
      {
        stck_bsop_date: "20240404",
        arbt_entm_seln_vol: "945",
        arbt_entm_seln_tr_pbmn: "60184",
        nabt_entm_seln_vol: "72995",
        nabt_entm_seln_tr_pbmn: "2335987",
        arbt_entm_shnu_vol: "798",
        arbt_entm_shnu_tr_pbmn: "50818",
        nabt_entm_shnu_vol: "73441",
        nabt_entm_shnu_tr_pbmn: "2581806",
        arbt_entm_ntby_qty: "-147",
        arbt_entm_ntby_tr_pbmn: "-9366",
        nabt_entm_ntby_qty: "446",
        nabt_entm_ntby_tr_pbmn: "245819",
      },
    ],
    rt_cd: "0",
    msg_cd: "MCA00000",
    msg1: "정상처리 되었습니다.",
  };

  const serviceResponse = ServiceResponse.success("프로그램매매현황 조회 성공", mockData);
  return handleServiceResponse(serviceResponse, res);
});

// 6. 체결강도 상위 API
const VolumeStrengthRankingRequestSchema = z.object({
  fid_cond_mrkt_div_code: z.string().openapi({ example: "J" }).describe("시장구분코드 (J:KRX, NX:NXT)"),
  fid_cond_scr_div_code: z.string().default("20173").openapi({ example: "20173" }).describe("화면구분코드"),
  fid_input_iscd: z.string().default("0000").openapi({ example: "0000" }).describe("종목코드"),
  fid_div_cls_code: z.string().default("0").openapi({ example: "0" }).describe("분류구분코드"),
  fid_blng_cls_code: z.string().default("0").openapi({ example: "0" }).describe("소속구분코드"),
  fid_trgt_cls_code: z.string().default("0").openapi({ example: "0" }).describe("대상구분코드"),
  fid_trgt_exls_cls_code: z.string().default("0").openapi({ example: "0" }).describe("대상제외구분코드"),
  fid_input_price_1: z.string().default("").openapi({ example: "" }).describe("입력가격1"),
  fid_input_price_2: z.string().default("").openapi({ example: "" }).describe("입력가격2"),
  fid_vol_cnt: z.string().default("").openapi({ example: "" }).describe("거래량수"),
});

const VolumeStrengthRankingResponseSchema = z.object({
  output: z.array(
    z.object({
      mksc_shrn_iscd: z.string().describe("종목코드"),
      data_rank: z.string().describe("순위"),
      hts_kor_isnm: z.string().describe("종목명"),
      stck_prpr: z.string().describe("현재가"),
      prdy_vrss_sign: z.string().describe("전일대비부호"),
      prdy_vrss: z.string().describe("전일대비"),
      prdy_ctrt: z.string().describe("전일대비율"),
      acml_vol: z.string().describe("누적거래량"),
      vol_icdc: z.string().describe("거래량지표"),
      vol_tnrt: z.string().describe("거래량회전율"),
    })
  ),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

marketAnalysisRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/ranking/volume-strength",
  description: "국내주식 체결강도 상위 조회",
  summary: "체결강도상위",
  tags: ["국내주식 시장분석"],
  request: {
    headers: CommonHeaderSchema.extend({
      tr_id: z.literal("FHPST01730000"),
    }),
    query: VolumeStrengthRankingRequestSchema,
  },
  responses: createApiResponse(VolumeStrengthRankingResponseSchema, "체결강도순위 조회 성공"),
});

marketAnalysisRouter.get("/ranking/volume-strength", async (_req, res) => {
  const mockData = {
    output: [
      {
        mksc_shrn_iscd: "005930",
        data_rank: "1",
        hts_kor_isnm: "삼성전자",
        stck_prpr: "72700",
        prdy_vrss_sign: "2",
        prdy_vrss: "400",
        prdy_ctrt: "0.55",
        acml_vol: "3686661",
        vol_icdc: "127.5",
        vol_tnrt: "0.62",
      },
    ],
    rt_cd: "0",
    msg_cd: "MCA00000",
    msg1: "정상처리 되었습니다.",
  };

  const serviceResponse = ServiceResponse.success("체결강도순위 조회 성공", mockData);
  return handleServiceResponse(serviceResponse, res);
});

// 7. 호가잔량 순위 API
const BidAskVolumeRankingRequestSchema = z.object({
  fid_cond_mrkt_div_code: z.string().openapi({ example: "J" }).describe("시장구분코드 (J:KRX, NX:NXT)"),
  fid_cond_scr_div_code: z.string().default("20177").openapi({ example: "20177" }).describe("화면구분코드"),
  fid_input_iscd: z.string().default("0000").openapi({ example: "0000" }).describe("종목코드"),
  fid_div_cls_code: z.string().default("0").openapi({ example: "0" }).describe("분류구분코드"),
  fid_blng_cls_code: z.string().default("0").openapi({ example: "0" }).describe("소속구분코드"),
  fid_trgt_cls_code: z.string().default("0").openapi({ example: "0" }).describe("대상구분코드"),
  fid_trgt_exls_cls_code: z.string().default("0").openapi({ example: "0" }).describe("대상제외구분코드"),
  fid_input_price_1: z.string().default("").openapi({ example: "" }).describe("입력가격1"),
  fid_input_price_2: z.string().default("").openapi({ example: "" }).describe("입력가격2"),
  fid_vol_cnt: z.string().default("").openapi({ example: "" }).describe("거래량수"),
});

const BidAskVolumeRankingResponseSchema = z.object({
  output: z.array(
    z.object({
      mksc_shrn_iscd: z.string().describe("종목코드"),
      data_rank: z.string().describe("순위"),
      hts_kor_isnm: z.string().describe("종목명"),
      stck_prpr: z.string().describe("현재가"),
      prdy_vrss_sign: z.string().describe("전일대비부호"),
      prdy_vrss: z.string().describe("전일대비"),
      prdy_ctrt: z.string().describe("전일대비율"),
      askp_rsqn: z.string().describe("매도호가잔량"),
      bidp_rsqn: z.string().describe("매수호가잔량"),
      total_askp_rsqn: z.string().describe("총매도호가잔량"),
      total_bidp_rsqn: z.string().describe("총매수호가잔량"),
    })
  ),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

marketAnalysisRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/ranking/bid-ask-volume",
  description: "국내주식 호가잔량 순위 조회",
  summary: "호가잔량순위",
  tags: ["국내주식 시장분석"],
  request: {
    headers: CommonHeaderSchema.extend({
      tr_id: z.literal("FHPST01770000"),
    }),
    query: BidAskVolumeRankingRequestSchema,
  },
  responses: createApiResponse(BidAskVolumeRankingResponseSchema, "호가잔량순위 조회 성공"),
});

marketAnalysisRouter.get("/ranking/bid-ask-volume", async (_req, res) => {
  const mockData = {
    output: [
      {
        mksc_shrn_iscd: "005930",
        data_rank: "1",
        hts_kor_isnm: "삼성전자",
        stck_prpr: "72700",
        prdy_vrss_sign: "2",
        prdy_vrss: "400",
        prdy_ctrt: "0.55",
        askp_rsqn: "15234",
        bidp_rsqn: "18945",
        total_askp_rsqn: "156789",
        total_bidp_rsqn: "189456",
      },
    ],
    rt_cd: "0",
    msg_cd: "MCA00000",
    msg1: "정상처리 되었습니다.",
  };

  const serviceResponse = ServiceResponse.success("호가잔량순위 조회 성공", mockData);
  return handleServiceResponse(serviceResponse, res);
});

// 8. 외국인 순매수 추이 API
const ForeignInvestorTrendRequestSchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().default("J").openapi({ example: "J" }).describe("시장구분코드"),
  FID_INPUT_ISCD: z.string().openapi({ example: "005930" }).describe("종목코드"),
  FID_INPUT_DATE_1: z.string().openapi({ example: "20240501" }).describe("조회시작일 (YYYYMMDD)"),
  FID_INPUT_DATE_2: z.string().openapi({ example: "20240517" }).describe("조회종료일 (YYYYMMDD)"),
  FID_PERIOD_DIV_CODE: z.string().default("D").openapi({ example: "D" }).describe("기간구분 (D:일, W:주, M:월)"),
});

const ForeignInvestorTrendResponseSchema = z.object({
  output: z.array(
    z.object({
      stck_bsop_date: z.string().describe("영업일자"),
      stck_clpr: z.string().describe("종가"),
      prdy_vrss_sign: z.string().describe("전일대비부호"),
      prdy_vrss: z.string().describe("전일대비"),
      prdy_ctrt: z.string().describe("전일대비율"),
      frgn_ntby_qty: z.string().describe("외국인순매수수량"),
      frgn_ntby_tr_pbmn: z.string().describe("외국인순매수거래대금"),
      frgn_hldn_qty: z.string().describe("외국인보유수량"),
      frgn_hldn_rate: z.string().describe("외국인보유비율"),
    })
  ),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

marketAnalysisRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/foreign-investor-trend",
  description: "종목별 외국인 순매수 추이 조회",
  summary: "외국인순매수추이",
  tags: ["국내주식 시장분석"],
  request: {
    headers: CommonHeaderSchema.extend({
      tr_id: z.literal("FHKST03030100"),
    }),
    query: ForeignInvestorTrendRequestSchema,
  },
  responses: createApiResponse(ForeignInvestorTrendResponseSchema, "외국인순매수추이 조회 성공"),
});

marketAnalysisRouter.get("/foreign-investor-trend", async (_req, res) => {
  const mockData = {
    output: [
      {
        stck_bsop_date: "20240517",
        stck_clpr: "72700",
        prdy_vrss_sign: "2",
        prdy_vrss: "400",
        prdy_ctrt: "0.55",
        frgn_ntby_qty: "123456",
        frgn_ntby_tr_pbmn: "8977894400",
        frgn_hldn_qty: "3123456789",
        frgn_hldn_rate: "52.34",
      },
    ],
    rt_cd: "0",
    msg_cd: "MCA00000",
    msg1: "정상처리 되었습니다.",
  };

  const serviceResponse = ServiceResponse.success("외국인순매수추이 조회 성공", mockData);
  return handleServiceResponse(serviceResponse, res);
});

// 9. 재무비율 순위 API
const FinancialRatioRankingRequestSchema = z.object({
  fid_cond_mrkt_div_code: z.string().openapi({ example: "J" }).describe("시장구분코드 (J:KRX, NX:NXT)"),
  fid_cond_scr_div_code: z.string().default("20194").openapi({ example: "20194" }).describe("화면구분코드"),
  fid_input_iscd: z.string().default("0000").openapi({ example: "0000" }).describe("종목코드"),
  fid_div_cls_code: z.string().default("0").openapi({ example: "0" }).describe("분류구분코드"),
  fid_blng_cls_code: z.string().default("0").openapi({ example: "0" }).describe("소속구분코드 (0:PER, 1:PBR, 2:PCR, 3:PSR, 4:PEG)"),
  fid_trgt_cls_code: z.string().default("0").openapi({ example: "0" }).describe("대상구분코드"),
  fid_trgt_exls_cls_code: z.string().default("0").openapi({ example: "0" }).describe("대상제외구분코드"),
  fid_input_price_1: z.string().default("").openapi({ example: "" }).describe("입력가격1"),
  fid_input_price_2: z.string().default("").openapi({ example: "" }).describe("입력가격2"),
  fid_vol_cnt: z.string().default("").openapi({ example: "" }).describe("거래량수"),
});

const FinancialRatioRankingResponseSchema = z.object({
  output: z.array(
    z.object({
      mksc_shrn_iscd: z.string().describe("종목코드"),
      data_rank: z.string().describe("순위"),
      hts_kor_isnm: z.string().describe("종목명"),
      stck_prpr: z.string().describe("현재가"),
      prdy_vrss_sign: z.string().describe("전일대비부호"),
      prdy_vrss: z.string().describe("전일대비"),
      prdy_ctrt: z.string().describe("전일대비율"),
      per: z.string().describe("PER"),
      pbr: z.string().describe("PBR"),
      pcr: z.string().describe("PCR"),
      psr: z.string().describe("PSR"),
    })
  ),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

marketAnalysisRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/ranking/financial-ratio",
  description: "국내주식 재무비율 순위 조회",
  summary: "재무비율순위",
  tags: ["국내주식 시장분석"],
  request: {
    headers: CommonHeaderSchema.extend({
      tr_id: z.literal("FHPST01940000"),
    }),
    query: FinancialRatioRankingRequestSchema,
  },
  responses: createApiResponse(FinancialRatioRankingResponseSchema, "재무비율순위 조회 성공"),
});

marketAnalysisRouter.get("/ranking/financial-ratio", async (_req, res) => {
  const mockData = {
    output: [
      {
        mksc_shrn_iscd: "005930",
        data_rank: "1",
        hts_kor_isnm: "삼성전자",
        stck_prpr: "72700",
        prdy_vrss_sign: "2",
        prdy_vrss: "400",
        prdy_ctrt: "0.55",
        per: "15.23",
        pbr: "1.45",
        pcr: "8.97",
        psr: "2.34",
      },
    ],
    rt_cd: "0",
    msg_cd: "MCA00000",
    msg1: "정상처리 되었습니다.",
  };

  const serviceResponse = ServiceResponse.success("재무비율순위 조회 성공", mockData);
  return handleServiceResponse(serviceResponse, res);
});

// 10. 종목 조건검색 조회 API
const StockScreeningRequestSchema = z.object({
  FID_COND_MRKT_DIV_CODE: z.string().default("J").openapi({ example: "J" }).describe("시장구분코드"),
  FID_COND_SCR_DIV_CODE: z.string().default("20134").openapi({ example: "20134" }).describe("화면구분코드"),
  FID_INPUT_ISCD: z.string().openapi({ example: "001" }).describe("조건식번호 (HTS 조건검색에서 등록한 조건번호)"),
  FID_DIV_CLS_CODE: z.string().default("0").openapi({ example: "0" }).describe("분류구분코드"),
  FID_INPUT_DATE_1: z.string().default("").openapi({ example: "" }).describe("입력날짜1"),
});

const StockScreeningResponseSchema = z.object({
  output: z.array(
    z.object({
      mksc_shrn_iscd: z.string().describe("종목코드"),
      hts_kor_isnm: z.string().describe("종목명"),
      stck_prpr: z.string().describe("현재가"),
      prdy_vrss_sign: z.string().describe("전일대비부호"),
      prdy_vrss: z.string().describe("전일대비"),
      prdy_ctrt: z.string().describe("전일대비율"),
      acml_vol: z.string().describe("누적거래량"),
      vol_tnrt: z.string().describe("거래량회전율"),
      cpfn: z.string().describe("자본금"),
      nstk_lstg_dt: z.string().describe("신규상장일"),
    })
  ),
  rt_cd: z.string(),
  msg_cd: z.string(),
  msg1: z.string(),
});

marketAnalysisRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/stock-screening",
  description: "종목 조건검색 조회",
  summary: "종목조건검색",
  tags: ["국내주식 시장분석"],
  request: {
    headers: CommonHeaderSchema.extend({
      tr_id: z.literal("FHPST01340000"),
    }),
    query: StockScreeningRequestSchema,
  },
  responses: createApiResponse(StockScreeningResponseSchema, "조건검색 결과 조회 성공"),
});

marketAnalysisRouter.get("/stock-screening", async (_req, res) => {
  const mockData = {
    output: [
      {
        mksc_shrn_iscd: "005930",
        hts_kor_isnm: "삼성전자",
        stck_prpr: "72700",
        prdy_vrss_sign: "2",
        prdy_vrss: "400",
        prdy_ctrt: "0.55",
        acml_vol: "3686661",
        vol_tnrt: "0.62",
        cpfn: "7780000",
        nstk_lstg_dt: "19880127",
      },
    ],
    rt_cd: "0",
    msg_cd: "MCA00000",
    msg1: "정상처리 되었습니다.",
  };

  const serviceResponse = ServiceResponse.success("조건검색 결과 조회 성공", mockData);
  return handleServiceResponse(serviceResponse, res);
});