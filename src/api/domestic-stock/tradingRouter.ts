// Extend Zod with OpenAPI
import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

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
						ORD_DVSN: z
							.enum(["00", "01", "02", "03", "04", "05", "06", "07"])
							.describe(
								"주문구분 (00:지정가, 01:시장가, 02:조건부지정가, 03:최유리지정가, 04:최우선지정가, 05:장전시간외, 06:장후시간외, 07:시간외단일가)",
							),
						ORD_QTY: z.string().describe("주문수량"),
						ORD_UNPR: z.string().describe("주문단가 (시장가의 경우 공백)"),
					}),
				},
			},
		},
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z
				.enum(["TTTC0012U", "TTTC0011U", "VTTC0012U", "VTTC0011U"])
				.describe("거래ID (실전: 매수-TTTC0012U/매도-TTTC0011U, 모의: 매수-VTTC0012U/매도-VTTC0011U)"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
			hashkey: z.string().describe("해시키 (/uapi/hashkey로 생성)"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			output: z
				.object({
					KRX_FWDG_ORD_ORGNO: z.string().describe("KRX 전송 주문 조직번호"),
					ODNO: z.string().describe("주문번호"),
					ORD_TMD: z.string().describe("주문시각"),
				})
				.describe("주문 결과"),
		}),
		"주식 주문 성공",
	),
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
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			output: z
				.object({
					KRX_FWDG_ORD_ORGNO: z.string().describe("KRX 전송 주문 조직번호"),
					ODNO: z.string().describe("주문번호"),
					ORD_TMD: z.string().describe("주문시각"),
				})
				.describe("정정취소 결과"),
		}),
		"주식 정정취소 성공",
	),
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
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			ctx_area_fk100: z.string().describe("연속조회검색조건100"),
			ctx_area_nk100: z.string().describe("연속조회키100"),
			output1: z
				.array(
					z.object({
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
					}),
				)
				.describe("보유종목 목록"),
			output2: z
				.array(
					z.object({
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
					}),
				)
				.describe("계좌 요약 정보"),
		}),
		"주식잔고 조회 성공",
	),
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
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			output: z
				.object({
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
				})
				.describe("매수가능 정보"),
		}),
		"매수가능조회 성공",
	),
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
			SLL_BUY_DVSN_CD: z
				.enum(["00", "01", "02"])
				.default("00")
				.describe("매도매수구분코드 (00:전체, 01:매도, 02:매수)"),
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
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			ctx_area_fk100: z.string().describe("연속조회검색조건100"),
			ctx_area_nk100: z.string().describe("연속조회키100"),
			output1: z
				.array(
					z.object({
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
					}),
				)
				.describe("주문체결내역 목록"),
			output2: z
				.array(
					z.object({
						tot_ord_qty: z.string().describe("총주문수량"),
						tot_ccld_qty: z.string().describe("총체결수량"),
						tot_ccld_amt: z.string().describe("총체결금액"),
						prsm_tlex_smtl: z.string().describe("추정제비용합계"),
					}),
				)
				.describe("체결 요약"),
		}),
		"주문체결내역 조회 성공",
	),
});

// 주식주문(신용)
domesticTradingRegistry.registerPath({
	method: "post",
	path: "/uapi/domestic-stock/v1/trading/order-credit",
	tags: ["국내주식 주문/계좌"],
	summary: "주식주문(신용)",
	description: `신용거래로 국내주식을 매수/매도 주문합니다

**TR_ID:**
- **실전**: 매수 TTTC0052U, 매도 TTTC0051U
- **모의**: 지원안함`,
	security: [{ bearerAuth: [] }],
	request: {
		body: {
			content: {
				"application/json": {
					schema: z.object({
						CANO: z.string().describe("종합계좌번호"),
						ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
						PDNO: z.string().describe("상품번호 (종목코드)"),
						ORD_DVSN: z.enum(["00", "01", "02", "03", "04", "05", "06", "07"]).describe("주문구분"),
						ORD_QTY: z.string().describe("주문수량"),
						ORD_UNPR: z.string().describe("주문단가"),
						CRDT_LOAN_CD: z.enum(["01", "02", "03"]).describe("신용대출코드 (01:자기융자, 02:유통융자, 03:담보대출)"),
						LEND_DVSN_CD: z.enum(["01", "02"]).describe("대출구분코드 (01:보통, 02:유동성)"),
						LOAN_DT: z.string().optional().describe("대출일자"),
					}),
				},
			},
		},
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.enum(["TTTC0051U", "TTTC0052U"]).describe("거래ID (매도-TTTC0051U, 매수-TTTC0052U)"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
			hashkey: z.string().describe("해시키"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			output: z
				.object({
					KRX_FWDG_ORD_ORGNO: z.string().describe("KRX 전송 주문 조직번호"),
					ODNO: z.string().describe("주문번호"),
					ORD_TMD: z.string().describe("주문시각"),
				})
				.describe("신용주문 결과"),
		}),
		"신용주식 주문 성공",
	),
});

// 주식잔고조회_실현손익
domesticTradingRegistry.registerPath({
	method: "get",
	path: "/uapi/domestic-stock/v1/trading/inquire-balance-rlz-pl",
	tags: ["국내주식 주문/계좌"],
	summary: "주식잔고조회_실현손익",
	description: "보유 주식의 실현손익 포함한 상세 잔고 정보를 조회합니다 (TR_ID: TTTC8494R)",
	security: [{ bearerAuth: [] }],
	request: {
		query: z.object({
			CANO: z.string().describe("종합계좌번호"),
			ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
			AFHR_FLPR_YN: z.enum(["N", "Y"]).default("N").describe("시간외단일가여부"),
			OFL_YN: z.enum(["N", "Y"]).default("N").describe("오프라인여부"),
			INQR_DVSN: z.enum(["01", "02"]).default("02").describe("조회구분"),
			UNPR_DVSN: z.enum(["01", "02"]).default("01").describe("단가구분"),
			FUND_STTL_ICLD_YN: z.enum(["N", "Y"]).default("N").describe("펀드결제분포함여부"),
			FNCG_AMT_AUTO_RDPT_YN: z.enum(["N", "Y"]).default("N").describe("융자금액자동상환여부"),
			PRCS_DVSN: z.enum(["00", "01"]).default("00").describe("처리구분"),
			CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
			CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
		}),
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.string().default("TTTC8494R").describe("거래ID"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			ctx_area_fk100: z.string().describe("연속조회검색조건100"),
			ctx_area_nk100: z.string().describe("연속조회키100"),
			output1: z
				.array(
					z.object({
						pdno: z.string().describe("상품번호"),
						prdt_name: z.string().describe("상품명"),
						hldg_qty: z.string().describe("보유수량"),
						ord_psbl_qty: z.string().describe("주문가능수량"),
						pchs_avg_pric: z.string().describe("매입평균가격"),
						pchs_amt: z.string().describe("매입금액"),
						prpr: z.string().describe("현재가"),
						evlu_amt: z.string().describe("평가금액"),
						evlu_pfls_amt: z.string().describe("평가손익금액"),
						evlu_pfls_rt: z.string().describe("평가손익율"),
						fltt_rt: z.string().describe("등락율"),
						rltr_pf_rg_ct: z.string().describe("실현손익등록건수"),
						rltr_pf_sum_amt: z.string().describe("실현손익합계금액"),
						rltr_pf_avg_trat: z.string().describe("실현손익평균수익율"),
					}),
				)
				.describe("실현손익 포함 보유종목 목록"),
			output2: z
				.array(
					z.object({
						dnca_tot_amt: z.string().describe("예수금총금액"),
						nass_amt: z.string().describe("순자산금액"),
						pchs_amt_smtl_amt: z.string().describe("매입금액합계금액"),
						evlu_amt_smtl_amt: z.string().describe("평가금액합계금액"),
						evlu_pfls_smtl_amt: z.string().describe("평가손익합계금액"),
						rltr_pf_tot_sum_amt: z.string().describe("실현손익총합계금액"),
						bfdy_tot_asst_evlu_amt: z.string().describe("전일총자산평가금액"),
						asst_icdc_amt: z.string().describe("자산증감액"),
						asst_icdc_erng_rt: z.string().describe("자산증감수익률"),
					}),
				)
				.describe("실현손익 포함 계좌 요약 정보"),
		}),
		"실현손익 포함 주식잔고 조회 성공",
	),
});

// 매도가능수량조회
domesticTradingRegistry.registerPath({
	method: "get",
	path: "/uapi/domestic-stock/v1/trading/inquire-psbl-sell",
	tags: ["국내주식 주문/계좌"],
	summary: "매도가능수량조회",
	description: "보유 종목의 매도가능 수량을 조회합니다 (TR_ID: TTTC8408R)",
	security: [{ bearerAuth: [] }],
	request: {
		query: z.object({
			CANO: z.string().describe("종합계좌번호"),
			ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
			PDNO: z.string().describe("상품번호 (종목코드)"),
			AFHR_FLPR_YN: z.enum(["N", "Y"]).default("N").describe("시간외단일가여부"),
		}),
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.string().default("TTTC8408R").describe("거래ID"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			output: z
				.object({
					ord_psbl_qty: z.string().describe("주문가능수량"),
					ord_psbl_qty_smtl: z.string().describe("주문가능수량 합계"),
					lgn_ord_qty: z.string().describe("대출주문수량"),
					redc_ord_qty: z.string().describe("상환주문수량"),
					max_ord_psbl_qty: z.string().describe("최대주문가능수량"),
				})
				.describe("매도가능수량 정보"),
		}),
		"매도가능수량 조회 성공",
	),
});

// 신용매수가능조회
domesticTradingRegistry.registerPath({
	method: "get",
	path: "/uapi/domestic-stock/v1/trading/inquire-credit-psamount",
	tags: ["국내주식 주문/계좌"],
	summary: "신용매수가능조회",
	description: "신용거래로 매수 가능한 금액과 수량을 조회합니다 (TR_ID: TTTC8909R)",
	security: [{ bearerAuth: [] }],
	request: {
		query: z.object({
			CANO: z.string().describe("종합계좌번호"),
			ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
			PDNO: z.string().describe("상품번호 (종목코드)"),
			ORD_UNPR: z.string().describe("주문단가"),
			ORD_DVSN: z.enum(["00", "01"]).describe("주문구분"),
			CMA_EVLU_AMT_ICLD_YN: z.enum(["N", "Y"]).default("Y").describe("CMA평가금액포함여부"),
		}),
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.string().default("TTTC8909R").describe("거래ID"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			output: z
				.object({
					max_buy_amt: z.string().describe("최대매수금액"),
					max_buy_qty: z.string().describe("최대매수수량"),
					nrcvb_buy_amt: z.string().describe("미수없는매수금액"),
					nrcvb_buy_qty: z.string().describe("미수없는매수수량"),
					ord_psbl_cash: z.string().describe("주문가능현금"),
					ord_psbl_sbst: z.string().describe("주문가능대용"),
					ruse_psbl_amt: z.string().describe("재사용가능금액"),
					crdt_buy_psbl_amt: z.string().describe("신용매수가능금액"),
					crdt_max_buy_qty: z.string().describe("신용최대매수수량"),
				})
				.describe("신용매수가능 정보"),
		}),
		"신용매수가능조회 성공",
	),
});

// 주식정정취소가능주문조회
domesticTradingRegistry.registerPath({
	method: "get",
	path: "/uapi/domestic-stock/v1/trading/inquire-psbl-rvsecncl",
	tags: ["국내주식 주문/계좌"],
	summary: "주식정정취소가능주문조회",
	description: "정정취소가 가능한 미체결 주문을 조회합니다 (TR_ID: TTTC0084R)",
	security: [{ bearerAuth: [] }],
	request: {
		query: z.object({
			CANO: z.string().describe("종합계좌번호"),
			ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
			CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
			CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
		}),
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.string().default("TTTC0084R").describe("거래ID"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			ctx_area_fk100: z.string().describe("연속조회검색조건100"),
			ctx_area_nk100: z.string().describe("연속조회키100"),
			output: z
				.array(
					z.object({
						ord_dt: z.string().describe("주문일자"),
						ord_gno_brno: z.string().describe("주문채번지점번호"),
						odno: z.string().describe("주문번호"),
						orgn_odno: z.string().describe("원주문번호"),
						pdno: z.string().describe("상품번호"),
						prdt_name: z.string().describe("상품명"),
						sll_buy_dvsn_cd: z.string().describe("매도매수구분코드"),
						sll_buy_dvsn_cd_name: z.string().describe("매도매수구분코드명"),
						ord_qty: z.string().describe("주문수량"),
						ord_unpr: z.string().describe("주문단가"),
						ord_tmd: z.string().describe("주문시각"),
						psbl_qty: z.string().describe("정정취소가능수량"),
						cncl_cfrm_qty: z.string().describe("취소확인수량"),
						rmn_qty: z.string().describe("잔여수량"),
					}),
				)
				.describe("정정취소가능주문 목록"),
		}),
		"정정취소가능주문 조회 성공",
	),
});

// 주식예약주문
domesticTradingRegistry.registerPath({
	method: "post",
	path: "/uapi/domestic-stock/v1/trading/order-resv",
	tags: ["국내주식 주문/계좌"],
	summary: "주식예약주문",
	description: "주식의 예약주문을 등록합니다 (TR_ID: CTSC0008U)",
	security: [{ bearerAuth: [] }],
	request: {
		body: {
			content: {
				"application/json": {
					schema: z.object({
						CANO: z.string().describe("종합계좌번호"),
						ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
						PDNO: z.string().describe("상품번호 (종목코드)"),
						SLL_TYPE: z
							.enum(["01", "02", "05"])
							.optional()
							.describe("매도유형 (01:일반매도, 02:임의매매, 05:대차매도)"),
						ORD_DVSN: z.enum(["00", "01", "02", "03", "04", "05", "06", "07"]).describe("주문구분"),
						ORD_QTY: z.string().describe("주문수량"),
						ORD_UNPR: z.string().describe("주문단가"),
						RSVN_ORD_YN: z.enum(["Y", "N"]).default("Y").describe("예약주문여부"),
						RSVN_ORD_DT: z.string().describe("예약주문일자 (YYYYMMDD)"),
						RSVN_ORD_START_TM: z.string().describe("예약주문시작시간 (HHMMSS)"),
						RSVN_ORD_END_TM: z.string().describe("예약주문종료시간 (HHMMSS)"),
						EXCG_ID_DVSN_CD: z.enum(["KRX", "NXT", "SOR"]).optional().describe("거래소 ID구분코드"),
					}),
				},
			},
		},
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.string().default("CTSC0008U").describe("거래ID"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
			hashkey: z.string().describe("해시키"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			output: z
				.object({
					RSVN_ORD_RCV_NO: z.string().describe("예약주문접수번호"),
				})
				.describe("예약주문 결과"),
		}),
		"주식 예약주문 성공",
	),
});

// 주식예약주문조회
domesticTradingRegistry.registerPath({
	method: "get",
	path: "/uapi/domestic-stock/v1/trading/order-resv-ccnl",
	tags: ["국내주식 주문/계좌"],
	summary: "주식예약주문조회",
	description: "등록된 예약주문 내역을 조회합니다 (TR_ID: CTSC0004R)",
	security: [{ bearerAuth: [] }],
	request: {
		query: z.object({
			CANO: z.string().describe("종합계좌번호"),
			ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
			INQR_STRT_DT: z.string().describe("조회시작일자 (YYYYMMDD)"),
			INQR_END_DT: z.string().describe("조회종료일자 (YYYYMMDD)"),
			SLL_BUY_DVSN_CD: z.enum(["00", "01", "02"]).default("00").describe("매도매수구분코드"),
			RSVN_ORD_STAT_CD: z.enum(["00", "01", "02", "03"]).default("00").describe("예약주문상태코드"),
			CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
			CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
		}),
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.string().default("CTSC0004R").describe("거래ID"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			ctx_area_fk100: z.string().describe("연속조회검색조건100"),
			ctx_area_nk100: z.string().describe("연속조회키100"),
			output: z
				.array(
					z.object({
						rsvn_ord_dt: z.string().describe("예약주문일자"),
						rsvn_ord_rcv_no: z.string().describe("예약주문접수번호"),
						pdno: z.string().describe("상품번호"),
						prdt_name: z.string().describe("상품명"),
						sll_buy_dvsn_cd: z.string().describe("매도매수구분코드"),
						sll_buy_dvsn_cd_name: z.string().describe("매도매수구분코드명"),
						rsvn_ord_qty: z.string().describe("예약주문수량"),
						rsvn_ord_unpr: z.string().describe("예약주문단가"),
						ord_dvsn_name: z.string().describe("주문구분명"),
						rsvn_ord_stat_cd: z.string().describe("예약주문상태코드"),
						rsvn_ord_stat_name: z.string().describe("예약주문상태명"),
						rsvn_ord_start_tm: z.string().describe("예약주문시작시간"),
						rsvn_ord_end_tm: z.string().describe("예약주문종료시간"),
						exec_rslt_cd: z.string().describe("실행결과코드"),
						exec_rslt_name: z.string().describe("실행결과명"),
					}),
				)
				.describe("예약주문 목록"),
		}),
		"예약주문 조회 성공",
	),
});

// 주식예약주문정정취소
domesticTradingRegistry.registerPath({
	method: "post",
	path: "/uapi/domestic-stock/v1/trading/order-resv-rvsecncl",
	tags: ["국내주식 주문/계좌"],
	summary: "주식예약주문정정취소",
	description: "등록된 예약주문을 정정하거나 취소합니다",
	security: [{ bearerAuth: [] }],
	request: {
		body: {
			content: {
				"application/json": {
					schema: z.object({
						CANO: z.string().describe("종합계좌번호"),
						ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
						RSVN_ORD_RCV_NO: z.string().describe("예약주문접수번호"),
						RVSE_CNCL_DVSN_CD: z.enum(["01", "02"]).describe("정정취소구분코드 (01:정정, 02:취소)"),
						ORD_QTY: z.string().optional().describe("주문수량 (정정시 필요)"),
						ORD_UNPR: z.string().optional().describe("주문단가 (정정시 필요)"),
						RSVN_ORD_START_TM: z.string().optional().describe("예약주문시작시간 (정정시 필요)"),
						RSVN_ORD_END_TM: z.string().optional().describe("예약주문종료시간 (정정시 필요)"),
					}),
				},
			},
		},
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.enum(["CTSC0009U", "CTSC0013U"]).describe("거래ID (취소-CTSC0009U, 정정-CTSC0013U)"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
			hashkey: z.string().describe("해시키"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			output: z
				.object({
					KRX_FWDG_ORD_ORGNO: z.string().describe("KRX 전송 주문 조직번호"),
					ODNO: z.string().describe("주문번호"),
					ORD_TMD: z.string().describe("주문시각"),
				})
				.describe("예약주문 정정취소 결과"),
		}),
		"예약주문 정정취소 성공",
	),
});

// 주식통합증거금 현황
domesticTradingRegistry.registerPath({
	method: "get",
	path: "/uapi/domestic-stock/v1/trading/intgr-margin",
	tags: ["국내주식 주문/계좌"],
	summary: "주식통합증거금 현황",
	description: "주식통합증거금 상태를 조회합니다 (TR_ID: TTTC0869R)",
	security: [{ bearerAuth: [] }],
	request: {
		query: z.object({
			CANO: z.string().describe("종합계좌번호"),
			ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
		}),
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.string().default("TTTC0869R").describe("거래ID"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			output: z
				.array(
					z.object({
						stac_month: z.string().describe("정산월"),
						max_buy_amt: z.string().describe("최대매수금액"),
						max_buy_qty: z.string().describe("최대매수수량"),
						nrcvb_buy_amt: z.string().describe("미수없는매수금액"),
						nrcvb_buy_qty: z.string().describe("미수없는매수수량"),
						mgn_rt: z.string().describe("증거금비율"),
						ord_psbl_amt: z.string().describe("주문가능금액"),
						mrgn_amt: z.string().describe("증거금금액"),
						mgn_rat_dvsn_name: z.string().describe("증거금비율구분명"),
						excg_dvsn_cd_name: z.string().describe("거래소구분코드명"),
					}),
				)
				.describe("증거금 현황 목록"),
		}),
		"주식통합증거금 현황 조회 성공",
	),
});

// 거래계좌자산현황조회
domesticTradingRegistry.registerPath({
	method: "get",
	path: "/uapi/domestic-stock/v1/trading/inquire-account-balance",
	tags: ["국내주식 주문/계좌"],
	summary: "투자계좌자산현황조회",
	description: "계좌의 전체 자산 현황을 조회합니다 (TR_ID: CTRP6548R)",
	security: [{ bearerAuth: [] }],
	request: {
		query: z.object({
			CANO: z.string().describe("종합계좌번호"),
			ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
			AFHR_FLPR_YN: z.enum(["N", "Y"]).default("N").describe("시간외단일가여부"),
			OFL_YN: z.enum(["N", "Y"]).default("N").describe("오프라인여부"),
			INQR_DVSN: z.enum(["01", "02"]).default("02").describe("조회구분"),
			UNPR_DVSN: z.enum(["01", "02"]).default("01").describe("단가구분"),
			FUND_STTL_ICLD_YN: z.enum(["N", "Y"]).default("N").describe("펀드결제분포함여부"),
			FNCG_AMT_AUTO_RDPT_YN: z.enum(["N", "Y"]).default("N").describe("융자금액자동상환여부"),
			PRCS_DVSN: z.enum(["00", "01"]).default("00").describe("처리구분"),
			CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
			CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
		}),
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.string().default("CTRP6548R").describe("거래ID"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			ctx_area_fk100: z.string().describe("연속조회검색조건100"),
			ctx_area_nk100: z.string().describe("연속조회키100"),
			output1: z
				.array(
					z.object({
						pdno: z.string().describe("상품번호"),
						prdt_name: z.string().describe("상품명"),
						trad_dvsn_name: z.string().describe("매매구분명"),
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
						evlu_erng_rt: z.string().describe("평가수익률"),
						loan_dt: z.string().describe("대출일자"),
						loan_amt: z.string().describe("대출금액"),
					}),
				)
				.describe("자산 상세 내역"),
			output2: z
				.array(
					z.object({
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
						bfdy_tot_asst_evlu_amt: z.string().describe("전일총자산평가금액"),
						asst_icdc_amt: z.string().describe("자산증감액"),
						asst_icdc_erng_rt: z.string().describe("자산증감수익률"),
					}),
				)
				.describe("계좌 자산 요약 정보"),
		}),
		"투자계좌자산현황 조회 성공",
	),
});

// 기간별매매손익현황조회
domesticTradingRegistry.registerPath({
	method: "get",
	path: "/uapi/domestic-stock/v1/trading/inquire-period-trade-profit",
	tags: ["국내주식 주문/계좌"],
	summary: "기간별매매손익현황조회",
	description: "지정한 기간내 매매 손익 현황을 조회합니다 (TR_ID: TTTC8715R)",
	security: [{ bearerAuth: [] }],
	request: {
		query: z.object({
			CANO: z.string().describe("종합계좌번호"),
			ACNT_PRDT_CD: z.string().describe("계좌상품코드"),
			INQR_STRT_DT: z.string().describe("조회시작일자 (YYYYMMDD)"),
			INQR_END_DT: z.string().describe("조회종료일자 (YYYYMMDD)"),
			AFHR_FLPR_YN: z.enum(["N", "Y"]).default("N").describe("시간외단일가여부"),
			OFL_YN: z.enum(["N", "Y"]).default("N").describe("오프라인여부"),
			INQR_DVSN: z.enum(["00", "01"]).default("00").describe("조회구분 (00:전체, 01:종목별)"),
			PDNO: z.string().optional().describe("상품번호 (종목별 조회시 필요)"),
			CCLD_DVSN: z.enum(["00", "01", "02"]).default("00").describe("체결구분 (00:전체, 01:체결, 02:미체결)"),
			INQR_DVSN_1: z.enum(["00", "01"]).default("00").describe("조회구분1 (00:전체, 01:현금)"),
			CTX_AREA_FK100: z.string().optional().describe("연속조회검색조건100"),
			CTX_AREA_NK100: z.string().optional().describe("연속조회키100"),
		}),
		headers: z.object({
			appkey: z.string().describe("앱키"),
			appsecret: z.string().describe("앱시크릿"),
			tr_id: z.string().default("TTTC8715R").describe("거래ID"),
			custtype: z.enum(["P", "B"]).default("P").describe("고객타입"),
		}),
	},
	responses: createApiResponse(
		z.object({
			rt_cd: z.string().describe("성공 실패 여부"),
			msg_cd: z.string().describe("응답코드"),
			msg1: z.string().describe("응답메세지"),
			ctx_area_fk100: z.string().describe("연속조회검색조건100"),
			ctx_area_nk100: z.string().describe("연속조회키100"),
			output1: z
				.array(
					z.object({
						ord_dt: z.string().describe("주문일자"),
						pdno: z.string().describe("상품번호"),
						prdt_name: z.string().describe("상품명"),
						sll_buy_dvsn_cd: z.string().describe("매도매수구분코드"),
						sll_buy_dvsn_cd_name: z.string().describe("매도매수구분코드명"),
						qty: z.string().describe("수량"),
						unpr: z.string().describe("단가"),
						tr_amt: z.string().describe("거래금액"),
						stl_amt: z.string().describe("정산금액"),
						tr_crcy_cd: z.string().describe("거래통화코드"),
						loan_dt: z.string().describe("대출일자"),
						loan_amt: z.string().describe("대출금액"),
						tr_mdia_dvsn_cd: z.string().describe("거래매체구분코드"),
						tr_mdia_dvsn_cd_name: z.string().describe("거래매체구분코드명"),
					}),
				)
				.describe("기간별 매매손익 내역"),
			output2: z
				.array(
					z.object({
						buy_tr_tot_qty: z.string().describe("매수거래총수량"),
						buy_tr_tot_amt: z.string().describe("매수거래총금액"),
						sll_tr_tot_qty: z.string().describe("매도거래총수량"),
						sll_tr_tot_amt: z.string().describe("매도거래총금액"),
						rlzt_pfls: z.string().describe("실현손익"),
						rlzt_pfls_rt: z.string().describe("실현손익율"),
					}),
				)
				.describe("기간 손익 요약"),
		}),
		"기간별 매매손익현황 조회 성공",
	),
});
