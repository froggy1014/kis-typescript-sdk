import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

// 장내채권 기본조회
const BondBasicInfoRequestSchema = z.object({
	PDNO: z.string().openapi({ example: "KR103502GA34" }).describe("상품번호 (채권코드)"),
	PRDT_TYPE_CD: z.string().openapi({ example: "302" }).describe("상품유형코드 (302: 채권)"),
});

const BondBasicInfoResponseSchema = z.object({
	pdno: z.string().openapi({ example: "KR2033022D33" }).describe("상품번호"),
	prdt_type_cd: z.string().openapi({ example: "302" }).describe("상품유형코드"),
	ksd_bond_item_name: z.string().openapi({ example: "충북지역개발채권 23-03" }).describe("증권예탁결제원채권종목명"),
	ksd_bond_item_eng_name: z.string().openapi({ example: "CHUNGBUK PROVINCIAL DEVELOPMENT 23-03" }).describe("증권예탁결제원채권종목영문명"),
	ksd_bond_lstg_type_cd: z.string().openapi({ example: "11" }).describe("증권예탁결제원채권상장유형코드"),
	ksd_ofrg_dvsn_cd: z.string().openapi({ example: "11" }).describe("증권예탁결제원모집구분코드"),
	ksd_bond_int_dfrm_dvsn_cd: z.string().openapi({ example: "3" }).describe("증권예탁결제원채권이자지급구분"),
	issu_dt: z.string().openapi({ example: "20230331" }).describe("발행일자"),
	rdpt_dt: z.string().openapi({ example: "20280331" }).describe("상환일자"),
	rvnu_dt: z.string().openapi({ example: "20230302" }).describe("매출일자"),
	iso_crcy_cd: z.string().openapi({ example: "KRW" }).describe("통화코드"),
	mdwy_rdpt_dt: z.string().openapi({ example: "00000000" }).describe("중도상환일자"),
	ksd_rcvg_bond_dsct_rt: z.string().openapi({ example: "0.000000000000" }).describe("증권예탁결제원수신채권할인율"),
	ksd_rcvg_bond_srfc_inrt: z.string().openapi({ example: "2.500000000000" }).describe("증권예탁결제원수신채권표면이율"),
	bond_expd_rdpt_rt: z.string().openapi({ example: "100.000000000000" }).describe("채권만기상환율"),
	ksd_prca_rdpt_mthd_cd: z.string().openapi({ example: "11" }).describe("증권예탁결제원원금상환방법코드"),
	int_caltm_mcnt: z.string().openapi({ example: "12" }).describe("이자계산기간개월수"),
	ksd_int_calc_unit_cd: z.string().openapi({ example: "1" }).describe("증권예탁결제원이자계산단위코드"),
	uval_cut_dvsn_cd: z.string().openapi({ example: "2" }).describe("절상절사구분코드"),
	uval_cut_dcpt_dgit: z.string().openapi({ example: "0" }).describe("절상절사소수점자릿수"),
	ksd_dydv_caltm_aply_dvsn_cd: z.string().openapi({ example: "1" }).describe("증권예탁결제원일할계산기간적용"),
	dydv_calc_dcnt: z.string().openapi({ example: "0" }).describe("일할계산일수"),
	bond_expd_asrc_erng_rt: z.string().openapi({ example: "0.000000000000" }).describe("채권만기보장수익율"),
	padf_plac_hdof_name: z.string().openapi({ example: "농협은행" }).describe("원리금지급장소본점명"),
	lstg_dt: z.string().openapi({ example: "20230302" }).describe("상장일자"),
	lstg_abol_dt: z.string().openapi({ example: "20280401" }).describe("상장폐지일자"),
	ksd_bond_issu_mthd_cd: z.string().openapi({ example: "2" }).describe("증권예탁결제원채권발행방법코드"),
	laps_indf_yn: z.string().openapi({ example: "Y" }).describe("경과이자지급여부"),
	ksd_lhdy_pnia_dfrm_mthd_cd: z.string().openapi({ example: "2" }).describe("증권예탁결제원공휴일원리금지급"),
	frst_int_dfrm_dt: z.string().openapi({ example: "00000000" }).describe("최초이자지급일자"),
	ksd_prcm_lnkg_gvbd_yn: z.string().openapi({ example: "N" }).describe("증권예탁결제원물가연동국고채여"),
	dpsi_end_dt: z.string().openapi({ example: "20280401" }).describe("예탁종료일자"),
	dpsi_strt_dt: z.string().openapi({ example: "20230302" }).describe("예탁시작일자"),
	dpsi_psbl_yn: z.string().openapi({ example: "Y" }).describe("예탁가능여부"),
	atyp_rdpt_bond_erlm_yn: z.string().openapi({ example: "N" }).describe("비정형상환채권등록여부"),
	dshn_occr_yn: z.string().openapi({ example: "N" }).describe("부도발생여부"),
	expd_exts_yn: z.string().openapi({ example: "N" }).describe("만기연장여부"),
	pclr_ptcr_text: z.string().openapi({ example: "" }).describe("특이사항내용"),
	bond_int_dfrm_mthd_cd: z.string().openapi({ example: "02" }).describe("채권이자지급방법코드"),
	int_dfrm_day_type_cd: z.string().openapi({ example: "02" }).describe("이자지급일유형코드"),
	prca_dfmt_term_mcnt: z.string().openapi({ example: "0" }).describe("원금거치기간개월수"),
	splt_rdpt_rcnt: z.string().openapi({ example: "0" }).describe("분할상환횟수"),
	rgbf_int_dfrm_dt: z.string().openapi({ example: "" }).describe("직전이자지급일자"),
	nxtm_int_dfrm_dt: z.string().openapi({ example: "20280331" }).describe("차기이자지급일자"),
	sprx_psbl_yn: z.string().openapi({ example: "N" }).describe("분리과세가능여부"),
	ictx_rt_dvsn_cd: z.string().openapi({ example: "" }).describe("소득세율구분코드"),
	bond_clsf_cd: z.string().openapi({ example: "112555" }).describe("채권분류코드"),
	bond_clsf_kor_name: z.string().openapi({ example: "충북지역개발채권" }).describe("채권분류한글명"),
	int_mned_dvsn_cd: z.string().openapi({ example: "2" }).describe("이자월말구분코드"),
	pnia_int_calc_unpr: z.string().openapi({ example: "0.0000" }).describe("원리금이자계산단가"),
	frn_intr: z.string().openapi({ example: "0.000000000000" }).describe("FRN금리"),
	aply_day_prcm_idx_lnkg_cefc: z.string().openapi({ example: "0.0000000000" }).describe("적용일물가지수연동계수"),
	ksd_expd_dydv_calc_bass_cd: z.string().openapi({ example: "" }).describe("증권예탁결제원만기일할계산기준"),
	expd_dydv_calc_dcnt: z.string().openapi({ example: "0" }).describe("만기일할계산일수"),
	ksd_cbbw_dvsn_cd: z.string().openapi({ example: "9" }).describe("증권예탁결제원신종사채구분코드"),
	crfd_item_yn: z.string().openapi({ example: "N" }).describe("크라우드펀딩종목여부"),
	pnia_bank_ofdy_dfrm_mthd_cd: z.string().openapi({ example: "1" }).describe("원리금은행휴무일지급방법코드"),
	qib_yn: z.string().openapi({ example: "N" }).describe("QIB여부"),
	qib_cclc_dt: z.string().openapi({ example: "00000000" }).describe("QIB해지일자"),
	csbd_yn: z.string().openapi({ example: "N" }).describe("영구채여부"),
	csbd_cclc_dt: z.string().openapi({ example: "00000000" }).describe("영구채해지일자"),
	ksd_opcb_yn: z.string().openapi({ example: "N" }).describe("증권예탁결제원옵션부사채여부"),
	ksd_sodn_yn: z.string().openapi({ example: "N" }).describe("증권예탁결제원후순위채권여부"),
	ksd_rqdi_scty_yn: z.string().openapi({ example: "N" }).describe("증권예탁결제원유동화증권여부"),
	elec_scty_yn: z.string().openapi({ example: "Y" }).describe("전자증권여부"),
	rght_ecis_mbdy_dvsn_cd: z.string().openapi({ example: "1" }).describe("권리행사주체구분코드"),
	int_rkng_mthd_dvsn_cd: z.string().openapi({ example: "1" }).describe("이자산정방법구분코드"),
	ofrg_dvsn_cd: z.string().openapi({ example: "" }).describe("모집구분코드"),
	ksd_tot_issu_amt: z.string().openapi({ example: "17303560000.00" }).describe("증권예탁결제원총발행금액"),
	next_indf_chk_ecls_yn: z.string().openapi({ example: "N" }).describe("다음이자지급체크제외여부"),
	ksd_bond_intr_dvsn_cd: z.string().openapi({ example: "1" }).describe("증권예탁결제원채권금리구분코드"),
	ksd_inrt_aply_dvsn_cd: z.string().openapi({ example: "1" }).describe("증권예탁결제원이율적용구분코드"),
	krx_issu_istt_cd: z.string().openapi({ example: "MB033" }).describe("KRX발행기관코드"),
	ksd_indf_frqc_uder_calc_cd: z.string().openapi({ example: "1" }).describe("증권예탁결제원이자지급주기미만"),
	ksd_indf_frqc_uder_calc_dcnt: z.string().openapi({ example: "0" }).describe("증권예탁결제원이자지급주기미만"),
	tlg_rcvg_dtl_dtime: z.string().openapi({ example: "20240625060514023" }).describe("전문수신상세일시"),
});

// 장내채권 매수주문
const BondBuyOrderRequestSchema = z.object({
	CANO: z.string().openapi({ example: "50067049" }).describe("종합계좌번호"),
	ACNT_PRDT_CD: z.string().openapi({ example: "01" }).describe("계좌상품코드"),
	PDNO: z.string().openapi({ example: "KR103502GA34" }).describe("상품번호 (채권코드)"),
	ORD_QTY2: z.string().openapi({ example: "10" }).describe("주문수량 (만원단위)"),
	BOND_ORD_UNPR: z.string().openapi({ example: "10250" }).describe("채권주문단가"),
	SAMT_MKET_PTCI_YN: z.string().openapi({ example: "N" }).describe("소액시장참여여부 (Y/N)"),
	BOND_RTL_MKET_YN: z.string().openapi({ example: "N" }).describe("채권소매시장여부 (Y/N)"),
	IDCR_STFNO: z.string().openapi({ example: "" }).describe("유치자직원번호"),
	MGCO_APTM_ODNO: z.string().openapi({ example: "" }).describe("운용사지정주문번호"),
	ORD_SVR_DVSN_CD: z.string().openapi({ example: "0" }).describe("주문서버구분코드"),
	CTAC_TLNO: z.string().openapi({ example: "01012345678" }).describe("연락전화번호"),
});

const BondBuyOrderResponseSchema = z.object({
	KRX_FWDG_ORD_ORGNO: z.string().openapi({ example: "91001" }).describe("KRX 전송 주문 조직번호"),
	ODNO: z.string().openapi({ example: "0000117057" }).describe("주문번호"),
	ORD_TMD: z.string().openapi({ example: "153042" }).describe("주문시각"),
});

// 장내채권 매도주문
const BondSellOrderRequestSchema = z.object({
	CANO: z.string().openapi({ example: "50067049" }).describe("종합계좌번호"),
	ACNT_PRDT_CD: z.string().openapi({ example: "01" }).describe("계좌상품코드"),
	PDNO: z.string().openapi({ example: "KR103502GA34" }).describe("상품번호 (채권코드)"),
	ORD_QTY2: z.string().openapi({ example: "5" }).describe("주문수량 (만원단위)"),
	BOND_ORD_UNPR: z.string().openapi({ example: "10260" }).describe("채권주문단가"),
	SAMT_MKET_PTCI_YN: z.string().openapi({ example: "N" }).describe("소액시장참여여부 (Y/N)"),
	BOND_RTL_MKET_YN: z.string().openapi({ example: "N" }).describe("채권소매시장여부 (Y/N)"),
	IDCR_STFNO: z.string().openapi({ example: "" }).describe("유치자직원번호"),
	MGCO_APTM_ODNO: z.string().openapi({ example: "" }).describe("운용사지정주문번호"),
	ORD_SVR_DVSN_CD: z.string().openapi({ example: "0" }).describe("주문서버구분코드"),
	CTAC_TLNO: z.string().openapi({ example: "01012345678" }).describe("연락전화번호"),
});

const BondSellOrderResponseSchema = z.object({
	KRX_FWDG_ORD_ORGNO: z.string().openapi({ example: "91002" }).describe("KRX 전송 주문 조직번호"),
	ODNO: z.string().openapi({ example: "0000117058" }).describe("주문번호"),
	ORD_TMD: z.string().openapi({ example: "153142" }).describe("주문시각"),
});

// 장내채권 정정취소주문
const BondModifyOrderRequestSchema = z.object({
	CANO: z.string().openapi({ example: "50067049" }).describe("종합계좌번호"),
	ACNT_PRDT_CD: z.string().openapi({ example: "01" }).describe("계좌상품코드"),
	KRX_FWDG_ORD_ORGNO: z.string().openapi({ example: "91001" }).describe("KRX 전송 주문 조직번호"),
	ORGN_ODNO: z.string().openapi({ example: "0000117057" }).describe("원주문번호"),
	ORD_DVSN: z.string().openapi({ example: "00" }).describe("주문구분 (00:지정가)"),
	RVSE_CNCL_DVSN_CD: z.string().openapi({ example: "02" }).describe("정정취소구분코드 (01:정정, 02:취소)"),
	ORD_QTY2: z.string().openapi({ example: "0" }).describe("주문수량 (취소시 0)"),
	BOND_ORD_UNPR: z.string().openapi({ example: "0" }).describe("채권주문단가 (취소시 0)"),
	QTY_ALL_ORD_YN: z.string().openapi({ example: "Y" }).describe("수량전부주문여부 (Y/N)"),
	IDCR_STFNO: z.string().openapi({ example: "" }).describe("유치자직원번호"),
	MGCO_APTM_ODNO: z.string().openapi({ example: "" }).describe("운용사지정주문번호"),
	ORD_SVR_DVSN_CD: z.string().openapi({ example: "0" }).describe("주문서버구분코드"),
});

const BondModifyOrderResponseSchema = z.object({
	KRX_FWDG_ORD_ORGNO: z.string().openapi({ example: "91001" }).describe("KRX 전송 주문 조직번호"),
	ODNO: z.string().openapi({ example: "0000117059" }).describe("주문번호"),
	ORD_TMD: z.string().openapi({ example: "153242" }).describe("주문시각"),
});

// 장내채권 잔고조회
const BondBalanceRequestSchema = z.object({
	CANO: z.string().openapi({ example: "50067049" }).describe("종합계좌번호"),
	ACNT_PRDT_CD: z.string().openapi({ example: "01" }).describe("계좌상품코드"),
	INQR_CNDT: z.string().openapi({ example: "00" }).describe("조회조건 (00:전체, 01:상품번호단위)"),
	PDNO: z.string().openapi({ example: "" }).describe("상품번호 (전체조회시 공백)"),
	BUY_DT: z.string().openapi({ example: "" }).describe("매수일자 (공백)"),
	CTX_AREA_FK200: z.string().openapi({ example: "" }).describe("연속조회검색조건200"),
	CTX_AREA_NK200: z.string().openapi({ example: "" }).describe("연속조회키200"),
});

const BondBalanceItemSchema = z.object({
	pdno: z.string().describe("상품번호"),
	prdt_name: z.string().describe("상품명"),
	trad_dvsn_name: z.string().describe("매매구분명"),
	bfdy_buy_qty: z.string().describe("전일매수수량"),
	bfdy_sll_qty: z.string().describe("전일매도수량"),
	thdt_buyqty: z.string().describe("금일매수수량"),
	thdt_sll_qty: z.string().describe("금일매도수량"),
	hldg_qty: z.string().describe("보유수량"),
	ord_psbl_qty: z.string().describe("주문가능수량"),
	pchs_avg_prc: z.string().describe("매입평균가격"),
	pchs_amt: z.string().describe("매입금액"),
	prpr: z.string().describe("현재가"),
	evlu_amt: z.string().describe("평가금액"),
	evlu_pfls_amt: z.string().describe("평가손익금액"),
	evlu_pfls_rt: z.string().describe("평가손익율"),
	evlu_erng_rt: z.string().describe("평가수익율"),
	loan_dt: z.string().describe("대출일"),
	loan_amt: z.string().describe("대출금액"),
	stln_slng_chgs: z.string().describe("대주매각대금"),
	expd_dt: z.string().describe("만료일"),
	fltt_rt: z.string().describe("등락율"),
	bfdy_cprs_icdc: z.string().describe("전일대비증감"),
	tr_mket_name: z.string().describe("거래시장명"),
	nas_tr_qtty: z.string().describe("나스닥거래수량"),
	bond_int_rt: z.string().describe("채권이자율"),
	bond_ystp_rt: z.string().describe("채권만기수익율"),
});

const BondBalanceResponseSchema = z.object({
	CTX_AREA_FK200: z.string().describe("연속조회검색조건200"),
	CTX_AREA_NK200: z.string().describe("연속조회키200"),
	output1: z.array(BondBalanceItemSchema).describe("잔고목록"),
	output2: z.object({
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
		scts_evlu_amt: z.string().describe("유가증권평가금액"),
		tot_evlu_amt: z.string().describe("총평가금액"),
		nass_amt: z.string().describe("순자산금액"),
		fncg_gldn_amt: z.string().describe("융자금담보금액"),
		pchs_amt_smtl_amt: z.string().describe("매입금액합계금액"),
		evlu_amt_smtl_amt: z.string().describe("평가금액합계금액"),
		evlu_pfls_smtl_amt: z.string().describe("평가손익합계금액"),
	}).describe("잔고합계"),
});

// 장내채권 주문체결내역
const BondOrderHistoryRequestSchema = z.object({
	CANO: z.string().openapi({ example: "50067049" }).describe("종합계좌번호"),
	ACNT_PRDT_CD: z.string().openapi({ example: "01" }).describe("계좌상품코드"),
	INQR_STRT_DT: z.string().openapi({ example: "20240101" }).describe("조회시작일자"),
	INQR_END_DT: z.string().openapi({ example: "20240131" }).describe("조회종료일자"),
	SLL_BUY_DVSN_CD: z.string().openapi({ example: "00" }).describe("매도매수구분코드 (00:전체, 01:매도, 02:매수)"),
	INQR_DVSN: z.string().openapi({ example: "00" }).describe("조회구분 (00:역순, 01:정순)"),
	PDNO: z.string().openapi({ example: "" }).describe("상품번호 (전체조회시 공백)"),
	CCLD_DVSN: z.string().openapi({ example: "00" }).describe("체결구분 (00:전체, 01:체결, 02:미체결)"),
	CTX_AREA_FK200: z.string().openapi({ example: "" }).describe("연속조회검색조건200"),
	CTX_AREA_NK200: z.string().openapi({ example: "" }).describe("연속조회키200"),
});

const BondOrderHistoryItemSchema = z.object({
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
	tot_ccld_amt: z.string().describe("총체결금액"),
	prsm_tlex_smtl: z.string().describe("추정제비용합계"),
	rmdr_qty: z.string().describe("잔여수량"),
	rjct_qty: z.string().describe("거부수량"),
	ccld_cndt_name: z.string().describe("체결조건명"),
	infm_tmd: z.string().describe("통보시각"),
	ctac_tlno: z.string().describe("연락전화번호"),
	prdt_type_cd: z.string().describe("상품유형코드"),
	ord_orgno: z.string().describe("주문조직번호"),
	crdt_dt: z.string().describe("신용일자"),
	crdt_grnt_amt: z.string().describe("신용승인금액"),
});

const BondOrderHistoryResponseSchema = z.object({
	CTX_AREA_FK200: z.string().describe("연속조회검색조건200"),
	CTX_AREA_NK200: z.string().describe("연속조회키200"),
	output1: z.array(BondOrderHistoryItemSchema).describe("주문체결내역목록"),
});

// 장내채권현재가 (시세)
const BondCurrentPriceRequestSchema = z.object({
	FID_COND_MRKT_DIV_CODE: z.string().openapi({ example: "B" }).describe("FID 조건 시장 분류 코드 (B: 장내채권)"),
	FID_INPUT_ISCD: z.string().openapi({ example: "KR103502GA34" }).describe("FID 입력 종목코드"),
});

const BondCurrentPriceResponseSchema = z.object({
	MKSC_SHRN_ISCD: z.string().describe("유가증권 단축 종목코드"),
	STND_ISCD: z.string().describe("표준종목코드"),
	HTS_KOR_ISNM: z.string().describe("HTS 한글 종목명"),
	BOND_PRPR: z.string().describe("채권 현재가"),
	BOND_PRDY_VRSS: z.string().describe("채권 전일 대비"),
	PRDY_VRSS_SIGN: z.string().describe("전일 대비 부호"),
	BOND_PRDY_CTRT: z.string().describe("채권 전일 대비율"),
	BOND_YLD: z.string().describe("채권 수익률"),
	ACML_VOL: z.string().describe("누적 거래량"),
	ACML_TR_PBMN: z.string().describe("누적 거래 대금"),
	BOND_OPRC: z.string().describe("채권 시가"),
	BOND_HGPR: z.string().describe("채권 최고가"),
	BOND_LWPR: z.string().describe("채권 최저가"),
	ASKP1: z.string().describe("매도호가1"),
	BIDP1: z.string().describe("매수호가1"),
	PRDY_VOL: z.string().describe("전일 거래량"),
	ASKP_RSQN1: z.string().describe("매도호가 잔량1"),
	BIDP_RSQN1: z.string().describe("매수호가 잔량1"),
	TOTAL_ASKP_RSQN: z.string().describe("총 매도호가 잔량"),
	TOTAL_BIDP_RSQN: z.string().describe("총 매수호가 잔량"),
	BOND_MATD: z.string().describe("채권 만기일"),
	BOND_CPRT: z.string().describe("채권 표면금리"),
	BOND_MAMT: z.string().describe("채권 액면금액"),
	BOND_INT_TYPE: z.string().describe("채권 이자 유형"),
	BOND_GRDE: z.string().describe("채권 등급"),
	BOND_ISR_NAME: z.string().describe("채권 발행사명"),
});

// 장내채권 호가
const BondQuoteRequestSchema = z.object({
	FID_COND_MRKT_DIV_CODE: z.string().openapi({ example: "B" }).describe("FID 조건 시장 분류 코드 (B: 장내채권)"),
	FID_INPUT_ISCD: z.string().openapi({ example: "KR103502GA34" }).describe("FID 입력 종목코드"),
});

const BondQuoteResponseSchema = z.object({
	MKSC_SHRN_ISCD: z.string().describe("유가증권 단축 종목코드"),
	BSOP_DATE: z.string().describe("영업일자"),
	BSOP_TIME: z.string().describe("영업시간"),
	ASKP1: z.string().describe("매도호가1"),
	ASKP2: z.string().describe("매도호가2"),
	ASKP3: z.string().describe("매도호가3"),
	ASKP4: z.string().describe("매도호가4"),
	ASKP5: z.string().describe("매도호가5"),
	BIDP1: z.string().describe("매수호가1"),
	BIDP2: z.string().describe("매수호가2"),
	BIDP3: z.string().describe("매수호가3"),
	BIDP4: z.string().describe("매수호가4"),
	BIDP5: z.string().describe("매수호가5"),
	ASKP_RSQN1: z.string().describe("매도호가 잔량1"),
	ASKP_RSQN2: z.string().describe("매도호가 잔량2"),
	ASKP_RSQN3: z.string().describe("매도호가 잔량3"),
	ASKP_RSQN4: z.string().describe("매도호가 잔량4"),
	ASKP_RSQN5: z.string().describe("매도호가 잔량5"),
	BIDP_RSQN1: z.string().describe("매수호가 잔량1"),
	BIDP_RSQN2: z.string().describe("매수호가 잔량2"),
	BIDP_RSQN3: z.string().describe("매수호가 잔량3"),
	BIDP_RSQN4: z.string().describe("매수호가 잔량4"),
	BIDP_RSQN5: z.string().describe("매수호가 잔량5"),
	TOTAL_ASKP_RSQN: z.string().describe("총 매도호가 잔량"),
	TOTAL_BIDP_RSQN: z.string().describe("총 매수호가 잔량"),
	ANTC_CNPR: z.string().describe("예상 체결가"),
	ANTC_CNQN: z.string().describe("예상 체결량"),
	BOND_YLD1: z.string().describe("매도수익률1"),
	BOND_YLD2: z.string().describe("매도수익률2"),
	BOND_YLD3: z.string().describe("매도수익률3"),
	BOND_YLD4: z.string().describe("매도수익률4"),
	BOND_YLD5: z.string().describe("매도수익률5"),
});

export const bondsRegistry = new OpenAPIRegistry();

bondsRegistry.register("BondBasicInfoRequest", BondBasicInfoRequestSchema);
bondsRegistry.register("BondBasicInfoResponse", BondBasicInfoResponseSchema);
bondsRegistry.register("BondBuyOrderRequest", BondBuyOrderRequestSchema);
bondsRegistry.register("BondBuyOrderResponse", BondBuyOrderResponseSchema);
bondsRegistry.register("BondSellOrderRequest", BondSellOrderRequestSchema);
bondsRegistry.register("BondSellOrderResponse", BondSellOrderResponseSchema);
bondsRegistry.register("BondModifyOrderRequest", BondModifyOrderRequestSchema);
bondsRegistry.register("BondModifyOrderResponse", BondModifyOrderResponseSchema);
bondsRegistry.register("BondBalanceRequest", BondBalanceRequestSchema);
bondsRegistry.register("BondBalanceResponse", BondBalanceResponseSchema);
bondsRegistry.register("BondOrderHistoryRequest", BondOrderHistoryRequestSchema);
bondsRegistry.register("BondOrderHistoryResponse", BondOrderHistoryResponseSchema);
bondsRegistry.register("BondCurrentPriceRequest", BondCurrentPriceRequestSchema);
bondsRegistry.register("BondCurrentPriceResponse", BondCurrentPriceResponseSchema);
bondsRegistry.register("BondQuoteRequest", BondQuoteRequestSchema);
bondsRegistry.register("BondQuoteResponse", BondQuoteResponseSchema);

export const bondsRouter: Router = (() => {
	const router = express.Router();
	
	// 장내채권 기본조회
	router.get("/uapi/domestic-bond/v1/quotations/search-bond-info", async (req, res) => {
		res.status(200).json({
			pdno: "KR2033022D33",
			prdt_type_cd: "302",
			ksd_bond_item_name: "충북지역개발채권 23-03",
			ksd_bond_item_eng_name: "CHUNGBUK PROVINCIAL DEVELOPMENT 23-03",
			ksd_bond_lstg_type_cd: "11",
			ksd_ofrg_dvsn_cd: "11",
			ksd_bond_int_dfrm_dvsn_cd: "3",
			issu_dt: "20230331",
			rdpt_dt: "20280331",
			rvnu_dt: "20230302",
			iso_crcy_cd: "KRW",
			mdwy_rdpt_dt: "00000000",
			ksd_rcvg_bond_dsct_rt: "0.000000000000",
			ksd_rcvg_bond_srfc_inrt: "2.500000000000",
			bond_expd_rdpt_rt: "100.000000000000",
			ksd_prca_rdpt_mthd_cd: "11",
			int_caltm_mcnt: "12",
			ksd_int_calc_unit_cd: "1",
			uval_cut_dvsn_cd: "2",
			uval_cut_dcpt_dgit: "0",
			ksd_dydv_caltm_aply_dvsn_cd: "1",
			dydv_calc_dcnt: "0",
			bond_expd_asrc_erng_rt: "0.000000000000",
			padf_plac_hdof_name: "농협은행",
			lstg_dt: "20230302",
			lstg_abol_dt: "20280401",
			ksd_bond_issu_mthd_cd: "2",
			laps_indf_yn: "Y",
			ksd_lhdy_pnia_dfrm_mthd_cd: "2",
			frst_int_dfrm_dt: "00000000",
			ksd_prcm_lnkg_gvbd_yn: "N",
			dpsi_end_dt: "20280401",
			dpsi_strt_dt: "20230302",
			dpsi_psbl_yn: "Y",
			atyp_rdpt_bond_erlm_yn: "N",
			dshn_occr_yn: "N",
			expd_exts_yn: "N",
			pclr_ptcr_text: "",
			bond_int_dfrm_mthd_cd: "02",
			int_dfrm_day_type_cd: "02",
			prca_dfmt_term_mcnt: "0",
			splt_rdpt_rcnt: "0",
			rgbf_int_dfrm_dt: "",
			nxtm_int_dfrm_dt: "20280331",
			sprx_psbl_yn: "N",
			ictx_rt_dvsn_cd: "",
			bond_clsf_cd: "112555",
			bond_clsf_kor_name: "충북지역개발채권",
			int_mned_dvsn_cd: "2",
			pnia_int_calc_unpr: "0.0000",
			frn_intr: "0.000000000000",
			aply_day_prcm_idx_lnkg_cefc: "0.0000000000",
			ksd_expd_dydv_calc_bass_cd: "",
			expd_dydv_calc_dcnt: "0",
			ksd_cbbw_dvsn_cd: "9",
			crfd_item_yn: "N",
			pnia_bank_ofdy_dfrm_mthd_cd: "1",
			qib_yn: "N",
			qib_cclc_dt: "00000000",
			csbd_yn: "N",
			csbd_cclc_dt: "00000000",
			ksd_opcb_yn: "N",
			ksd_sodn_yn: "N",
			ksd_rqdi_scty_yn: "N",
			elec_scty_yn: "Y",
			rght_ecis_mbdy_dvsn_cd: "1",
			int_rkng_mthd_dvsn_cd: "1",
			ofrg_dvsn_cd: "",
			ksd_tot_issu_amt: "17303560000.00",
			next_indf_chk_ecls_yn: "N",
			ksd_bond_intr_dvsn_cd: "1",
			ksd_inrt_aply_dvsn_cd: "1",
			krx_issu_istt_cd: "MB033",
			ksd_indf_frqc_uder_calc_cd: "1",
			ksd_indf_frqc_uder_calc_dcnt: "0",
			tlg_rcvg_dtl_dtime: "20240625060514023",
		});
	});

	// 장내채권 매수주문
	router.post("/uapi/domestic-bond/v1/trading/buy", async (req, res) => {
		res.status(200).json({
			KRX_FWDG_ORD_ORGNO: "91001",
			ODNO: "0000117057",
			ORD_TMD: "153042",
		});
	});

	// 장내채권 잔고조회
	router.get("/uapi/domestic-bond/v1/trading/inquire-balance", async (req, res) => {
		res.status(200).json({
			CTX_AREA_FK200: "",
			CTX_AREA_NK200: "",
			output1: [
				{
					pdno: "KR103502GA34",
					prdt_name: "국고03500-0934(24-7)",
					trad_dvsn_name: "매수",
					bfdy_buy_qty: "0",
					bfdy_sll_qty: "0",
					thdt_buyqty: "10",
					thdt_sll_qty: "0",
					hldg_qty: "10",
					ord_psbl_qty: "10",
					pchs_avg_prc: "10250.00",
					pchs_amt: "10250000",
					prpr: "10255.00",
					evlu_amt: "10255000",
					evlu_pfls_amt: "5000",
					evlu_pfls_rt: "0.049",
					evlu_erng_rt: "1.85",
					loan_dt: "",
					loan_amt: "0",
					stln_slng_chgs: "0",
					expd_dt: "20340910",
					fltt_rt: "0.049",
					bfdy_cprs_icdc: "5.00",
					tr_mket_name: "장내채권",
					nas_tr_qtty: "0",
					bond_int_rt: "3.500",
					bond_ystp_rt: "3.125",
				},
			],
			output2: {
				dnca_tot_amt: "50000000",
				nxdy_excc_amt: "0",
				prvs_rcdl_excc_amt: "0",
				cma_evlu_amt: "50000000",
				bfdy_buy_amt: "0",
				thdt_buy_amt: "10250000",
				nxdy_auto_rdpt_amt: "0",
				bfdy_sll_amt: "0",
				thdt_sll_amt: "0",
				d2_auto_rdpt_amt: "0",
				bfdy_tlex_amt: "0",
				thdt_tlex_amt: "2500",
				tot_loan_amt: "0",
				scts_evlu_amt: "10255000",
				tot_evlu_amt: "60255000",
				nass_amt: "60255000",
				fncg_gldn_amt: "0",
				pchs_amt_smtl_amt: "10250000",
				evlu_amt_smtl_amt: "10255000",
				evlu_pfls_smtl_amt: "5000",
			},
		});
	});

	return router;
})();
