// Extend Zod with OpenAPI

import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createDirectApiResponse } from "@/api-docs/openAPIResponseBuilders";

extendZodWithOpenApi(z);

export const domesticQuotationsRegistry = new OpenAPIRegistry();
export const domesticQuotationsRouter: Router = express.Router();

// Define stock price response schema
const StockCurrentPriceResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부 (0:성공)"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .object({
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
    })
    .describe("응답 상세"),
});

// Define asking price response schema
const AskingPriceExpectedResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output1: z
    .object({
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
    })
    .describe("호가 정보"),
  output2: z
    .object({
      antc_cnpr: z.string().describe("예상 체결가"),
      antc_cntg_vrss: z.string().describe("예상 체결 대비"),
      antc_cntg_vrss_sign: z.string().describe("예상 체결 대비 부호"),
      antc_cntg_prdy_ctrt: z.string().describe("예상 체결 전일 대비율"),
      antc_vol: z.string().describe("예상 거래량"),
    })
    .describe("예상체결 정보"),
});

// Define daily price response schema
const DailyPriceResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .array(
      z.object({
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
      }),
    )
    .describe("일별시세 목록"),
});

// Define transaction response schema
const TransactionResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .array(
      z.object({
        stck_cntg_hour: z.string().describe("주식 체결 시간"),
        stck_prpr: z.string().describe("주식 현재가"),
        prdy_vrss: z.string().describe("전일 대비"),
        prdy_vrss_sign: z.string().describe("전일 대비 부호"),
        cntg_vol: z.string().describe("체결 거래량"),
        tday_rltv: z.string().describe("당일 체결 강도"),
        prdy_ctrt: z.string().describe("전일 대비율"),
      }),
    )
    .describe("체결 내역 목록"),
});

// Define investor response schema
const InvestorResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .object({
      frgn_hdn_qty: z.string().describe("외국인 보유 수량"),
      frgn_sll_qty: z.string().describe("외국인 매도 수량"),
      frgn_buy_qty: z.string().describe("외국인 매수 수량"),
      frgn_ntby_qty: z.string().describe("외국인 순매수 수량"),
      orgn_hdn_qty: z.string().describe("기관 보유 수량"),
      orgn_sll_qty: z.string().describe("기관 매도 수량"),
      orgn_buy_qty: z.string().describe("기관 매수 수량"),
      orgn_ntby_qty: z.string().describe("기관 순매수 수량"),
      sum_oprc_qty: z.string().describe("단순합계 시가 수량"),
      sum_hgpr_qty: z.string().describe("단순합계 고가 수량"),
      sum_lwpr_qty: z.string().describe("단순합계 저가 수량"),
    })
    .describe("투자자별 매매 동향"),
});

// Define member response schema
const MemberResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .array(
      z.object({
        mbcr_name: z.string().describe("회원사명"),
        sll_qty: z.string().describe("매도 수량"),
        buy_qty: z.string().describe("매수 수량"),
        ntby_qty: z.string().describe("순매수 수량"),
        sll_amt: z.string().describe("매도 금액"),
        buy_amt: z.string().describe("매수 금액"),
        ntby_amt: z.string().describe("순매수 금액"),
      }),
    )
    .describe("회원사별 매매 동향"),
});

// Define detailed price response schema
const DetailedPriceResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .object({
      stck_prpr: z.string().describe("주식 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      hts_kor_isnm: z.string().describe("HTS 한국어 종목명"),
      stck_oprc: z.string().describe("주식 시가"),
      stck_hgpr: z.string().describe("주식 고가"),
      stck_lwpr: z.string().describe("주식 저가"),
      stck_mxpr: z.string().describe("주식 상한가"),
      stck_llam: z.string().describe("주식 하한가"),
      stck_sdpr: z.string().describe("주식 기준가"),
      wghn_avrg_stck_prc: z.string().describe("가중평균 주식가격"),
      hts_frgn_ehrt: z.string().describe("HTS 외국인 소진률"),
      frgn_ntby_qty: z.string().describe("외국인 순매수 수량"),
      pgtr_ntby_qty: z.string().describe("프로그램 순매수 수량"),
      pvt_scnd_dmrs_prc: z.string().describe("프라이빗 시각경매선 가격"),
      pvt_frst_dmnd_prc: z.string().describe("프라이빗 시각매수선 가격"),
      pvt_pont_val: z.string().describe("프라이빗 지수 값"),
      pvt_frst_dmnd_qty: z.string().describe("프라이빗 시각매수선 수량"),
      pvt_scnd_dmrs_qty: z.string().describe("프라이빗 시각경매선 수량"),
      dmrs_val: z.string().describe("경매선 값"),
      dmnd_val: z.string().describe("매수선 값"),
      cpfn: z.string().describe("자본금"),
      rstc_wdth_prc: z.string().describe("제한폭 가격"),
      stck_fcam: z.string().describe("주식 액면가"),
      stck_sspr: z.string().describe("주식 대용가"),
      aspr_unit: z.string().describe("호가 단위"),
      hts_deal_qty_unit_val: z.string().describe("HTS 매매 수량 단위 값"),
      lstn_stcn: z.string().describe("상장 주수"),
      hts_avls: z.string().describe("HTS 시가총액"),
      per: z.string().describe("PER"),
      pbr: z.string().describe("PBR"),
      stac_month: z.string().describe("결산월"),
      vol_tnrt: z.string().describe("거래량 회전율"),
      eps: z.string().describe("EPS"),
      bps: z.string().describe("BPS"),
      d250_hgpr: z.string().describe("250일 최고가"),
      d250_hgpr_date: z.string().describe("250일 최고가 일자"),
      d250_hgpr_vrss_prpr_rate: z.string().describe("250일 최고가 대비 현재가 비율"),
      d250_lwpr: z.string().describe("250일 최저가"),
      d250_lwpr_date: z.string().describe("250일 최저가 일자"),
      d250_lwpr_vrss_prpr_rate: z.string().describe("250일 최저가 대비 현재가 비율"),
      stck_dryy_hgpr: z.string().describe("주식 당년 최고가"),
      dryy_hgpr_vrss_prpr_rate: z.string().describe("당년 최고가 대비 현재가 비율"),
      dryy_hgpr_date: z.string().describe("당년 최고가 일자"),
      stck_dryy_lwpr: z.string().describe("주식 당년 최저가"),
      dryy_lwpr_vrss_prpr_rate: z.string().describe("당년 최저가 대비 현재가 비율"),
      dryy_lwpr_date: z.string().describe("당년 최저가 일자"),
      w52_hgpr: z.string().describe("52주 최고가"),
      w52_hgpr_vrss_prpr_ctrt: z.string().describe("52주 최고가 대비 현재가 대비율"),
      w52_hgpr_date: z.string().describe("52주 최고가 일자"),
      w52_lwpr: z.string().describe("52주 최저가"),
      w52_lwpr_vrss_prpr_ctrt: z.string().describe("52주 최저가 대비 현재가 대비율"),
      w52_lwpr_date: z.string().describe("52주 최저가 일자"),
      whol_loan_rmnd_rate: z.string().describe("전체대출잔고비율"),
      ssts_yn: z.string().describe("공매도가능여부"),
      fcam_cnnm: z.string().describe("액면가 통화명"),
      cpfn_cnnm: z.string().describe("자본금 통화명"),
      frgn_hldn_qty: z.string().describe("외국인 보유 수량"),
      vi_cls_code: z.string().describe("VI 구분 코드"),
      ovtm_vi_cls_code: z.string().describe("시간외 VI 구분 코드"),
      last_ssts_cntg_qty: z.string().describe("최종 공매도 체결 수량"),
      invt_caful_yn: z.string().describe("투자주의종목여부"),
      mrkt_warn_cls_code: z.string().describe("시장경고구분코드"),
      short_over_yn: z.string().describe("단기과열여부"),
      sltr_yn: z.string().describe("대주주여부"),
    })
    .describe("주식 상세 시세 정보"),
});

// Define period chart response schema
const PeriodChartResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output1: z
    .object({
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      stck_prdy_clpr: z.string().describe("주식 전일 종가"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      hts_kor_isnm: z.string().describe("HTS 한국어 종목명"),
      stck_prpr: z.string().describe("주식 현재가"),
      stck_shrn_iscd: z.string().describe("주식 단축 종목코드"),
      prdy_vol: z.string().describe("전일 거래량"),
    })
    .describe("기간별 시세 요약"),
  output2: z
    .array(
      z.object({
        stck_bsop_date: z.string().describe("주식 영업 일자"),
        stck_clpr: z.string().describe("주식 종가"),
        stck_oprc: z.string().describe("주식 시가"),
        stck_hgpr: z.string().describe("주식 고가"),
        stck_lwpr: z.string().describe("주식 저가"),
        acml_vol: z.string().describe("누적 거래량"),
        acml_tr_pbmn: z.string().describe("누적 거래 대금"),
        flng_cls_code: z.string().describe("락 구분 코드"),
        prtt_rate: z.string().describe("분할 비율"),
        mod_yn: z.string().describe("분할변경여부"),
        prdy_vrss_sign: z.string().describe("전일 대비 부호"),
        prdy_vrss: z.string().describe("전일 대비"),
        revl_issu_reas: z.string().describe("재평가사유"),
      }),
    )
    .describe("기간별 시세 목록"),
});

// Define intraday chart response schema
const IntradayChartResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output1: z
    .object({
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      stck_prdy_clpr: z.string().describe("주식 전일 종가"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      hts_kor_isnm: z.string().describe("HTS 한국어 종목명"),
      stck_prpr: z.string().describe("주식 현재가"),
      stck_shrn_iscd: z.string().describe("주식 단축 종목코드"),
    })
    .describe("당일 분봉 요약"),
  output2: z
    .array(
      z.object({
        stck_bsop_date: z.string().describe("주식 영업 일자"),
        stck_cntg_hour: z.string().describe("주식 체결 시간"),
        stck_prpr: z.string().describe("주식 현재가"),
        stck_oprc: z.string().describe("주식 시가"),
        stck_hgpr: z.string().describe("주식 고가"),
        stck_lwpr: z.string().describe("주식 저가"),
        cntg_vol: z.string().describe("체결 거래량"),
        acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      }),
    )
    .describe("당일 분봉 목록"),
});

// Define time-based transaction response schema
const TimeTransactionResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .array(
      z.object({
        stck_cntg_hour: z.string().describe("주식 체결 시간"),
        stck_prpr: z.string().describe("주식 현재가"),
        prdy_vrss: z.string().describe("전일 대비"),
        prdy_vrss_sign: z.string().describe("전일 대비 부호"),
        cntg_vol: z.string().describe("체결 거래량"),
        tday_rltv: z.string().describe("당일 체결강도"),
        prdy_ctrt: z.string().describe("전일 대비율"),
      }),
    )
    .describe("시간대별 체결 내역"),
});

// Define overtime price response schema
const OvertimePriceResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .object({
      stck_shrn_iscd: z.string().describe("주식 단축 종목코드"),
      stck_prpr: z.string().describe("주식 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      hts_kor_isnm: z.string().describe("HTS 한국어 종목명"),
      stck_oprc: z.string().describe("주식 시가"),
      stck_hgpr: z.string().describe("주식 고가"),
      stck_lwpr: z.string().describe("주식 저가"),
      stck_mxpr: z.string().describe("주식 상한가"),
      stck_llam: z.string().describe("주식 하한가"),
      stck_prdy_clpr: z.string().describe("주식 전일 종가"),
      askp_rsqn1: z.string().describe("매도호가 잔량 1"),
      askp_rsqn2: z.string().describe("매도호가 잔량 2"),
      askp_rsqn3: z.string().describe("매도호가 잔량 3"),
      askp_rsqn4: z.string().describe("매도호가 잔량 4"),
      askp_rsqn5: z.string().describe("매도호가 잔량 5"),
      bidp_rsqn1: z.string().describe("매수호가 잔량 1"),
      bidp_rsqn2: z.string().describe("매수호가 잔량 2"),
      bidp_rsqn3: z.string().describe("매수호가 잔량 3"),
      bidp_rsqn4: z.string().describe("매수호가 잔량 4"),
      bidp_rsqn5: z.string().describe("매수호가 잔량 5"),
      askp1: z.string().describe("매도호가 1"),
      askp2: z.string().describe("매도호가 2"),
      askp3: z.string().describe("매도호가 3"),
      askp4: z.string().describe("매도호가 4"),
      askp5: z.string().describe("매도호가 5"),
      bidp1: z.string().describe("매수호가 1"),
      bidp2: z.string().describe("매수호가 2"),
      bidp3: z.string().describe("매수호가 3"),
      bidp4: z.string().describe("매수호가 4"),
      bidp5: z.string().describe("매수호가 5"),
      antc_cnpr: z.string().describe("예상 체결가"),
      antc_cntg_vrss: z.string().describe("예상 체결 대비"),
      antc_cntg_vrss_sign: z.string().describe("예상 체결 대비 부호"),
      antc_cntg_prdy_ctrt: z.string().describe("예상 체결 전일 대비율"),
      antc_vol: z.string().describe("예상 거래량"),
      stck_fcam: z.string().describe("주식 액면가"),
      stck_sspr: z.string().describe("주식 대용가"),
      aspr_unit: z.string().describe("호가 단위"),
      hts_deal_qty_unit_val: z.string().describe("HTS 매매 수량 단위 값"),
      lstn_stcn: z.string().describe("상장 주수"),
      hts_avls: z.string().describe("HTS 시가총액"),
      per: z.string().describe("PER"),
      pbr: z.string().describe("PBR"),
      stac_month: z.string().describe("결산월"),
      vol_tnrt: z.string().describe("거래량 회전율"),
      eps: z.string().describe("EPS"),
      bps: z.string().describe("BPS"),
      d250_hgpr: z.string().describe("250일 최고가"),
      d250_hgpr_date: z.string().describe("250일 최고가 일자"),
      d250_hgpr_vrss_prpr_rate: z.string().describe("250일 최고가 대비 현재가 비율"),
      d250_lwpr: z.string().describe("250일 최저가"),
      d250_lwpr_date: z.string().describe("250일 최저가 일자"),
      d250_lwpr_vrss_prpr_rate: z.string().describe("250일 최저가 대비 현재가 비율"),
      stck_dryy_hgpr: z.string().describe("주식 당년 최고가"),
      dryy_hgpr_vrss_prpr_rate: z.string().describe("당년 최고가 대비 현재가 비율"),
      dryy_hgpr_date: z.string().describe("당년 최고가 일자"),
      stck_dryy_lwpr: z.string().describe("주식 당년 최저가"),
      dryy_lwpr_vrss_prpr_rate: z.string().describe("당년 최저가 대비 현재가 비율"),
      dryy_lwpr_date: z.string().describe("당년 최저가 일자"),
      w52_hgpr: z.string().describe("52주 최고가"),
      w52_hgpr_vrss_prpr_ctrt: z.string().describe("52주 최고가 대비 현재가 대비율"),
      w52_hgpr_date: z.string().describe("52주 최고가 일자"),
      w52_lwpr: z.string().describe("52주 최저가"),
      w52_lwpr_vrss_prpr_ctrt: z.string().describe("52주 최저가 대비 현재가 대비율"),
      w52_lwpr_date: z.string().describe("52주 최저가 일자"),
      whol_loan_rmnd_rate: z.string().describe("전체대출잔고비율"),
      ssts_yn: z.string().describe("공매도가능여부"),
      fcam_cnnm: z.string().describe("액면가 통화명"),
      cpfn_cnnm: z.string().describe("자본금 통화명"),
      frgn_hldn_qty: z.string().describe("외국인 보유 수량"),
      vi_cls_code: z.string().describe("VI 구분 코드"),
      ovtm_vi_cls_code: z.string().describe("시간외 VI 구분 코드"),
      last_ssts_cntg_qty: z.string().describe("최종 공매도 체결 수량"),
      invt_caful_yn: z.string().describe("투자주의종목여부"),
      mrkt_warn_cls_code: z.string().describe("시장경고구분코드"),
      short_over_yn: z.string().describe("단기과열여부"),
      sltr_yn: z.string().describe("대주주여부"),
    })
    .describe("시간외 현재가 정보"),
});

// 주식현재가 시세 (가장 많이 사용하는 API)
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-price",
  tags: ["domestic-stock-quotations"],
  summary: "주식현재가 시세",
  description: `국내주식의 현재가 시세 정보를 조회합니다

**TR_ID:** FHKST01010100 (실전/모의 동일)`,
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드 (J: 주식)"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리, 예: 005930)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "StockCurrentPriceResponse",
    StockCurrentPriceResponseSchema,
    "주식 현재가 조회 성공",
  ),
});

// 주식현재가 시세 2
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-price-2",
  tags: ["domestic-stock-quotations"],
  summary: "주식현재가 시세2",
  description: "주식의 추가 시세 정보를 조회합니다 (TR_ID: FHPST01010000)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "DetailedPriceResponse",
    DetailedPriceResponseSchema,
    "주식 시세 2 조회 성공",
  ),
});

// 주식현재가 체결
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-ccnl",
  tags: ["domestic-stock-quotations"],
  summary: "주식현재가 체결",
  description: "주식의 체결 내역 정보를 조회합니다 (TR_ID: FHKST01010300)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "TransactionResponse",
    TransactionResponseSchema,
    "주식 체결 조회 성공",
  ),
});

// 일별시세
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-daily-price",
  tags: ["domestic-stock-quotations"],
  summary: "주식현재가 일자별",
  description: "주식의 일자별 시세 정보를 조회합니다 (TR_ID: FHKST01010400)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
      FID_PERIOD_DIV_CODE: z.enum(["D", "W", "M"]).default("D").describe("기간분류코드 (D:일봉, W:주봉, M:월봉)"),
      FID_ORG_ADJ_PRC: z.enum(["0", "1"]).default("0").describe("수정주가 여부 (0:수정안함, 1:수정함)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "DailyPriceResponse",
    DailyPriceResponseSchema,
    "일별시세 조회 성공",
  ),
});

// 호가/예상체결
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn",
  tags: ["domestic-stock-quotations"],
  summary: "주식현재가 호가/예상체결",
  description: "주식의 호가 정보와 예상체결 정보를 조회합니다 (TR_ID: FHKST01010200)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "AskingPriceExpectedResponse",
    AskingPriceExpectedResponseSchema,
    "호가/예상체결 조회 성공",
  ),
});

// 주식현재가 투자자
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-investor",
  tags: ["domestic-stock-quotations"],
  summary: "주식현재가 투자자",
  description: "주식의 투자자별 매매 동향을 조회합니다 (TR_ID: FHKST01010900)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "InvestorResponse",
    InvestorResponseSchema,
    "투자자 매매동향 조회 성공",
  ),
});

// 주식현재가 회원사
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-member",
  tags: ["domestic-stock-quotations"],
  summary: "주식현재가 회원사",
  description: "주식의 회원사별 매매 동향을 조회합니다 (TR_ID: FHKST01010600)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "MemberResponse",
    MemberResponseSchema,
    "회원사 매매동향 조회 성공",
  ),
});

// 국내주식 기간별시세(일/주/월/년)
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice",
  tags: ["domestic-stock-quotations"],
  summary: "국내주식기간별시세(일/주/월/년)",
  description: "주식의 기간별 차트 데이터를 조회합니다 (TR_ID: FHKST03010100)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
      FID_INPUT_DATE_1: z.string().describe("시작일자 (YYYYMMDD)"),
      FID_INPUT_DATE_2: z.string().describe("종료일자 (YYYYMMDD)"),
      FID_PERIOD_DIV_CODE: z.enum(["D", "W", "M", "Y"]).describe("기간분류코드 (D:일봉, W:주봉, M:월봉, Y:년봉)"),
      FID_ORG_ADJ_PRC: z.enum(["0", "1"]).default("0").describe("수정죽가 여부 (0:수정안함, 1:수정함)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "PeriodChartResponse",
    PeriodChartResponseSchema,
    "기간별 시세 조회 성공",
  ),
});

// 주식당일분봉조회
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice",
  tags: ["domestic-stock-quotations"],
  summary: "주식당일분봉조회",
  description: "주식의 당일 분봉 차트 데이터를 조회합니다 (TR_ID: FHKST03010200)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
      FID_INPUT_HOUR_1: z.string().describe("시작시간 (HHMMSS)"),
      FID_PW_DATA_INCU_YN: z.enum(["Y", "N"]).default("Y").describe("과거 데이터 포함 여부"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "IntradayChartResponse",
    IntradayChartResponseSchema,
    "당일 분봉 조회 성공",
  ),
});

// 주식현재가 당일시간대별체결
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-time-itemconclusion",
  tags: ["domestic-stock-quotations"],
  summary: "주식현재가 당일시간대별체결",
  description: "주식의 시간대별 체결 내역을 조회합니다 (TR_ID: FHPST01060000)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
      FID_INPUT_HOUR_1: z.string().describe("시작시간 (HHMMSS)"),
      FID_INPUT_HOUR_2: z.string().describe("종료시간 (HHMMSS)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "TimeTransactionResponse",
    TimeTransactionResponseSchema,
    "시간대별 체결 조회 성공",
  ),
});

// 국내주식 시간외현재가
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-overtime-price",
  tags: ["domestic-stock-quotations"],
  summary: "국내주식 시간외현재가",
  description: "주식의 시간외 현재가 정보를 조회합니다 (TR_ID: FHPST02300000)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "OvertimePriceResponse",
    OvertimePriceResponseSchema,
    "시간외 현재가 조회 성공",
  ),
});

// Define ETF component stock response schema
const ETFComponentStockResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output1: z
    .object({
      etf_mdd_date: z.string().describe("ETF 구성일자"),
      etf_prpr: z.string().describe("ETF 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      etf_cnfg_issu_avls: z.string().describe("ETF 구성종목 시총"),
    })
    .describe("ETF 요약 정보"),
  output2: z
    .array(
      z.object({
        stck_shrn_iscd: z.string().describe("주식 단축 종목코드"),
        hts_kor_isnm: z.string().describe("HTS 한국어 종목명"),
        stck_prpr: z.string().describe("주식 현재가"),
        prdy_vrss: z.string().describe("전일 대비"),
        prdy_vrss_sign: z.string().describe("전일 대비 부호"),
        prdy_ctrt: z.string().describe("전일 대비율"),
        acml_vol: z.string().describe("누적 거래량"),
        etf_cnfg_wght: z.string().describe("ETF 구성비중"),
        etf_cnfg_qty: z.string().describe("ETF 구성수량"),
        etf_cnfg_avls: z.string().describe("ETF 구성시총"),
      }),
    )
    .describe("ETF 구성종목 목록"),
});

// Define NAV comparison trend response schema
const NAVComparisonTrendResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .array(
      z.object({
        stck_shrn_iscd: z.string().describe("주식 단축 종목코드"),
        hts_kor_isnm: z.string().describe("HTS 한국어 종목명"),
        etf_nav: z.string().describe("ETF NAV"),
        etf_prpr: z.string().describe("ETF 현재가"),
        prdy_vrss: z.string().describe("전일 대비"),
        prdy_vrss_sign: z.string().describe("전일 대비 부호"),
        prdy_ctrt: z.string().describe("전일 대비율"),
        nav_prpr_vrss: z.string().describe("NAV 현재가 대비"),
        nav_prpr_vrss_sign: z.string().describe("NAV 현재가 대비 부호"),
        nav_prpr_rate: z.string().describe("NAV 현재가 대비율"),
      }),
    )
    .describe("NAV 비교추이 목록"),
});

// Define overtime daily price response schema
const OvertimeDailyPriceResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output1: z
    .object({
      ovtm_untp_prpr: z.string().describe("시간외 단일가 현재가"),
      ovtm_untp_prdy_vrss: z.string().describe("시간외 단일가 전일 대비"),
      ovtm_untp_prdy_vrss_sign: z.string().describe("시간외 단일가 전일 대비 부호"),
      ovtm_untp_prdy_ctrt: z.string().describe("시간외 단일가 전일 대비율"),
      ovtm_untp_vol: z.string().describe("시간외 단일가 거래량"),
    })
    .describe("시간외 단일가 정보"),
  output2: z
    .array(
      z.object({
        stck_bsop_date: z.string().describe("주식 영업 일자"),
        ovtm_untp_prpr: z.string().describe("시간외 단일가 현재가"),
        prdy_vrss: z.string().describe("전일 대비"),
        prdy_vrss_sign: z.string().describe("전일 대비 부호"),
        prdy_ctrt: z.string().describe("전일 대비율"),
        ovtm_untp_vol: z.string().describe("시간외 단일가 거래량"),
        ovtm_untp_tr_pbmn: z.string().describe("시간외 단일가 거래대금"),
      }),
    )
    .describe("시간외 일자별 주가 목록"),
});

// Define overtime asking price response schema
const OvertimeAskingPriceResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .object({
      ovtm_askp1: z.string().describe("시간외 매도호가 1"),
      ovtm_askp2: z.string().describe("시간외 매도호가 2"),
      ovtm_askp3: z.string().describe("시간외 매도호가 3"),
      ovtm_askp4: z.string().describe("시간외 매도호가 4"),
      ovtm_askp5: z.string().describe("시간외 매도호가 5"),
      ovtm_bidp1: z.string().describe("시간외 매수호가 1"),
      ovtm_bidp2: z.string().describe("시간외 매수호가 2"),
      ovtm_bidp3: z.string().describe("시간외 매수호가 3"),
      ovtm_bidp4: z.string().describe("시간외 매수호가 4"),
      ovtm_bidp5: z.string().describe("시간외 매수호가 5"),
      ovtm_askp_rsqn1: z.string().describe("시간외 매도호가 잔량 1"),
      ovtm_askp_rsqn2: z.string().describe("시간외 매도호가 잔량 2"),
      ovtm_askp_rsqn3: z.string().describe("시간외 매도호가 잔량 3"),
      ovtm_askp_rsqn4: z.string().describe("시간외 매도호가 잔량 4"),
      ovtm_askp_rsqn5: z.string().describe("시간외 매도호가 잔량 5"),
      ovtm_bidp_rsqn1: z.string().describe("시간외 매수호가 잔량 1"),
      ovtm_bidp_rsqn2: z.string().describe("시간외 매수호가 잔량 2"),
      ovtm_bidp_rsqn3: z.string().describe("시간외 매수호가 잔량 3"),
      ovtm_bidp_rsqn4: z.string().describe("시간외 매수호가 잔량 4"),
      ovtm_bidp_rsqn5: z.string().describe("시간외 매수호가 잔량 5"),
      ovtm_antc_cnpr: z.string().describe("시간외 예상 체결가"),
      ovtm_antc_vol: z.string().describe("시간외 예상 거래량"),
    })
    .describe("시간외 호가 정보"),
});

// Define daily chart response schema
const DailyChartResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output1: z
    .object({
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      stck_prdy_clpr: z.string().describe("주식 전일 종가"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      hts_kor_isnm: z.string().describe("HTS 한국어 종목명"),
      stck_prpr: z.string().describe("주식 현재가"),
      stck_shrn_iscd: z.string().describe("주식 단축 종목코드"),
    })
    .describe("일별 분봉 요약"),
  output2: z
    .array(
      z.object({
        stck_bsop_date: z.string().describe("주식 영업 일자"),
        stck_cntg_hour: z.string().describe("주식 체결 시간"),
        stck_prpr: z.string().describe("주식 현재가"),
        stck_oprc: z.string().describe("주식 시가"),
        stck_hgpr: z.string().describe("주식 고가"),
        stck_lwpr: z.string().describe("주식 저가"),
        cntg_vol: z.string().describe("체결 거래량"),
        acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      }),
    )
    .describe("일별 분봉 목록"),
});

// Define NAV comparison daily trend response schema
const NAVComparisonDailyTrendResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .array(
      z.object({
        stck_bsop_date: z.string().describe("주식 영업 일자"),
        etf_nav: z.string().describe("ETF NAV"),
        etf_prpr: z.string().describe("ETF 현재가"),
        prdy_vrss: z.string().describe("전일 대비"),
        prdy_vrss_sign: z.string().describe("전일 대비 부호"),
        prdy_ctrt: z.string().describe("전일 대비율"),
        nav_prpr_vrss: z.string().describe("NAV 현재가 대비"),
        nav_prpr_vrss_sign: z.string().describe("NAV 현재가 대비 부호"),
        nav_prpr_rate: z.string().describe("NAV 현재가 대비율"),
      }),
    )
    .describe("NAV 비교추이 일별 목록"),
});

// Define NAV comparison time trend response schema
const NAVComparisonTimeTrendResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .array(
      z.object({
        stck_cntg_hour: z.string().describe("주식 체결 시간"),
        etf_nav: z.string().describe("ETF NAV"),
        etf_prpr: z.string().describe("ETF 현재가"),
        prdy_vrss: z.string().describe("전일 대비"),
        prdy_vrss_sign: z.string().describe("전일 대비 부호"),
        prdy_ctrt: z.string().describe("전일 대비율"),
        nav_prpr_vrss: z.string().describe("NAV 현재가 대비"),
        nav_prpr_vrss_sign: z.string().describe("NAV 현재가 대비 부호"),
        nav_prpr_rate: z.string().describe("NAV 현재가 대비율"),
      }),
    )
    .describe("NAV 비교추이 분별 목록"),
});

// Define ETF/ETN current price response schema
const ETFETNCurrentPriceResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .object({
      stck_shrn_iscd: z.string().describe("주식 단축 종목코드"),
      stck_prpr: z.string().describe("주식 현재가"),
      prdy_vrss: z.string().describe("전일 대비"),
      prdy_vrss_sign: z.string().describe("전일 대비 부호"),
      prdy_ctrt: z.string().describe("전일 대비율"),
      acml_vol: z.string().describe("누적 거래량"),
      acml_tr_pbmn: z.string().describe("누적 거래 대금"),
      hts_kor_isnm: z.string().describe("HTS 한국어 종목명"),
      stck_oprc: z.string().describe("주식 시가"),
      stck_hgpr: z.string().describe("주식 고가"),
      stck_lwpr: z.string().describe("주식 저가"),
      stck_mxpr: z.string().describe("주식 상한가"),
      stck_llam: z.string().describe("주식 하한가"),
      stck_prdy_clpr: z.string().describe("주식 전일 종가"),
      etf_nav: z.string().describe("ETF NAV"),
      etf_nav_prdy_vrss: z.string().describe("ETF NAV 전일 대비"),
      etf_nav_prdy_vrss_sign: z.string().describe("ETF NAV 전일 대비 부호"),
      etf_nav_prdy_ctrt: z.string().describe("ETF NAV 전일 대비율"),
      nav_prpr_vrss: z.string().describe("NAV 현재가 대비"),
      nav_prpr_vrss_sign: z.string().describe("NAV 현재가 대비 부호"),
      nav_prpr_rate: z.string().describe("NAV 현재가 대비율"),
    })
    .describe("ETF/ETN 현재가 정보"),
});

// Define expected closing price response schema
const ExpectedClosingPriceResponseSchema = z.object({
  rt_cd: z.string().describe("성공 실패 여부"),
  msg_cd: z.string().describe("응답코드"),
  msg1: z.string().describe("응답메세지"),
  output: z
    .array(
      z.object({
        stck_shrn_iscd: z.string().describe("주식 단축 종목코드"),
        hts_kor_isnm: z.string().describe("HTS 한국어 종목명"),
        stck_prpr: z.string().describe("주식 현재가"),
        prdy_vrss: z.string().describe("전일 대비"),
        prdy_vrss_sign: z.string().describe("전일 대비 부호"),
        prdy_ctrt: z.string().describe("전일 대비율"),
        exp_clpr: z.string().describe("예상 종가"),
        exp_clpr_vrss: z.string().describe("예상 종가 대비"),
        exp_clpr_vrss_sign: z.string().describe("예상 종가 대비 부호"),
        exp_clpr_ctrt: z.string().describe("예상 종가 대비율"),
      }),
    )
    .describe("예상 체결가 목록"),
});

// ETF 구성종목시세
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/etfetn/v1/quotations/inquire-component-stock-price",
  tags: ["domestic-stock-quotations"],
  summary: "ETF 구성종목시세",
  description: "ETF의 구성종목 시세 정보를 조회합니다 (TR_ID: FHKST121600C0)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(12).describe("종목코드"),
      FID_COND_SCR_DIV_CODE: z.string().default("11216").describe("조건화면분류코드"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "ETFComponentStockResponse",
    ETFComponentStockResponseSchema,
    "ETF 구성종목시세 조회 성공",
  ),
});

// NAV 비교추이(종목)
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/etfetn/v1/quotations/nav-comparison-trend",
  tags: ["domestic-stock-quotations"],
  summary: "NAV 비교추이(종목)",
  description: "ETF/ETN의 NAV 비교추이를 종목별로 조회합니다 (TR_ID: FHPST02440000)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(12).describe("종목코드"),
      FID_INPUT_DATE_1: z.string().describe("시작일자 (YYYYMMDD)"),
      FID_INPUT_DATE_2: z.string().describe("종료일자 (YYYYMMDD)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "NAVComparisonTrendResponse",
    NAVComparisonTrendResponseSchema,
    "NAV 비교추이(종목) 조회 성공",
  ),
});

// 주식현재가 시간외일자별주가
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-daily-overtimeprice",
  tags: ["domestic-stock-quotations"],
  summary: "주식현재가 시간외일자별주가",
  description: "주식의 시간외 일자별 주가 정보를 조회합니다 (TR_ID: FHPST02320000)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(12).describe("종목코드"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "OvertimeDailyPriceResponse",
    OvertimeDailyPriceResponseSchema,
    "시간외 일자별주가 조회 성공",
  ),
});

// 국내주식 시간외호가
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-overtime-asking-price",
  tags: ["domestic-stock-quotations"],
  summary: "국내주식 시간외호가",
  description: "주식의 시간외 호가 정보를 조회합니다 (TR_ID: FHPST02300400)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "OvertimeAskingPriceResponse",
    OvertimeAskingPriceResponseSchema,
    "시간외호가 조회 성공",
  ),
});

// 주식일별분봉조회
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/inquire-time-dailychartprice",
  tags: ["domestic-stock-quotations"],
  summary: "주식일별분봉조회",
  description: "주식의 일별 분봉 차트 데이터를 조회합니다 (TR_ID: FHKST03010230)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(6).describe("종목코드 (6자리)"),
      FID_INPUT_DATE_1: z.string().describe("시작일자 (YYYYMMDD)"),
      FID_PERIOD_DIV_CODE: z.enum(["1", "5", "10", "15", "30", "60"]).describe("분 간격 (1,5,10,15,30,60)"),
      FID_ORG_ADJ_PRC: z.enum(["0", "1"]).default("0").describe("수정주가 여부 (0:수정안함, 1:수정함)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "DailyChartResponse",
    DailyChartResponseSchema,
    "일별 분봉 조회 성공",
  ),
});

// NAV 비교추이(일)
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/etfetn/v1/quotations/nav-comparison-daily-trend",
  tags: ["domestic-stock-quotations"],
  summary: "NAV 비교추이(일)",
  description: "ETF/ETN의 NAV 비교추이를 일별로 조회합니다 (TR_ID: FHPST02440200)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(12).describe("종목코드"),
      FID_INPUT_DATE_1: z.string().describe("시작일자 (YYYYMMDD)"),
      FID_INPUT_DATE_2: z.string().describe("종료일자 (YYYYMMDD)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "NAVComparisonDailyTrendResponse",
    NAVComparisonDailyTrendResponseSchema,
    "NAV 비교추이(일) 조회 성공",
  ),
});

// NAV 비교추이(분)
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/etfetn/v1/quotations/nav-comparison-time-trend",
  tags: ["domestic-stock-quotations"],
  summary: "NAV 비교추이(분)",
  description: "ETF/ETN의 NAV 비교추이를 분별로 조회합니다 (TR_ID: FHPST02440100)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(12).describe("종목코드"),
      FID_INPUT_DATE_1: z.string().describe("조회일자 (YYYYMMDD)"),
      FID_INPUT_HOUR_1: z.string().describe("시작시간 (HHMMSS)"),
      FID_INPUT_HOUR_2: z.string().describe("종료시간 (HHMMSS)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "NAVComparisonTimeTrendResponse",
    NAVComparisonTimeTrendResponseSchema,
    "NAV 비교추이(분) 조회 성공",
  ),
});

// ETF/ETN 현재가
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/etfetn/v1/quotations/inquire-price",
  tags: ["domestic-stock-quotations"],
  summary: "ETF/ETN 현재가",
  description: "ETF/ETN의 현재가 정보를 조회합니다 (TR_ID: FHPST02400000)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_INPUT_ISCD: z.string().min(6).max(12).describe("종목코드"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "ETFETNCurrentPriceResponse",
    ETFETNCurrentPriceResponseSchema,
    "ETF/ETN 현재가 조회 성공",
  ),
});

// 국내주식 장마감 예상체결가
domesticQuotationsRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/quotations/exp-closing-price",
  tags: ["domestic-stock-quotations"],
  summary: "국내주식 장마감 예상체결가",
  description: "국내주식의 장마감 예상체결가를 조회합니다 (TR_ID: FHKST117300C0)",
  security: [{ KoreaInvestmentAuth: [] }, { KoreaInvestmentSecret: [] }, { TransactionId: [] }, { CustomerType: [] }],
  request: {
    query: z.object({
      FID_COND_MRKT_DIV_CODE: z.enum(["J"]).default("J").describe("조건 시장 분류 코드"),
      FID_COND_SCR_DIV_CODE: z.string().default("20171").describe("조건화면분류코드"),
      FID_INPUT_ISCD: z.string().optional().describe("종목코드 (전체조회시 생략)"),
      FID_DIV_CLS_CODE: z.enum(["0", "1"]).default("0").describe("분류구분코드 (0:전체, 1:특정종목)"),
      FID_RANK_SORT_CLS_CODE: z.enum(["0", "1"]).default("0").describe("순위정렬구분코드 (0:상승률순, 1:하락률순)"),
    }),
  },
  responses: createDirectApiResponse(
    domesticQuotationsRegistry,
    "ExpectedClosingPriceResponse",
    ExpectedClosingPriceResponseSchema,
    "예상체결가 조회 성공",
  ),
});

// Express router handlers - 실제 API 구현
domesticQuotationsRouter.get("/v1/quotations/inquire-price", async (req, res) => {
  try {
    // 더미 응답으로 테스트 (실제로는 한국투자증권 API를 호출해야 함)
    const { FID_INPUT_ISCD, FID_COND_MRKT_DIV_CODE } = req.query;

    console.log("Query parameters received:", req.query);

    // 임시 더미 데이터
    const response = {
      rt_cd: "0",
      msg_cd: "MCA00000",
      msg1: "정상처리 되었습니다.",
      output: {
        iscd_stat_cls_code: "55",
        marg_rate: "40",
        rprs_mrkt_kor_name: "KOSPI",
        bstp_kor_isnm: "전기전자",
        temp_stop_yn: "N",
        oprc_rang_cont_yn: "N",
        stck_prpr: "71000",
        stck_shrn_iscd: FID_INPUT_ISCD || "005930",
        prdy_vrss: "1000",
        prdy_vrss_sign: "2",
        prdy_ctrt: "1.43",
        acml_vol: "15678910",
        stck_oprc: "70500",
        stck_hgpr: "71500",
        stck_lwpr: "70000",
        stck_mxpr: "91600",
        stck_llam: "50400",
      },
    };

    res.json(response);
  } catch (error: any) {
    console.error("Failed to fetch stock quotation:", error.message);
    res.status(500).json({
      error: "Failed to fetch stock quotation",
      details: error.message,
    });
  }
});
