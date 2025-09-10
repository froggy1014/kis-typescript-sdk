import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router, type Request, type Response } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

// 선물옵션 시세조회
const FuturesOptionsQuoteRequestSchema = z.object({
	FID_COND_MRKT_DIV_CODE: z.string().openapi({ example: "F" }).describe("FID 조건 시장 분류 코드 (F:지수선물, O:지수옵션, JF:주식선물, JO:주식옵션, CF:상품선물/금리선물/통화선물, CM:야간선물, EU:야간옵션)"),
	FID_INPUT_ISCD: z.string().openapi({ example: "101S12000" }).describe("FID 입력 종목코드"),
});

const FuturesOptionsQuoteResponseSchema = z.object({
	MKSC_SHRN_ISCD: z.string().openapi({ example: "101S12000" }).describe("유가증권 단축 종목코드"),
	STND_ISCD: z.string().openapi({ example: "KR4101S12006" }).describe("표준종목코드"),
	HTS_KOR_ISNM: z.string().openapi({ example: "KOSPI200 F 202412" }).describe("HTS 한글 종목명"),
	PRPR: z.string().openapi({ example: "313.50" }).describe("현재가"),
	PRDY_VRSS: z.string().openapi({ example: "2.15" }).describe("전일 대비"),
	PRDY_VRSS_SIGN: z.string().openapi({ example: "2" }).describe("전일 대비 부호"),
	PRDY_CTRT: z.string().openapi({ example: "0.69" }).describe("전일 대비율"),
	ACML_VOL: z.string().openapi({ example: "159234" }).describe("누적 거래량"),
	ACML_TR_PBMN: z.string().openapi({ example: "52738510000" }).describe("누적 거래 대금"),
	OPRC: z.string().openapi({ example: "311.35" }).describe("시가"),
	HGPR: z.string().openapi({ example: "314.25" }).describe("최고가"),
	LWPR: z.string().openapi({ example: "310.80" }).describe("최저가"),
	ASKP1: z.string().openapi({ example: "313.55" }).describe("매도호가1"),
	BIDP1: z.string().openapi({ example: "313.45" }).describe("매수호가1"),
	PRDY_VOL: z.string().openapi({ example: "148672" }).describe("전일 거래량"),
	ASKP_RSQN1: z.string().openapi({ example: "25" }).describe("매도호가 잔량1"),
	BIDP_RSQN1: z.string().openapi({ example: "18" }).describe("매수호가 잔량1"),
	TOTAL_ASKP_RSQN: z.string().openapi({ example: "452" }).describe("총 매도호가 잔량"),
	TOTAL_BIDP_RSQN: z.string().openapi({ example: "378" }).describe("총 매수호가 잔량"),
});

// 선물옵션 매수주문
const FuturesOptionsBuyRequestSchema = z.object({
	CANO: z.string().openapi({ example: "50067049" }).describe("종합계좌번호"),
	ACNT_PRDT_CD: z.string().openapi({ example: "01" }).describe("계좌상품코드"),
	PDNO: z.string().openapi({ example: "101S12000" }).describe("상품번호"),
	ORD_QTY: z.string().openapi({ example: "5" }).describe("주문수량"),
	ORD_UNPR: z.string().openapi({ example: "313.50" }).describe("주문단가"),
	ORD_DVSN: z.string().openapi({ example: "00" }).describe("주문구분 (00:지정가, 01:시장가)"),
	CTAC_TLNO: z.string().openapi({ example: "01012345678" }).describe("연락전화번호"),
});

const FuturesOptionsBuyResponseSchema = z.object({
	KRX_FWDG_ORD_ORGNO: z.string().openapi({ example: "91230" }).describe("KRX 전송 주문 조직번호"),
	ODNO: z.string().openapi({ example: "0000234567" }).describe("주문번호"),
	ORD_TMD: z.string().openapi({ example: "143527" }).describe("주문시각"),
});

// 선물옵션 잔고조회
const FuturesOptionsBalanceRequestSchema = z.object({
	CANO: z.string().openapi({ example: "50067049" }).describe("종합계좌번호"),
	ACNT_PRDT_CD: z.string().openapi({ example: "01" }).describe("계좌상품코드"),
	CTX_AREA_FK200: z.string().openapi({ example: "" }).describe("연속조회검색조건200"),
	CTX_AREA_NK200: z.string().openapi({ example: "" }).describe("연속조회키200"),
});

const FuturesOptionsBalanceItemSchema = z.object({
	pdno: z.string().openapi({ example: "101S12000" }).describe("상품번호"),
	prdt_name: z.string().openapi({ example: "KOSPI200 F 202412" }).describe("상품명"),
	trad_dvsn_name: z.string().openapi({ example: "매수" }).describe("매매구분명"),
	bfdy_buy_qty: z.string().openapi({ example: "0" }).describe("전일매수수량"),
	bfdy_sll_qty: z.string().openapi({ example: "0" }).describe("전일매도수량"),
	thdt_buyqty: z.string().openapi({ example: "5" }).describe("금일매수수량"),
	thdt_sll_qty: z.string().openapi({ example: "0" }).describe("금일매도수량"),
	hldg_qty: z.string().openapi({ example: "5" }).describe("보유수량"),
	ord_psbl_qty: z.string().openapi({ example: "5" }).describe("주문가능수량"),
	pchs_avg_prc: z.string().openapi({ example: "311.20" }).describe("매입평균가격"),
	pchs_amt: z.string().openapi({ example: "77800000" }).describe("매입금액"),
	prpr: z.string().openapi({ example: "313.50" }).describe("현재가"),
	evlu_amt: z.string().openapi({ example: "78375000" }).describe("평가금액"),
	evlu_pfls_amt: z.string().openapi({ example: "575000" }).describe("평가손익금액"),
	evlu_pfls_rt: z.string().openapi({ example: "0.74" }).describe("평가손익율"),
});

const FuturesOptionsBalanceResponseSchema = z.object({
	CTX_AREA_FK200: z.string().openapi({ example: "" }).describe("연속조회검색조건200"),
	CTX_AREA_NK200: z.string().openapi({ example: "" }).describe("연속조회키200"),
	output1: z.array(FuturesOptionsBalanceItemSchema).describe("잔고목록"),
});

export const futuresOptionsRegistry = new OpenAPIRegistry();

futuresOptionsRegistry.register("FuturesOptionsQuoteRequest", FuturesOptionsQuoteRequestSchema);
futuresOptionsRegistry.register("FuturesOptionsQuoteResponse", FuturesOptionsQuoteResponseSchema);
futuresOptionsRegistry.register("FuturesOptionsBuyRequest", FuturesOptionsBuyRequestSchema);
futuresOptionsRegistry.register("FuturesOptionsBuyResponse", FuturesOptionsBuyResponseSchema);
futuresOptionsRegistry.register("FuturesOptionsBalanceRequest", FuturesOptionsBalanceRequestSchema);
futuresOptionsRegistry.register("FuturesOptionsBalanceResponse", FuturesOptionsBalanceResponseSchema);

export const futuresOptionsRouter: Router = (() => {
	const router = express.Router();
	
	// 선물옵션 시세조회
	router.get("/uapi/domestic-futureoption/v1/quotations/inquire-price", async (_req: Request, res: Response) => {
		res.status(200).json({
			MKSC_SHRN_ISCD: "101S12000",
			STND_ISCD: "KR4101S12006",
			HTS_KOR_ISNM: "KOSPI200 F 202412",
			PRPR: "313.50",
			PRDY_VRSS: "2.15",
			PRDY_VRSS_SIGN: "2",
			PRDY_CTRT: "0.69",
			ACML_VOL: "159234",
			ACML_TR_PBMN: "52738510000",
			OPRC: "311.35",
			HGPR: "314.25",
			LWPR: "310.80",
			ASKP1: "313.55",
			BIDP1: "313.45",
			PRDY_VOL: "148672",
			ASKP_RSQN1: "25",
			BIDP_RSQN1: "18",
			TOTAL_ASKP_RSQN: "452",
			TOTAL_BIDP_RSQN: "378"
		});
	});

	// 선물옵션 매수주문
	router.post("/uapi/domestic-futureoption/v1/trading/order-buy", async (_req: Request, res: Response) => {
		res.status(200).json({
			KRX_FWDG_ORD_ORGNO: "91230",
			ODNO: "0000234567",
			ORD_TMD: "143527"
		});
	});

	// 선물옵션 잔고조회
	router.get("/uapi/domestic-futureoption/v1/trading/inquire-balance", async (_req: Request, res: Response) => {
		res.status(200).json({
			CTX_AREA_FK200: "",
			CTX_AREA_NK200: "",
			output1: [
				{
					pdno: "101S12000",
					prdt_name: "KOSPI200 F 202412",
					trad_dvsn_name: "매수",
					bfdy_buy_qty: "0",
					bfdy_sll_qty: "0", 
					thdt_buyqty: "5",
					thdt_sll_qty: "0",
					hldg_qty: "5",
					ord_psbl_qty: "5",
					pchs_avg_prc: "311.20",
					pchs_amt: "77800000",
					prpr: "313.50",
					evlu_amt: "78375000",
					evlu_pfls_amt: "575000",
					evlu_pfls_rt: "0.74"
				}
			]
		});
	});

	return router;
})();