import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

// Extend Zod with OpenAPI
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export const domesticTradingRegistry = new OpenAPIRegistry();
export const domesticTradingRouter: Router = express.Router();

// 주식주문(현금) - 가장 중요한 API
domesticTradingRegistry.registerPath({
  method: "post",
  path: "/uapi/domestic-stock/v1/trading/order-cash",
  tags: ["국내주식 주문/계좌"],
  summary: "주식주문(현금)",
  description: `현금으로 국내주식을 매수/매도 주문합니다
  
**TR_ID:**
- **실전**: 매수 TTTC0012U, 매도 TTTC0011U
- **모의**: 매수 VTTC0012U, 매도 VTTC0011U`,
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            CANO: z.string().describe("종합계좌번호"),
            ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
            PDNO: z.string().describe("상품번호 (종목코드)"),
            ORD_DVSN: z.enum(["00", "01", "02", "03", "04", "05", "06", "07"]).describe("주문구분 (00:지정가, 01:시장가, 02:조건부지정가, 03:최유리지정가, 04:최우선지정가, 05:장전시간외, 06:장후시간외, 07:시간외단일가)"),
            ORD_QTY: z.string().describe("주문수량"),
            ORD_UNPR: z.string().describe("주문단가 (시장가의 경우 공백)"),
          }),
        },
      },
    },
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.enum(["TTTC0012U", "TTTC0011U", "VTTC0012U", "VTTC0011U"]).describe("거래ID (실전: 매수-TTTC0012U/매도-TTTC0011U, 모의: 매수-VTTC0012U/매도-VTTC0011U)"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
      hashkey: z.string().describe("해시키 (/uapi/hashkey로 생성)"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    output: z.object({
      KRX_FWDG_ORD_ORGNO: z.string().describe("KRX 전송 주문 조직번호"),
      ODNO: z.string().describe("주문번호"),
      ORD_TMD: z.string().describe("주문시각"),
    }).describe("주문 결과"),
  }), "주식 주문 성공"),
});

// 주식주문(정정취소)
domesticTradingRegistry.registerPath({
  method: "post",
  path: "/uapi/domestic-stock/v1/trading/order-rvsecncl",
  tags: ["국내주식 주문/계좌"],
  summary: "주식주문(정정취소)",
  description: `기존 주문을 정정하거나 취소합니다

**TR_ID:**
- **실전**: TTTC0013U
- **모의**: VTTC0013U`,
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            CANO: z.string().describe("종합계좌번호"),
            ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
            KRX_FWDG_ORD_ORGNO: z.string().describe("KRX 전송 주문 조직번호"),
            ORGN_ODNO: z.string().describe("원주문번호"),
            ORD_DVSN: z.enum(["00", "01"]).describe("주문구분 (00:지정가, 01:시장가)"),
            RVSE_CNCL_DVSN_CD: z.enum(["01", "02"]).describe("정정취소구분코드 (01:정정, 02:취소)"),
            ORD_QTY: z.string().describe("주문수량 (취소시 0)"),
            ORD_UNPR: z.string().describe("주문단가 (취소시 0)"),
            QTY_ALL_ORD_YN: z.enum(["Y", "N"]).describe("잔량전부주문여부"),
          }),
        },
      },
    },
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("TTTC0013U").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
      hashkey: z.string().describe("해시키"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    output: z.object({
      KRX_FWDG_ORD_ORGNO: z.string().describe("KRX 전송 주문 조직번호"),
      ODNO: z.string().describe("주문번호"),
      ORD_TMD: z.string().describe("주문시각"),
    }).describe("정정취소 결과"),
  }), "주식 정정취소 성공"),
});

// 주식잔고조회
domesticTradingRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/trading/inquire-balance",
  tags: ["국내주식 주문/계좌"],
  summary: "주식잔고조회", 
  description: `보유 주식의 잔고 정보를 조회합니다

**TR_ID:**
- **실전**: TTTC8434R
- **모의**: VTTC8434R`,
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      CANO: z.string().describe("종합계좌번호"),
      ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
      AFHR_FLPR_YN: z.enum(["N", "Y"]).default("N").describe("시간외단일가여부"),
      OFL_YN: z.enum(["N", "Y"]).default("N").describe("오프라인여부"),
      INQR_DVSN: z.enum(["01", "02"]).default("02").describe("조회구분 (01:대출일별, 02:종목별)"),
      UNPR_DVSN: z.enum(["01", "02"]).default("01").describe("단가구분 (01:현재가, 02:평균가)"),
      FUND_STTL_ICLD_YN: z.enum(["N", "Y"]).default("N").describe("펀드결제분포함여부"),
      FNCG_AMT_AUTO_RDPT_YN: z.enum(["N", "Y"]).default("N").describe("융자금액자동상환여부"),
      PRCS_DVSN: z.enum(["00", "01"]).default("00").describe("처리구분 (00:전일매매포함, 01:전일매매미포함)"),
      CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
      CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("TTTC8434R").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    ctx_area_fk100: z.string().describe("연속조회검색조건100"),
    ctx_area_nk100: z.string().describe("연속조회키100"),
    output1: z.array(z.object({
      pdno: z.string().describe("상품번호 (종목코드)"),
      prdt_name: z.string().describe("상품명 (종목명)"),
      trd_dvsn_name: z.string().describe("매매구분명"),
      bfdy_buy_qty: z.string().describe("전일매수수량"),
      bfdy_sll_qty: z.string().describe("전일매도수량"),
      thdt_buyqty: z.string().describe("금일매수수량"),
      thdt_sll_qty: z.string().describe("금일매도수량"),
      hldg_qty: z.string().describe("보유수량"),
      ord_psbl_qty: z.string().describe("주문가능수량"),
      pchs_avg_pric: z.string().describe("매입평균가격"),
      pchs_amt: z.string().describe("매입금액"),
      prpr: z.string().describe("현재가"),
      evlu_amt: z.string().describe("평가금액"),
      evlu_pfls_amt: z.string().describe("평가손익금액"),
      evlu_pfls_rt: z.string().describe("평가손익율"),
    })).describe("보유종목 목록"),
    output2: z.array(z.object({
      dnca_tot_amt: z.string().describe("예수금총금액"),
      nxdy_excc_amt: z.string().describe("익일정산금액"),
      prvs_rcdl_excc_amt: z.string().describe("가수도정산금액"),
      cma_evlu_amt: z.string().describe("CMA평가금액"),
      bfdy_buy_amt: z.string().describe("전일매수금액"),
      thdt_buy_amt: z.string().describe("금일매수금액"),
      nxdy_auto_rdpt_amt: z.string().describe("익일자동상환금액"),
      bfdy_sll_amt: z.string().describe("전일매도금액"),
      thdt_sll_amt: z.string().describe("금일매도금액"),
      d2_auto_rdpt_amt: z.string().describe("D+2자동상환금액"),
      bfdy_tlex_amt: z.string().describe("전일제비용금액"),
      thdt_tlex_amt: z.string().describe("금일제비용금액"),
      tot_loan_amt: z.string().describe("총대출금액"),
      scts_evlu_amt: z.string().describe("유가평가금액"),
      tot_evlu_amt: z.string().describe("총평가금액"),
      nass_amt: z.string().describe("순자산금액"),
      fncg_gld_auto_rdpt_yn: z.string().describe("융자금자동상환여부"),
      pchs_amt_smtl_amt: z.string().describe("매입금액합계금액"),
      evlu_amt_smtl_amt: z.string().describe("평가금액합계금액"),
      evlu_pfls_smtl_amt: z.string().describe("평가손익합계금액"),
      tot_stln_slng_chgs: z.string().describe("총대주매각대금"),
      bfdy_tot_asst_evlu_amt: z.string().describe("전일총자산평가금액"),
      asst_icdc_amt: z.string().describe("자산증감액"),
      asst_icdc_erng_rt: z.string().describe("자산증감수익률"),
    })).describe("계좌 요약 정보"),
  }), "주식잔고 조회 성공"),
});

// 매수가능조회
domesticTradingRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/trading/inquire-psbl-order",
  tags: ["국내주식 주문/계좌"],
  summary: "매수가능조회",
  description: "종목의 매수가능 수량과 금액을 조회합니다 (TR_ID: TTTC8908R)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      CANO: z.string().describe("종합계좌번호"),
      ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
      PDNO: z.string().describe("상품번호 (종목코드)"),
      ORD_UNPR: z.string().describe("주문단가"),
      ORD_DVSN: z.enum(["00", "01"]).describe("주문구분 (00:지정가, 01:시장가)"),
      CMA_EVLU_AMT_ICLD_YN: z.enum(["N", "Y"]).default("Y").describe("CMA평가금액포함여부"),
      OVRS_ICLD_YN: z.enum(["N", "Y"]).default("N").describe("해외포함여부"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("TTTC8908R").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    output: z.object({
      ord_psbl_cash: z.string().describe("주문가능현금"),
      ord_psbl_sbst: z.string().describe("주문가능대용"),
      ruse_psbl_amt: z.string().describe("재사용가능금액"),
      fund_rpch_chgs: z.string().describe("펀드환매수수료"),
      psbl_qty_calc_unpr: z.string().describe("가능수량계산단가"),
      nrcvb_buy_amt: z.string().describe("미수없는매수금액"),
      nrcvb_buy_qty: z.string().describe("미수없는매수수량"),
      max_buy_amt: z.string().describe("최대매수금액"),
      max_buy_qty: z.string().describe("최대매수수량"),
      cma_evlu_amt: z.string().describe("CMA평가금액"),
      ovrs_re_use_amt_wcrc: z.string().describe("해외재사용금액원화"),
      ord_psbl_frcr_amt: z.string().describe("주문가능외화금액"),
    }).describe("매수가능 정보"),
  }), "매수가능조회 성공"),
});

// 주문체결내역조회
domesticTradingRegistry.registerPath({
  method: "get",
  path: "/uapi/domestic-stock/v1/trading/inquire-daily-ccld",
  tags: ["국내주식 주문/계좌"],
  summary: "주식일별주문체결조회",
  description: "일별 주문체결 내역을 조회합니다 (TR_ID: TTTC0081R)",
  security: [{ bearerAuth: [] }],
  request: {
    query: z.object({
      CANO: z.string().describe("종합계좌번호"),
      ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
      INQR_STRT_DT: z.string().describe("조회시작일자 (YYYYMMDD)"),
      INQR_END_DT: z.string().describe("조회종료일자 (YYYYMMDD)"),
      SLL_BUY_DVSN_CD: z.enum(["00", "01", "02"]).default("00").describe("매도매수구분코드 (00:전체, 01:매도, 02:매수)"),
      INQR_DVSN: z.enum(["00", "01", "02"]).default("00").describe("조회구분 (00:역순, 01:정순)"),
      PDNO: z.string().optional().describe("상품번호 (종목코드, 전체조회시 공백)"),
      CCLD_DVSN: z.enum(["00", "01", "02"]).default("00").describe("체결구분 (00:전체, 01:체결, 02:미체결)"),
      ORD_GNO_BRNO: z.string().optional().describe("주문채번지점번호"),
      ODNO: z.string().optional().describe("주문번호"),
      INQR_DVSN_3: z.enum(["00", "01"]).default("00").describe("조회구분3 (00:전체, 01:현금, 02:융자, 03:대주)"),
      INQR_DVSN_1: z.enum(["", "1", "2"]).optional().describe("조회구분1"),
      CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
      CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
    }),
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
      tr_id: z.string().default("TTTC0081R").describe("거래ID"),
      custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
    }),
  },
  responses: createApiResponse(z.object({
    rt_cd: z.string().describe("성공 실패 여부"),
    msg_cd: z.string().describe("응답코드"),
    msg1: z.string().describe("응답메세지"),
    ctx_area_fk100: z.string().describe("연속조회검색조건100"),
    ctx_area_nk100: z.string().describe("연속조회키100"),
    output1: z.array(z.object({
      ord_dt: z.string().describe("주문일자"),
      ord_gno_brno: z.string().describe("주문채번지점번호"),
      odno: z.string().describe("주문번호"),
      orgn_odno: z.string().describe("원주문번호"),
      ord_dvsn_name: z.string().describe("주문구분명"),
      sll_buy_dvsn_cd: z.string().describe("매도매수구분코드"),
      sll_buy_dvsn_cd_name: z.string().describe("매도매수구분코드명"),
      pdno: z.string().describe("상품번호"),
      prdt_name: z.string().describe("상품명"),
      ord_qty: z.string().describe("주문수량"),
      ord_unpr: z.string().describe("주문단가"),
      ord_tmd: z.string().describe("주문시각"),
      tot_ccld_qty: z.string().describe("총체결수량"),
      avg_prvs: z.string().describe("평균가"),
      cncl_yn: z.string().describe("취소여부"),
      tot_ccld_amt: z.string().describe("총체결금액"),
      loan_dt: z.string().describe("대출일자"),
      ord_dvsn_cd: z.string().describe("주문구분코드"),
      cncl_cfrm_qty: z.string().describe("취소확인수량"),
      rmn_qty: z.string().describe("잔여수량"),
      rjct_qty: z.string().describe("거부수량"),
      ccld_cndt_name: z.string().describe("체결조건명"),
      infm_tmd: z.string().describe("통보시각"),
      ctac_tlno: z.string().describe("연락전화번호"),
      prdt_type_cd: z.string().describe("상품유형코드"),
      excg_dvsn_cd: z.string().describe("거래소구분코드"),
    })).describe("주문체결내역 목록"),
    output2: z.array(z.object({
      tot_ord_qty: z.string().describe("총주문수량"),
      tot_ccld_qty: z.string().describe("총체결수량"),
      tot_ccld_amt: z.string().describe("총체결금액"),
      prsm_tlex_smtl: z.string().describe("추정제비용합계"),
    })).describe("체결 요약"),
  }), "주문체결내역 조회 성공"),
});