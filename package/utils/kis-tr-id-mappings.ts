// 이 파일은 kis-api-table.csv에서 자동 생성됩니다.
// 수동으로 편집하지 마세요.

export interface TrIdMapping {
  real?: string;
  mock?: string;
}

export interface ApiInfo {
  name: string;
  category: string;
  method: string;
  supportsMock: boolean;
}

// TR_ID 매핑 테이블
export const TR_ID_MAPPINGS: Record<string, TrIdMapping> = {
  "/domestic-stock/v1/trading/period-rights": {
    "real": "CTRGA011R"
  },
  "/domestic-stock/v1/trading/inquire-account-balance": {
    "real": "CTRP6548R"
  },
  "/domestic-stock/v1/trading/pension/inquire-deposit": {
    "real": "TTTC0506R"
  },
  "/domestic-stock/v1/trading/order-resv-rvsecncl": {
    "real": "CTSC0009U  CTSC0013U"
  },
  "/domestic-stock/v1/trading/inquire-credit-psamount": {
    "real": "TTTC8909R"
  },
  "/domestic-stock/v1/trading/intgr-margin": {
    "real": "TTTC0869R"
  },
  "/domestic-stock/v1/trading/pension/inquire-daily-ccld": {
    "real": "TTTC2201R"
  },
  "/domestic-stock/v1/trading/inquire-period-trade-profit": {
    "real": "TTTC8715R"
  },
  "/domestic-stock/v1/trading/order-rvsecncl": {
    "real": "TTTC0013U",
    "mock": "VTTC0013U"
  },
  "/domestic-stock/v1/trading/order-resv-ccnl": {
    "real": "CTSC0004R"
  },
  "/domestic-stock/v1/trading/pension/inquire-psbl-order": {
    "real": "TTTC0503R"
  },
  "/domestic-stock/v1/trading/inquire-balance": {
    "real": "TTTC8434R",
    "mock": "VTTC8434R"
  },
  "/domestic-stock/v1/trading/pension/inquire-present-balance": {
    "real": "TTTC2202R"
  },
  "/domestic-stock/v1/trading/inquire-psbl-order": {
    "real": "TTTC8908R",
    "mock": "VTTC8908R"
  },
  "/domestic-stock/v1/trading/inquire-period-profit": {
    "real": "TTTC8708R"
  },
  "/domestic-stock/v1/trading/order-cash": {
    "real": "TTTC0011U  TTTC0012U",
    "mock": "VTTC0011U  VTTC0012U"
  },
  "/domestic-stock/v1/trading/inquire-psbl-sell": {
    "real": "TTTC8408R"
  },
  "/domestic-stock/v1/trading/inquire-daily-ccld": {
    "real": "TTTC0081R  CTSC9215R",
    "mock": "VTTC0081R  VTSC9215R"
  },
  "/domestic-stock/v1/trading/inquire-psbl-rvsecncl": {
    "real": "TTTC0084R"
  },
  "/domestic-stock/v1/trading/order-resv": {
    "real": "CTSC0008U"
  },
  "/domestic-stock/v1/trading/order-credit": {
    "real": "TTTC0051U  TTTC0052U"
  },
  "/domestic-stock/v1/trading/pension/inquire-balance": {
    "real": "TTTC2208R"
  },
  "/domestic-stock/v1/trading/inquire-balance-rlz-pl": {
    "real": "TTTC8494R"
  },
  "/domestic-stock/v1/quotations/inquire-daily-price": {
    "real": "FHKST01010400",
    "mock": "FHKST01010400"
  },
  "/domestic-stock/v1/quotations/inquire-price": {
    "real": "FHKST01010100",
    "mock": "FHKST01010100"
  },
  "/domestic-stock/v1/quotations/inquire-overtime-price": {
    "real": "FHPST02300000"
  },
  "/etfetn/v1/quotations/inquire-component-stock-price": {
    "real": "FHKST121600C0"
  },
  "/domestic-stock/v1/quotations/inquire-time-overtimeconclusion": {
    "real": "FHPST02310000",
    "mock": "FHPST02310000"
  },
  "/etfetn/v1/quotations/nav-comparison-trend": {
    "real": "FHPST02440000"
  },
  "/domestic-stock/v1/quotations/inquire-daily-overtimeprice": {
    "real": "FHPST02320000",
    "mock": "FHPST02320000"
  },
  "/domestic-stock/v1/quotations/inquire-overtime-asking-price": {
    "real": "FHPST02300400"
  },
  "/domestic-stock/v1/quotations/inquire-time-itemconclusion": {
    "real": "FHPST01060000",
    "mock": "FHPST01060000"
  },
  "/domestic-stock/v1/quotations/inquire-price-2": {
    "real": "FHPST01010000"
  },
  "/domestic-stock/v1/quotations/inquire-time-dailychartprice": {
    "real": "FHKST03010230"
  },
  "/domestic-stock/v1/quotations/inquire-daily-itemchartprice": {
    "real": "FHKST03010100",
    "mock": "FHKST03010100"
  },
  "/etfetn/v1/quotations/nav-comparison-daily-trend": {
    "real": "FHPST02440200"
  },
  "/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn": {
    "real": "FHKST01010200",
    "mock": "FHKST01010200"
  },
  "/domestic-stock/v1/quotations/inquire-ccnl": {
    "real": "FHKST01010300",
    "mock": "FHKST01010300"
  },
  "/domestic-stock/v1/quotations/inquire-member": {
    "real": "FHKST01010600",
    "mock": "FHKST01010600"
  },
  "/etfetn/v1/quotations/nav-comparison-time-trend": {
    "real": "FHPST02440100"
  },
  "/domestic-stock/v1/quotations/inquire-investor": {
    "real": "FHKST01010900",
    "mock": "FHKST01010900"
  },
  "/etfetn/v1/quotations/inquire-price": {
    "real": "FHPST02400000"
  },
  "/domestic-stock/v1/quotations/exp-closing-price": {
    "real": "FHKST117300C0"
  },
  "/domestic-stock/v1/quotations/inquire-time-itemchartprice": {
    "real": "FHKST03010200",
    "mock": "FHKST03010200"
  },
  "/domestic-stock/v1/quotations/inquire-elw-price": {
    "real": "FHKEW15010000",
    "mock": "FHKEW15010000"
  },
  "/elw/v1/quotations/newly-listed": {
    "real": "FHKEW154800C0"
  },
  "/elw/v1/quotations/indicator-trend-daily": {
    "real": "FHPEW02740200"
  },
  "/elw/v1/ranking/sensitivity": {
    "real": "FHPEW02850000"
  },
  "/elw/v1/quotations/udrl-asset-price": {
    "real": "FHKEW154101C0"
  },
  "/elw/v1/quotations/cond-search": {
    "real": "FHKEW15100000"
  },
  "/elw/v1/quotations/volatility-trend-minute": {
    "real": "FHPEW02840300"
  },
  "/elw/v1/quotations/volatility-trend-ccnl": {
    "real": "FHPEW02840100"
  },
  "/elw/v1/ranking/quick-change": {
    "real": "FHPEW02870000"
  },
  "/elw/v1/quotations/indicator-trend-minute": {
    "real": "FHPEW02740300"
  },
  "/elw/v1/quotations/udrl-asset-list": {
    "real": "FHKEW154100C0"
  },
  "/elw/v1/quotations/volatility-trend-daily": {
    "real": "FHPEW02840200"
  },
  "/elw/v1/ranking/volume-rank": {
    "real": "FHPEW02780000"
  },
  "/elw/v1/ranking/indicator": {
    "real": "FHPEW02790000"
  },
  "/elw/v1/quotations/indicator-trend-ccnl": {
    "real": "FHPEW02740100"
  },
  "/elw/v1/ranking/updown-rate": {
    "real": "FHPEW02770000"
  },
  "/elw/v1/quotations/sensitivity-trend-daily": {
    "real": "FHPEW02830200"
  },
  "/elw/v1/quotations/compare-stocks": {
    "real": "FHKEW151701C0"
  },
  "/elw/v1/quotations/expiration-stocks": {
    "real": "FHKEW154700C0"
  },
  "/elw/v1/quotations/lp-trade-trend": {
    "real": "FHPEW03760000"
  },
  "/elw/v1/quotations/sensitivity-trend-ccnl": {
    "real": "FHPEW02830100"
  },
  "/elw/v1/quotations/volatility-trend-tick": {
    "real": "FHPEW02840400"
  },
  "/domestic-stock/v1/quotations/exp-index-trend": {
    "real": "FHPST01840000"
  },
  "/domestic-stock/v1/quotations/inquire-daily-indexchartprice": {
    "real": "FHKUP03500100",
    "mock": "FHKUP03500100"
  },
  "/domestic-stock/v1/quotations/inquire-index-timeprice": {
    "real": "FHPUP02110200"
  },
  "/domestic-stock/v1/quotations/inquire-index-category-price": {
    "real": "FHPUP02140000"
  },
  "/domestic-stock/v1/quotations/inquire-time-indexchartprice": {
    "real": "FHKUP03500200"
  },
  "/domestic-stock/v1/quotations/chk-holiday": {
    "real": "CTCA0903R"
  },
  "/domestic-stock/v1/quotations/exp-total-index": {
    "real": "FHKUP11750000"
  },
  "/domestic-stock/v1/quotations/inquire-index-price": {
    "real": "FHPUP02100000"
  },
  "/domestic-stock/v1/quotations/market-time": {
    "real": "HHMCM000002C0"
  },
  "/domestic-stock/v1/quotations/inquire-index-tickprice": {
    "real": "FHPUP02110100"
  },
  "/domestic-stock/v1/quotations/inquire-index-daily-price": {
    "real": "FHPUP02120000"
  },
  "/domestic-stock/v1/quotations/comp-interest": {
    "real": "FHPST07020000"
  },
  "/domestic-stock/v1/quotations/inquire-vi-status": {
    "real": "FHPST01390000"
  },
  "/domestic-stock/v1/quotations/news-title": {
    "real": "FHKST01011800"
  },
  "/domestic-stock/v1/quotations/search-info": {
    "real": "CTPF1604R"
  },
  "/domestic-stock/v1/ksdinfo/list-info": {
    "real": "HHKDB669107C0"
  },
  "/domestic-stock/v1/ksdinfo/pub-offer": {
    "real": "HHKDB669108C0"
  },
  "/domestic-stock/v1/finance/financial-ratio": {
    "real": "FHKST66430300"
  },
  "/domestic-stock/v1/ksdinfo/cap-dcrs": {
    "real": "HHKDB669106C0"
  },
  "/domestic-stock/v1/ksdinfo/bonus-issue": {
    "real": "HHKDB669101C0"
  },
  "/domestic-stock/v1/quotations/invest-opbysec": {
    "real": "FHKST663400C0"
  },
  "/domestic-stock/v1/quotations/credit-by-company": {
    "real": "FHPST04770000"
  },
  "/domestic-stock/v1/ksdinfo/purreq": {
    "real": "HHKDB669103C0"
  },
  "/domestic-stock/v1/ksdinfo/rev-split": {
    "real": "HHKDB669105C0"
  },
  "/domestic-stock/v1/ksdinfo/dividend": {
    "real": "HHKDB669102C0"
  },
  "/domestic-stock/v1/quotations/invest-opinion": {
    "real": "FHKST663300C0"
  },
  "/domestic-stock/v1/finance/stability-ratio": {
    "real": "FHKST66430600"
  },
  "/domestic-stock/v1/finance/profit-ratio": {
    "real": "FHKST66430400"
  },
  "/domestic-stock/v1/ksdinfo/forfeit": {
    "real": "HHKDB669109C0"
  },
  "/domestic-stock/v1/ksdinfo/mand-deposit": {
    "real": "HHKDB669110C0"
  },
  "/domestic-stock/v1/finance/income-statement": {
    "real": "FHKST66430200"
  },
  "/domestic-stock/v1/quotations/lendable-by-company": {
    "real": "CTSC2702R"
  },
  "/domestic-stock/v1/quotations/search-stock-info": {
    "real": "CTPF1002R"
  },
  "/domestic-stock/v1/ksdinfo/paidin-capin": {
    "real": "HHKDB669100C0"
  },
  "/domestic-stock/v1/ksdinfo/sharehld-meet": {
    "real": "HHKDB669111C0"
  },
  "/domestic-stock/v1/finance/growth-ratio": {
    "real": "FHKST66430800"
  },
  "/domestic-stock/v1/finance/balance-sheet": {
    "real": "FHKST66430100"
  },
  "/domestic-stock/v1/ksdinfo/merger-split": {
    "real": "HHKDB669104C0"
  },
  "/domestic-stock/v1/quotations/estimate-perform": {
    "real": "HHKST668300C0"
  },
  "/domestic-stock/v1/finance/other-major-ratios": {
    "real": "FHKST66430500"
  },
  "/domestic-stock/v1/quotations/comp-program-trade-today": {
    "real": "FHPPG04600101"
  },
  "/domestic-stock/v1/quotations/daily-credit-balance": {
    "real": "FHPST04760000"
  },
  "/domestic-stock/v1/quotations/inquire-investor-daily-by-market": {
    "real": "FHPTJ04040000"
  },
  "/domestic-stock/v1/quotations/daily-short-sale": {
    "real": "FHPST04830000"
  },
  "/domestic-stock/v1/quotations/investor-trade-by-stock-daily": {
    "real": "FHPTJ04160001"
  },
  "/domestic-stock/v1/quotations/psearch-title": {
    "real": "HHKST03900300"
  },
  "/domestic-stock/v1/quotations/capture-uplowprice": {
    "real": "FHKST130000C0"
  },
  "/domestic-stock/v1/quotations/comp-program-trade-daily": {
    "real": "FHPPG04600001"
  },
  "/domestic-stock/v1/quotations/daily-loan-trans": {
    "real": "HHPST074500C0"
  },
  "/domestic-stock/v1/quotations/psearch-result": {
    "real": "HHKST03900400"
  },
  "/domestic-stock/v1/quotations/pbar-tratio": {
    "real": "FHPST01130000"
  },
  "/domestic-stock/v1/quotations/foreign-institution-total": {
    "real": "FHPTJ04400000"
  },
  "/domestic-stock/v1/quotations/intstock-stocklist-by-group": {
    "real": "HHKCM113004C6"
  },
  "/domestic-stock/v1/quotations/inquire-member-daily": {
    "real": "FHPST04540000"
  },
  "/domestic-stock/v1/quotations/program-trade-by-stock-daily": {
    "real": "FHPPG04650201"
  },
  "/domestic-stock/v1/quotations/intstock-grouplist": {
    "real": "HHKCM113004C7"
  },
  "/domestic-stock/v1/quotations/investor-trend-estimate": {
    "real": "HHPTJ04160200"
  },
  "/domestic-stock/v1/quotations/inquire-daily-trade-volume": {
    "real": "FHKST03010800"
  },
  "/domestic-stock/v1/quotations/tradprt-byamt": {
    "real": "FHKST111900C0"
  },
  "/domestic-stock/v1/quotations/investor-program-trade-today": {
    "real": "HHPPG046600C1"
  },
  "/domestic-stock/v1/quotations/mktfunds": {
    "real": "FHKST649100C0"
  },
  "/domestic-stock/v1/quotations/exp-price-trend": {
    "real": "FHPST01810000"
  },
  "/domestic-stock/v1/quotations/frgnmem-trade-trend": {
    "real": "FHPST04320000"
  },
  "/domestic-stock/v1/quotations/inquire-investor-time-by-market": {
    "real": "FHPTJ04030000"
  },
  "/domestic-stock/v1/quotations/program-trade-by-stock": {
    "real": "FHPPG04650101"
  },
  "/domestic-stock/v1/quotations/frgnmem-trade-estimate": {
    "real": "FHKST644100C0"
  },
  "/domestic-stock/v1/ranking/overtime-exp-trans-fluct": {
    "real": "FHKST11860000"
  },
  "/domestic-stock/v1/quotations/frgnmem-pchs-trend": {
    "real": "FHKST644400C0"
  },
  "/domestic-stock/v1/quotations/intstock-multprice": {
    "real": "FHKST11300006"
  },
  "/domestic-stock/v1/ranking/exp-trans-updown": {
    "real": "FHPST01820000"
  },
  "/domestic-stock/v1/ranking/quote-balance": {
    "real": "FHPST01720000"
  },
  "/domestic-stock/v1/ranking/credit-balance": {
    "real": "FHKST17010000"
  },
  "/domestic-stock/v1/ranking/overtime-volume": {
    "real": "FHPST02350000"
  },
  "/domestic-stock/v1/ranking/dividend-rate": {
    "real": "HHKDB13470100"
  },
  "/domestic-stock/v1/ranking/after-hour-balance": {
    "real": "FHPST01760000"
  },
  "/domestic-stock/v1/ranking/short-sale": {
    "real": "FHPST04820000"
  },
  "/domestic-stock/v1/ranking/disparity": {
    "real": "FHPST01780000"
  },
  "/domestic-stock/v1/ranking/hts-top-view": {
    "real": "HHMCM000100C0"
  },
  "/domestic-stock/v1/quotations/volume-rank": {
    "real": "FHPST01710000"
  },
  "/domestic-stock/v1/ranking/profit-asset-index": {
    "real": "FHPST01730000"
  },
  "/domestic-stock/v1/ranking/near-new-highlow": {
    "real": "FHPST01870000"
  },
  "/domestic-stock/v1/ranking/prefer-disparate-ratio": {
    "real": "FHPST01770000"
  },
  "/domestic-stock/v1/ranking/bulk-trans-num": {
    "real": "FHKST190900C0"
  },
  "/domestic-stock/v1/ranking/finance-ratio": {
    "real": "FHPST01750000"
  },
  "/domestic-stock/v1/ranking/market-cap": {
    "real": "FHPST01740000"
  },
  "/domestic-stock/v1/ranking/traded-by-company": {
    "real": "FHPST01860000"
  },
  "/domestic-stock/v1/ranking/fluctuation": {
    "real": "FHPST01700000"
  },
  "/domestic-stock/v1/ranking/market-value": {
    "real": "FHPST01790000"
  },
  "/domestic-stock/v1/ranking/top-interest-stock": {
    "real": "FHPST01800000"
  },
  "/domestic-stock/v1/ranking/volume-power": {
    "real": "FHPST01680000"
  },
  "/domestic-stock/v1/ranking/overtime-fluctuation": {
    "real": "FHPST02340000"
  },
  "/tryitout/H0UPANC0": {
    "real": "H0UPANC0"
  },
  "/tryitout/H0UNMKO0": {
    "real": "H0UNMKO0"
  },
  "/tryitout/H0NXMBC0": {
    "real": "H0NXMBC0"
  },
  "/tryitout/H0STCNI0": {
    "real": "H0STCNI0",
    "mock": "H0STCNI9"
  },
  "/tryitout/H0STOAC0": {
    "real": "H0STOAC0"
  },
  "/tryitout/H0STOAA0": {
    "real": "H0STOAA0"
  },
  "/tryitout/H0UNPGM0": {
    "real": "H0UNPGM0"
  },
  "/tryitout/H0UNASP0": {
    "real": "H0UNASP0"
  },
  "/tryitout/H0STPGM0": {
    "real": "H0STPGM0"
  },
  "/tryitout/H0STMKO0": {
    "real": "H0STMKO0"
  },
  "/tryitout/H0STCNT0": {
    "real": "H0STCNT0",
    "mock": "H0STCNT0"
  },
  "/tryitout/H0UPPGM0": {
    "real": "H0UPPGM0"
  },
  "/tryitout/H0UNMBC0": {
    "real": "H0UNMBC0"
  },
  "/tryitout/H0UPCNT0": {
    "real": "H0UPCNT0"
  },
  "/tryitout/H0STANC0": {
    "real": "H0STANC0"
  },
  "/tryitout/H0EWASP0": {
    "real": "H0EWASP0"
  },
  "/tryitout/H0STASP0": {
    "real": "H0STASP0",
    "mock": "H0STASP0"
  },
  "/tryitout/H0UNCNT0": {
    "real": "H0UNCNT0"
  },
  "/tryitout/H0NXASP0": {
    "real": "H0NXASP0"
  },
  "/tryitout/H0NXPGM0": {
    "real": "H0NXPGM0"
  },
  "/tryitout/H0NXCNT0": {
    "real": "H0NXCNT0"
  },
  "/tryitout/H0EWCNT0": {
    "real": "H0EWCNT0"
  },
  "/tryitout/H0EWANC0": {
    "real": "H0EWANC0"
  },
  "/tryitout/H0NXANC0": {
    "real": "H0NXANC0"
  },
  "/tryitout/H0STMBC0": {
    "real": "H0STMBC0"
  },
  "/tryitout/H0UNANC0": {
    "real": "H0UNANC0"
  },
  "/tryitout/H0NXMKO0": {
    "real": "H0NXMKO0"
  },
  "/tryitout/H0STNAV0": {
    "real": "H0STNAV0"
  },
  "/tryitout/H0STOUP0": {
    "real": "H0STOUP0"
  },
  "/domestic-futureoption/v1/trading/ngt-margin-detail": {
    "real": "JTCE6003R  CTFN7107R"
  },
  "/domestic-futureoption/v1/trading/inquire-deposit": {
    "real": "CTRP6550R"
  },
  "/domestic-futureoption/v1/trading/inquire-daily-amount-fee": {
    "real": "CTFO6119R"
  },
  "/domestic-futureoption/v1/trading/inquire-ngt-balance": {
    "real": "JTCE6001R  CTFN6118R"
  },
  "/domestic-futureoption/v1/trading/inquire-balance": {
    "real": "CTFO6118R",
    "mock": "VTFO6118R"
  },
  "/domestic-futureoption/v1/trading/order": {
    "real": "TTTO1101U   JTCE1001U  STTN1101U",
    "mock": "VTTO1101U"
  },
  "/domestic-futureoption/v1/trading/inquire-balance-valuation-pl": {
    "real": "CTFO6159R"
  },
  "/domestic-futureoption/v1/trading/order-rvsecncl": {
    "real": "TTTO1103U   JTCE1002U  STTN1103U",
    "mock": "VTTO1103U"
  },
  "/domestic-futureoption/v1/trading/inquire-ccnl": {
    "real": "TTTO5201R",
    "mock": "VTTO5201R"
  },
  "/domestic-futureoption/v1/trading/inquire-ngt-ccnl": {
    "real": "JTCE5005R  STTN5201R"
  },
  "/domestic-futureoption/v1/trading/inquire-psbl-ngt-order": {
    "real": "JTCE1004R  STTN5105R"
  },
  "/domestic-futureoption/v1/trading/inquire-balance-settlement-pl": {
    "real": "CTFO6117R"
  },
  "/domestic-futureoption/v1/trading/inquire-psbl-order": {
    "real": "TTTO5105R",
    "mock": "VTTO5105R"
  },
  "/domestic-futureoption/v1/trading/inquire-ccnl-bstime": {
    "real": "CTFO5139R"
  },
  "/domestic-futureoption/v1/quotations/inquire-price": {
    "real": "FHMIF10000000",
    "mock": "FHMIF10000000"
  },
  "/domestic-futureoption/v1/quotations/display-board-top": {
    "real": "FHPIF05030000"
  },
  "/domestic-futureoption/v1/quotations/exp-price-trend": {
    "real": "FHPIF05110100"
  },
  "/domestic-futureoption/v1/quotations/inquire-daily-fuopchartprice": {
    "real": "FHKIF03020100",
    "mock": "FHKIF03020100"
  },
  "/domestic-futureoption/v1/quotations/display-board-futures": {
    "real": "FHPIF05030200"
  },
  "/domestic-futureoption/v1/quotations/inquire-time-fuopchartprice": {
    "real": "FHKIF03020200"
  },
  "/domestic-futureoption/v1/quotations/display-board-option-list": {
    "real": "FHPIO056104C0"
  },
  "/domestic-futureoption/v1/quotations/inquire-asking-price": {
    "real": "FHMIF10010000",
    "mock": "FHMIF10010000"
  },
  "/domestic-futureoption/v1/quotations/display-board-callput": {
    "real": "FHPIF05030100"
  },
  "/tryitout/H0ZOASP0": {
    "real": "H0ZOASP0"
  },
  "/tryitout/H0IFCNI0": {
    "real": "H0IFCNI0",
    "mock": "H0IFCNI9"
  },
  "/tryitout/H0MFCNT0": {
    "real": "H0MFCNT0"
  },
  "/tryitout/H0MFASP0": {
    "real": "H0MFASP0"
  },
  "/tryitout/H0EUCNT0": {
    "real": "H0EUCNT0"
  },
  "/tryitout/H0EUANC0": {
    "real": "H0EUANC0"
  },
  "/tryitout/H0IFCNT0": {
    "real": "H0IFCNT0"
  },
  "/tryitout/H0ZFANC0": {
    "real": "H0ZFANC0"
  },
  "/tryitout/H0EUCNI0": {
    "real": "H0MFCNI0"
  },
  "/tryitout/H0MFCNI0": {
    "real": "H0MFCNI0"
  },
  "/tryitout/H0CFCNT0": {
    "real": "H0CFCNT0"
  },
  "/tryitout/H0IFASP0": {
    "real": "H0IFASP0"
  },
  "/tryitout/H0IOCNT0": {
    "real": "H0IOCNT0"
  },
  "/tryitout/H0EUASP0": {
    "real": "H0EUASP0"
  },
  "/tryitout/H0CFASP0": {
    "real": "H0CFASP0"
  },
  "/tryitout/H0ZOANC0": {
    "real": "H0ZOANC0"
  },
  "/tryitout/H0ZFASP0": {
    "real": "H0ZFASP0"
  },
  "/tryitout/H0ZOCNT0": {
    "real": "H0ZOCNT0"
  },
  "/tryitout/H0IOASP0": {
    "real": "H0IOASP0"
  },
  "/tryitout/H0ZFCNT0": {
    "real": "H0ZFCNT0"
  },
  "/overseas-stock/v1/trading/inquire-balance": {
    "real": "TTTS3012R",
    "mock": "VTTS3012R"
  },
  "/overseas-stock/v1/trading/inquire-present-balance": {
    "real": "CTRP6504R",
    "mock": "VTRP6504R"
  },
  "/overseas-stock/v1/trading/inquire-algo-ccnl": {
    "real": "TTTS6059R"
  },
  "/overseas-stock/v1/trading/inquire-period-profit": {
    "real": "TTTS3039R"
  },
  "/overseas-stock/v1/trading/inquire-psamount": {
    "real": "TTTS3007R",
    "mock": "VTTS3007R"
  },
  "/overseas-stock/v1/trading/order-rvsecncl": {
    "real": "TTTT1004U",
    "mock": "VTTT1004U"
  },
  "/overseas-stock/v1/trading/order-resv": {
    "real": "TTTT3014U   TTTT3016U    TTTS3013U",
    "mock": "VTTT3014U   VTTT3016U    VTTS3013U"
  },
  "/overseas-stock/v1/trading/inquire-nccs": {
    "real": "TTTS3018R"
  },
  "/overseas-stock/v1/trading/daytime-order-rvsecncl": {
    "real": "TTTS6038U"
  },
  "/overseas-stock/v1/trading/inquire-ccnl": {
    "real": "TTTS3035R",
    "mock": "VTTS3035R"
  },
  "/overseas-stock/v1/trading/inquire-paymt-stdr-balance": {
    "real": "CTRP6010R"
  },
  "/overseas-stock/v1/trading/inquire-period-trans": {
    "real": "CTOS4001R"
  },
  "/overseas-stock/v1/trading/daytime-order": {
    "real": "TTTS6036U  TTTS6037U"
  },
  "/overseas-stock/v1/trading/order-resv-list": {
    "real": "TTTT3039R  TTTS3014R"
  },
  "/overseas-stock/v1/trading/order": {
    "real": "TTTT1002U   TTTT1006U",
    "mock": "VTTT1002U   VTTT1001U"
  },
  "/overseas-stock/v1/trading/order-resv-ccnl": {
    "real": "TTTT3017U",
    "mock": "VTTT3017U"
  },
  "/overseas-stock/v1/trading/algo-ordno": {
    "real": "TTTS6058R"
  },
  "/overseas-stock/v1/trading/foreign-margin": {
    "real": "TTTC2101R"
  },
  "/overseas-price/v1/quotations/inquire-ccnl": {
    "real": "HHDFS76200300"
  },
  "/overseas-price/v1/quotations/dailyprice": {
    "real": "HHDFS76240000",
    "mock": "HHDFS76240000"
  },
  "/overseas-stock/v1/quotations/countries-holiday": {
    "real": "CTOS5011R"
  },
  "/overseas-price/v1/quotations/price": {
    "real": "HHDFS00000300",
    "mock": "HHDFS00000300"
  },
  "/overseas-price/v1/quotations/inquire-search": {
    "real": "HHDFS76410000",
    "mock": "HHDFS76410000"
  },
  "/overseas-price/v1/quotations/search-info": {
    "real": "CTPF1702R"
  },
  "/overseas-price/v1/quotations/inquire-time-indexchartprice": {
    "real": "FHKST03030200"
  },
  "/overseas-price/v1/quotations/inquire-time-itemchartprice": {
    "real": "HHDFS76950200"
  },
  "/overseas-price/v1/quotations/price-detail": {
    "real": "HHDFS76200200"
  },
  "/overseas-price/v1/quotations/industry-price": {
    "real": "HHDFS76370100"
  },
  "/overseas-price/v1/quotations/inquire-daily-chartprice": {
    "real": "FHKST03030100",
    "mock": "FHKST03030100"
  },
  "/overseas-price/v1/quotations/industry-theme": {
    "real": "HHDFS76370000"
  },
  "/overseas-price/v1/quotations/inquire-asking-price": {
    "real": "HHDFS76200100"
  },
  "/overseas-stock/v1/ranking/trade-growth": {
    "real": "HHDFS76330000"
  },
  "/overseas-price/v1/quotations/period-rights": {
    "real": "CTRGT011R"
  },
  "/overseas-stock/v1/ranking/price-fluct": {
    "real": "HHDFS76260000"
  },
  "/overseas-stock/v1/ranking/trade-pbmn": {
    "real": "HHDFS76320010"
  },
  "/overseas-stock/v1/ranking/volume-surge": {
    "real": "HHDFS76270000"
  },
  "/overseas-stock/v1/ranking/new-highlow": {
    "real": "HHDFS76300000"
  },
  "/overseas-stock/v1/ranking/volume-power": {
    "real": "HHDFS76280000"
  },
  "/overseas-stock/v1/ranking/trade-turnover": {
    "real": "HHDFS76340000"
  },
  "/overseas-price/v1/quotations/news-title": {
    "real": "HHPSTH60100C1"
  },
  "/overseas-price/v1/quotations/colable-by-company": {
    "real": "CTLN4050R"
  },
  "/overseas-stock/v1/ranking/market-cap": {
    "real": "HHDFS76350100"
  },
  "/overseas-price/v1/quotations/brknews-title": {
    "real": "FHKST01011801"
  },
  "/overseas-stock/v1/ranking/updown-rate": {
    "real": "HHDFS76290000"
  },
  "/overseas-price/v1/quotations/rights-by-ice": {
    "real": "HHDFS78330900"
  },
  "/overseas-stock/v1/ranking/trade-vol": {
    "real": "HHDFS76310010"
  },
  "/tryitout/HDFSASP0": {
    "real": "HDFSASP0"
  },
  "/tryitout/HDFSASP1": {
    "real": "HDFSASP1"
  },
  "/tryitout/HDFSCNT0": {
    "real": "HDFSCNT0"
  },
  "/tryitout/H0GSCNI0": {
    "real": "H0GSCNI0",
    "mock": "H0GSCNI9"
  },
  "/overseas-futureoption/v1/trading/order": {
    "real": "OTFM3001U"
  },
  "/overseas-futureoption/v1/trading/order-rvsecncl": {
    "real": "OTFM3002U  OTFM3003U"
  },
  "/overseas-futureoption/v1/trading/inquire-ccld": {
    "real": "OTFM3116R"
  },
  "/overseas-futureoption/v1/trading/inquire-unpd": {
    "real": "OTFM1412R"
  },
  "/overseas-futureoption/v1/trading/inquire-psamount": {
    "real": "OTFM3304R"
  },
  "/overseas-futureoption/v1/trading/inquire-period-ccld": {
    "real": "OTFM3118R"
  },
  "/overseas-futureoption/v1/trading/inquire-daily-ccld": {
    "real": "OTFM3122R"
  },
  "/overseas-futureoption/v1/trading/inquire-deposit": {
    "real": "OTFM1411R"
  },
  "/overseas-futureoption/v1/trading/inquire-daily-order": {
    "real": "OTFM3120R"
  },
  "/overseas-futureoption/v1/trading/inquire-period-trans": {
    "real": "OTFM3114R"
  },
  "/overseas-futureoption/v1/trading/margin-detail": {
    "real": "OTFM3115R"
  },
  "/overseas-futureoption/v1/quotations/inquire-price": {
    "real": "HHDFC55010000"
  },
  "/overseas-futureoption/v1/quotations/stock-detail": {
    "real": "HHDFC55010100"
  },
  "/overseas-futureoption/v1/quotations/inquire-asking-price": {
    "real": "HHDFC86000000"
  },
  "/overseas-futureoption/v1/quotations/inquire-time-futurechartprice": {
    "real": "HHDFC55020400"
  },
  "/overseas-futureoption/v1/quotations/tick-ccnl": {
    "real": "HHDFC55020200"
  },
  "/overseas-futureoption/v1/quotations/weekly-ccnl": {
    "real": "HHDFC55020000"
  },
  "/overseas-futureoption/v1/quotations/daily-ccnl": {
    "real": "HHDFC55020100"
  },
  "/overseas-futureoption/v1/quotations/monthly-ccnl": {
    "real": "HHDFC55020300"
  },
  "/overseas-futureoption/v1/quotations/search-contract-detail": {
    "real": "HHDFC55200000"
  },
  "/overseas-futureoption/v1/quotations/investor-unpd-trend": {
    "real": "HHDDB95030000"
  },
  "/overseas-futureoption/v1/quotations/opt-price": {
    "real": "HHDFO55010000"
  },
  "/overseas-futureoption/v1/quotations/opt-detail": {
    "real": "HHDFO55010100"
  },
  "/overseas-futureoption/v1/quotations/opt-asking-price": {
    "real": "HHDFO86000000"
  },
  "/overseas-futureoption/v1/quotations/inquire-time-optchartprice": {
    "real": "HHDFO55020400"
  },
  "/overseas-futureoption/v1/quotations/opt-tick-ccnl": {
    "real": "HHDFO55020200"
  },
  "/overseas-futureoption/v1/quotations/opt-daily-ccnl": {
    "real": "HHDFO55020100"
  },
  "/overseas-futureoption/v1/quotations/opt-weekly-ccnl": {
    "real": "HHDFO55020000"
  },
  "/overseas-futureoption/v1/quotations/opt-monthly-ccnl": {
    "real": "HHDFO55020300"
  },
  "/overseas-futureoption/v1/quotations/search-opt-detail": {
    "real": "HHDFO55200000"
  },
  "/overseas-futureoption/v1/quotations/market-time": {
    "real": "OTFM2229R"
  },
  "/tryitout/HDFFF020": {
    "real": "HDFFF020"
  },
  "/tryitout/HDFFF010": {
    "real": "HDFFF010"
  },
  "/tryitout/HDFFF1C0": {
    "real": "HDFFF1C0"
  },
  "/tryitout/HDFFF2C0": {
    "real": "HDFFF2C0"
  },
  "/domestic-bond/v1/trading/buy": {
    "real": "TTTC0952U"
  },
  "/domestic-bond/v1/trading/sell": {
    "real": "TTTC0958U"
  },
  "/domestic-bond/v1/trading/order-rvsecncl": {
    "real": "TTTC0953U"
  },
  "/domestic-bond/v1/trading/inquire-psbl-rvsecncl": {
    "real": "CTSC8035R"
  },
  "/domestic-bond/v1/trading/inquire-daily-ccld": {
    "real": "CTSC8013R"
  },
  "/domestic-bond/v1/trading/inquire-balance": {
    "real": "CTSC8407R"
  },
  "/domestic-bond/v1/trading/inquire-psbl-order": {
    "real": "TTTC8910R"
  },
  "/domestic-bond/v1/quotations/inquire-asking-price": {
    "real": "FHKBJ773401C0"
  },
  "/domestic-bond/v1/quotations/inquire-price": {
    "real": "FHKBJ773400C0"
  },
  "/domestic-bond/v1/quotations/inquire-ccnl": {
    "real": "FHKBJ773403C0"
  },
  "/domestic-bond/v1/quotations/inquire-daily-price": {
    "real": "FHKBJ773404C0"
  },
  "/domestic-bond/v1/quotations/inquire-daily-itemchartprice": {
    "real": "FHKBJ773701C0"
  },
  "/domestic-bond/v1/quotations/avg-unit": {
    "real": "CTPF2005R"
  },
  "/domestic-bond/v1/quotations/issue-info": {
    "real": "CTPF1101R"
  },
  "/domestic-bond/v1/quotations/search-bond-info": {
    "real": "CTPF1114R"
  },
  "/tryitout/H0BJCNT0": {
    "real": "H0BJCNT0"
  },
  "/tryitout/H0BJASP0": {
    "real": "H0BJCNT0"
  },
  "/tryitout/H0BICNT0": {
    "real": "H0BICNT0"
  }
};

// API 정보 테이블
export const API_INFO: Record<string, ApiInfo> = {
  "/domestic-stock/v1/trading/period-rights": {
    "name": "기간별계좌권리현황조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/inquire-account-balance": {
    "name": "투자계좌자산현황조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/pension/inquire-deposit": {
    "name": "퇴직연금 예수금조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/order-resv-rvsecncl": {
    "name": "주식예약주문정정취소",
    "category": "국내주식 주문/계좌",
    "method": "POST",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/inquire-credit-psamount": {
    "name": "신용매수가능조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/intgr-margin": {
    "name": "주식통합증거금 현황",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/pension/inquire-daily-ccld": {
    "name": "퇴직연금 미체결내역",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/inquire-period-trade-profit": {
    "name": "기간별매매손익현황조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/order-rvsecncl": {
    "name": "주식주문(정정취소)",
    "category": "국내주식 주문/계좌",
    "method": "POST",
    "supportsMock": true
  },
  "/domestic-stock/v1/trading/order-resv-ccnl": {
    "name": "주식예약주문조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/pension/inquire-psbl-order": {
    "name": "퇴직연금 매수가능조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/inquire-balance": {
    "name": "주식잔고조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/trading/pension/inquire-present-balance": {
    "name": "퇴직연금 체결기준잔고",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/inquire-psbl-order": {
    "name": "매수가능조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/trading/inquire-period-profit": {
    "name": "기간별손익일별합산조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/order-cash": {
    "name": "주식주문(현금)",
    "category": "국내주식 주문/계좌",
    "method": "POST",
    "supportsMock": true
  },
  "/domestic-stock/v1/trading/inquire-psbl-sell": {
    "name": "매도가능수량조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/inquire-daily-ccld": {
    "name": "주식일별주문체결조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/trading/inquire-psbl-rvsecncl": {
    "name": "주식정정취소가능주문조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/order-resv": {
    "name": "주식예약주문",
    "category": "국내주식 주문/계좌",
    "method": "POST",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/order-credit": {
    "name": "주식주문(신용)",
    "category": "국내주식 주문/계좌",
    "method": "POST",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/pension/inquire-balance": {
    "name": "퇴직연금 잔고조회",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/trading/inquire-balance-rlz-pl": {
    "name": "주식잔고조회_실현손익",
    "category": "국내주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-daily-price": {
    "name": "주식현재가 일자별",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/quotations/inquire-price": {
    "name": "주식현재가 시세",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/quotations/inquire-overtime-price": {
    "name": "국내주식 시간외현재가",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/etfetn/v1/quotations/inquire-component-stock-price": {
    "name": "ETF 구성종목시세",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-time-overtimeconclusion": {
    "name": "주식현재가 시간외시간별체결",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/etfetn/v1/quotations/nav-comparison-trend": {
    "name": "NAV 비교추이(종목)",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-daily-overtimeprice": {
    "name": "주식현재가 시간외일자별주가",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/quotations/inquire-overtime-asking-price": {
    "name": "국내주식 시간외호가",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-time-itemconclusion": {
    "name": "주식현재가 당일시간대별체결",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/quotations/inquire-price-2": {
    "name": "주식현재가 시세2",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-time-dailychartprice": {
    "name": "주식일별분봉조회",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-daily-itemchartprice": {
    "name": "국내주식기간별시세(일/주/월/년)",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/etfetn/v1/quotations/nav-comparison-daily-trend": {
    "name": "NAV 비교추이(일)",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn": {
    "name": "주식현재가 호가/예상체결",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/quotations/inquire-ccnl": {
    "name": "주식현재가 체결",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/quotations/inquire-member": {
    "name": "주식현재가 회원사",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/etfetn/v1/quotations/nav-comparison-time-trend": {
    "name": "NAV 비교추이(분)",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-investor": {
    "name": "주식현재가 투자자",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/etfetn/v1/quotations/inquire-price": {
    "name": "ETF/ETN 현재가",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/exp-closing-price": {
    "name": "국내주식 장마감 예상체결가",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-time-itemchartprice": {
    "name": "주식당일분봉조회",
    "category": "국내주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/quotations/inquire-elw-price": {
    "name": "ELW 현재가 시세",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": true
  },
  "/elw/v1/quotations/newly-listed": {
    "name": "ELW 신규상장종목",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/indicator-trend-daily": {
    "name": "ELW 투자지표추이(일별)",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/ranking/sensitivity": {
    "name": "ELW 민감도 순위",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/udrl-asset-price": {
    "name": "ELW 기초자산별 종목시세",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/cond-search": {
    "name": "ELW 종목검색",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/volatility-trend-minute": {
    "name": "ELW 변동성 추이(분별)",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/volatility-trend-ccnl": {
    "name": "ELW 변동성추이(체결)",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/ranking/quick-change": {
    "name": "ELW 당일급변종목",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/indicator-trend-minute": {
    "name": "ELW 투자지표추이(분별)",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/udrl-asset-list": {
    "name": "ELW 기초자산 목록조회",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/volatility-trend-daily": {
    "name": "ELW 변동성 추이(일별)",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/ranking/volume-rank": {
    "name": "ELW 거래량순위",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/ranking/indicator": {
    "name": "ELW 지표순위",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/indicator-trend-ccnl": {
    "name": "ELW 투자지표추이(체결)",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/ranking/updown-rate": {
    "name": "ELW 상승률순위",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/sensitivity-trend-daily": {
    "name": "ELW 민감도 추이(일별)",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/compare-stocks": {
    "name": "ELW 비교대상종목조회",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/expiration-stocks": {
    "name": "ELW 만기예정/만기종목",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/lp-trade-trend": {
    "name": "ELW LP매매추이",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/sensitivity-trend-ccnl": {
    "name": "ELW 민감도 추이(체결)",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/elw/v1/quotations/volatility-trend-tick": {
    "name": "ELW 변동성 추이(틱)",
    "category": "국내주식 ELW 시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/exp-index-trend": {
    "name": "국내주식 예상체결지수 추이",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-daily-indexchartprice": {
    "name": "국내주식업종기간별시세(일/주/월/년)",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-stock/v1/quotations/inquire-index-timeprice": {
    "name": "국내업종 시간별지수(분)",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-index-category-price": {
    "name": "국내업종 구분별전체시세",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-time-indexchartprice": {
    "name": "업종 분봉조회",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/chk-holiday": {
    "name": "국내휴장일조회",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/exp-total-index": {
    "name": "국내주식 예상체결 전체지수",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-index-price": {
    "name": "국내업종 현재지수",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/market-time": {
    "name": "국내선물 영업일조회",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-index-tickprice": {
    "name": "국내업종 시간별지수(초)",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-index-daily-price": {
    "name": "국내업종 일자별지수",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/comp-interest": {
    "name": "금리 종합(국내채권/금리)",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-vi-status": {
    "name": "변동성완화장치(VI) 현황",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/news-title": {
    "name": "종합 시황/공시(제목)",
    "category": "국내주식 업종/기타",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/search-info": {
    "name": "상품기본조회",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/list-info": {
    "name": "예탁원정보(상장정보일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/pub-offer": {
    "name": "예탁원정보(공모주청약일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/finance/financial-ratio": {
    "name": "국내주식 재무비율",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/cap-dcrs": {
    "name": "예탁원정보(자본감소일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/bonus-issue": {
    "name": "예탁원정보(무상증자일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/invest-opbysec": {
    "name": "국내주식 증권사별 투자의견",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/credit-by-company": {
    "name": "국내주식 당사 신용가능종목",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/purreq": {
    "name": "예탁원정보(주식매수청구일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/rev-split": {
    "name": "예탁원정보(액면교체일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/dividend": {
    "name": "예탁원정보(배당일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/invest-opinion": {
    "name": "국내주식 종목투자의견",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/finance/stability-ratio": {
    "name": "국내주식 안정성비율",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/finance/profit-ratio": {
    "name": "국내주식 수익성비율",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/forfeit": {
    "name": "예탁원정보(실권주일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/mand-deposit": {
    "name": "예탁원정보(의무예치일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/finance/income-statement": {
    "name": "국내주식 손익계산서",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/lendable-by-company": {
    "name": "당사 대주가능 종목",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/search-stock-info": {
    "name": "주식기본조회",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/paidin-capin": {
    "name": "예탁원정보(유상증자일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/sharehld-meet": {
    "name": "예탁원정보(주주총회일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/finance/growth-ratio": {
    "name": "국내주식 성장성비율",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/finance/balance-sheet": {
    "name": "국내주식 대차대조표",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ksdinfo/merger-split": {
    "name": "예탁원정보(합병/분할일정)",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/estimate-perform": {
    "name": "국내주식 종목추정실적",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/finance/other-major-ratios": {
    "name": "국내주식 기타주요비율",
    "category": "국내주식 종목정보",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/comp-program-trade-today": {
    "name": "프로그램매매 종합현황(시간)",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/daily-credit-balance": {
    "name": "국내주식 신용잔고 일별추이",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-investor-daily-by-market": {
    "name": "시장별 투자자매매동향(일별)",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/daily-short-sale": {
    "name": "국내주식 공매도 일별추이",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/investor-trade-by-stock-daily": {
    "name": "종목별 투자자매매동향(일별)",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/psearch-title": {
    "name": "종목조건검색 목록조회",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/capture-uplowprice": {
    "name": "국내주식 상하한가 포착",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/comp-program-trade-daily": {
    "name": "프로그램매매 종합현황(일별)",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/daily-loan-trans": {
    "name": "종목별 일별 대차거래추이",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/psearch-result": {
    "name": "종목조건검색조회",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/pbar-tratio": {
    "name": "국내주식 매물대/거래비중",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/foreign-institution-total": {
    "name": "국내기관_외국인 매매종목가집계",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/intstock-stocklist-by-group": {
    "name": "관심종목 그룹별 종목조회",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-member-daily": {
    "name": "주식현재가 회원사 종목매매동향",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/program-trade-by-stock-daily": {
    "name": "종목별 프로그램매매추이(일별)",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/intstock-grouplist": {
    "name": "관심종목 그룹조회",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/investor-trend-estimate": {
    "name": "종목별 외인기관 추정가집계",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-daily-trade-volume": {
    "name": "종목별일별매수매도체결량",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/tradprt-byamt": {
    "name": "국내주식 체결금액별 매매비중",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/investor-program-trade-today": {
    "name": "프로그램매매 투자자매매동향(당일)",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/mktfunds": {
    "name": "국내 증시자금 종합",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/exp-price-trend": {
    "name": "국내주식 예상체결가 추이",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/frgnmem-trade-trend": {
    "name": "회원사 실시간 매매동향(틱)",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/inquire-investor-time-by-market": {
    "name": "시장별 투자자매매동향(시세)",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/program-trade-by-stock": {
    "name": "종목별 프로그램매매추이(체결)",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/frgnmem-trade-estimate": {
    "name": "외국계 매매종목 가집계",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/overtime-exp-trans-fluct": {
    "name": "국내주식 시간외예상체결등락률",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/frgnmem-pchs-trend": {
    "name": "종목별 외국계 순매수추이",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/intstock-multprice": {
    "name": "관심종목(멀티종목) 시세조회",
    "category": "국내주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/exp-trans-updown": {
    "name": "국내주식 예상체결 상승/하락상위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/quote-balance": {
    "name": "국내주식 호가잔량 순위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/credit-balance": {
    "name": "국내주식 신용잔고 상위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/overtime-volume": {
    "name": "국내주식 시간외거래량순위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/dividend-rate": {
    "name": "국내주식 배당률 상위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/after-hour-balance": {
    "name": "국내주식 시간외잔량 순위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/short-sale": {
    "name": "국내주식 공매도 상위종목",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/disparity": {
    "name": "국내주식 이격도 순위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/hts-top-view": {
    "name": "HTS조회상위20종목",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/quotations/volume-rank": {
    "name": "거래량순위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/profit-asset-index": {
    "name": "국내주식 수익자산지표 순위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/near-new-highlow": {
    "name": "국내주식 신고/신저근접종목 상위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/prefer-disparate-ratio": {
    "name": "국내주식 우선주/괴리율 상위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/bulk-trans-num": {
    "name": "국내주식 대량체결건수 상위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/finance-ratio": {
    "name": "국내주식 재무비율 순위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/market-cap": {
    "name": "국내주식 시가총액 상위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/traded-by-company": {
    "name": "국내주식 당사매매종목 상위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/fluctuation": {
    "name": "국내주식 등락률 순위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/market-value": {
    "name": "국내주식 시장가치 순위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/top-interest-stock": {
    "name": "국내주식 관심종목등록 상위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/volume-power": {
    "name": "국내주식 체결강도 상위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-stock/v1/ranking/overtime-fluctuation": {
    "name": "국내주식 시간외등락율순위",
    "category": "국내주식 순위분석",
    "method": "GET",
    "supportsMock": false
  },
  "/tryitout/H0UPANC0": {
    "name": "국내지수 실시간예상체결",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0UNMKO0": {
    "name": "국내주식 장운영정보 (통합)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0NXMBC0": {
    "name": "국내주식 실시간회원사 (NXT)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0STCNI0": {
    "name": "국내주식 실시간체결통보",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": true
  },
  "/tryitout/H0STOAC0": {
    "name": "국내주식 시간외 실시간예상체결 (KRX)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0STOAA0": {
    "name": "국내주식 시간외 실시간호가 (KRX)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0UNPGM0": {
    "name": "국내주식 실시간프로그램매매 (통합)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0UNASP0": {
    "name": "국내주식 실시간호가 (통합)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0STPGM0": {
    "name": "국내주식 실시간프로그램매매 (KRX)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0STMKO0": {
    "name": "국내주식 장운영정보 (KRX)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0STCNT0": {
    "name": "국내주식 실시간체결가 (KRX)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": true
  },
  "/tryitout/H0UPPGM0": {
    "name": "국내지수 실시간프로그램매매",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0UNMBC0": {
    "name": "국내주식 실시간회원사 (통합)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0UPCNT0": {
    "name": "국내지수 실시간체결",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0STANC0": {
    "name": "국내주식 실시간예상체결 (KRX)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0EWASP0": {
    "name": "ELW 실시간호가",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0STASP0": {
    "name": "국내주식 실시간호가 (KRX)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": true
  },
  "/tryitout/H0UNCNT0": {
    "name": "국내주식 실시간체결가 (통합)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0NXASP0": {
    "name": "국내주식 실시간호가 (NXT)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0NXPGM0": {
    "name": "국내주식 실시간프로그램매매 (NXT)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0NXCNT0": {
    "name": "국내주식 실시간체결가 (NXT)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0EWCNT0": {
    "name": "ELW 실시간체결가",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0EWANC0": {
    "name": "ELW 실시간예상체결",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0NXANC0": {
    "name": "국내주식 실시간예상체결 (NXT)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0STMBC0": {
    "name": "국내주식 실시간회원사 (KRX)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0UNANC0": {
    "name": "국내주식 실시간예상체결 (통합)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0NXMKO0": {
    "name": "국내주식 장운영정보 (NXT)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0STNAV0": {
    "name": "국내ETF NAV추이",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0STOUP0": {
    "name": "국내주식 시간외 실시간체결가 (KRX)",
    "category": "국내주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/trading/ngt-margin-detail": {
    "name": "(야간)선물옵션 증거금 상세",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/trading/inquire-deposit": {
    "name": "선물옵션 총자산현황",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/trading/inquire-daily-amount-fee": {
    "name": "선물옵션기간약정수수료일별",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/trading/inquire-ngt-balance": {
    "name": "(야간)선물옵션 잔고현황",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/trading/inquire-balance": {
    "name": "선물옵션 잔고현황",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-futureoption/v1/trading/order": {
    "name": "선물옵션 주문",
    "category": "국내선물옵션 주문/계좌",
    "method": "POST",
    "supportsMock": true
  },
  "/domestic-futureoption/v1/trading/inquire-balance-valuation-pl": {
    "name": "선물옵션 잔고평가손익내역",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/trading/order-rvsecncl": {
    "name": "선물옵션 정정취소주문",
    "category": "국내선물옵션 주문/계좌",
    "method": "POST",
    "supportsMock": true
  },
  "/domestic-futureoption/v1/trading/inquire-ccnl": {
    "name": "선물옵션 주문체결내역조회",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-futureoption/v1/trading/inquire-ngt-ccnl": {
    "name": "(야간)선물옵션 주문체결 내역조회",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/trading/inquire-psbl-ngt-order": {
    "name": "(야간)선물옵션 주문가능 조회",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/trading/inquire-balance-settlement-pl": {
    "name": "선물옵션 잔고정산손익내역",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/trading/inquire-psbl-order": {
    "name": "선물옵션 주문가능",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-futureoption/v1/trading/inquire-ccnl-bstime": {
    "name": "선물옵션 기준일체결내역",
    "category": "국내선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/quotations/inquire-price": {
    "name": "선물옵션 시세",
    "category": "국내선물옵션 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-futureoption/v1/quotations/display-board-top": {
    "name": "국내선물 기초자산 시세",
    "category": "국내선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/quotations/exp-price-trend": {
    "name": "선물옵션 일중예상체결추이",
    "category": "국내선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/quotations/inquire-daily-fuopchartprice": {
    "name": "선물옵션기간별시세(일/주/월/년)",
    "category": "국내선물옵션 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-futureoption/v1/quotations/display-board-futures": {
    "name": "국내옵션전광판_선물",
    "category": "국내선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/quotations/inquire-time-fuopchartprice": {
    "name": "선물옵션 분봉조회",
    "category": "국내선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/quotations/display-board-option-list": {
    "name": "국내옵션전광판_옵션월물리스트",
    "category": "국내선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-futureoption/v1/quotations/inquire-asking-price": {
    "name": "선물옵션 시세호가",
    "category": "국내선물옵션 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/domestic-futureoption/v1/quotations/display-board-callput": {
    "name": "국내옵션전광판_콜풋",
    "category": "국내선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/tryitout/H0ZOASP0": {
    "name": "주식옵션 실시간호가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0IFCNI0": {
    "name": "선물옵션 실시간체결통보",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": true
  },
  "/tryitout/H0MFCNT0": {
    "name": "KRX야간선물 실시간종목체결",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0MFASP0": {
    "name": "KRX야간선물 실시간호가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0EUCNT0": {
    "name": "KRX야간옵션 실시간체결가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0EUANC0": {
    "name": "KRX야간옵션실시간예상체결",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0IFCNT0": {
    "name": "지수선물 실시간체결가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0ZFANC0": {
    "name": "주식선물 실시간예상체결",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0EUCNI0": {
    "name": "KRX야간옵션실시간체결통보",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0MFCNI0": {
    "name": "KRX야간선물 실시간체결통보",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0CFCNT0": {
    "name": "상품선물 실시간체결가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0IFASP0": {
    "name": "지수선물 실시간호가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0IOCNT0": {
    "name": "지수옵션  실시간체결가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0EUASP0": {
    "name": "KRX야간옵션 실시간호가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0CFASP0": {
    "name": "상품선물 실시간호가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0ZOANC0": {
    "name": "주식옵션 실시간예상체결",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0ZFASP0": {
    "name": "주식선물 실시간호가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0ZOCNT0": {
    "name": "주식옵션 실시간체결가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0IOASP0": {
    "name": "지수옵션 실시간호가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0ZFCNT0": {
    "name": "주식선물 실시간체결가",
    "category": "국내선물옵션 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/overseas-stock/v1/trading/inquire-balance": {
    "name": "해외주식 잔고",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": true
  },
  "/overseas-stock/v1/trading/inquire-present-balance": {
    "name": "해외주식 체결기준현재잔고",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": true
  },
  "/overseas-stock/v1/trading/inquire-algo-ccnl": {
    "name": "해외주식 지정가체결내역조회",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/trading/inquire-period-profit": {
    "name": "해외주식 기간손익",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/trading/inquire-psamount": {
    "name": "해외주식 매수가능금액조회",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": true
  },
  "/overseas-stock/v1/trading/order-rvsecncl": {
    "name": "해외주식 정정취소주문",
    "category": "해외주식 주문/계좌",
    "method": "POST",
    "supportsMock": true
  },
  "/overseas-stock/v1/trading/order-resv": {
    "name": "해외주식 예약주문접수",
    "category": "해외주식 주문/계좌",
    "method": "POST",
    "supportsMock": true
  },
  "/overseas-stock/v1/trading/inquire-nccs": {
    "name": "해외주식 미체결내역",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/trading/daytime-order-rvsecncl": {
    "name": "해외주식 미국주간정정취소",
    "category": "해외주식 주문/계좌",
    "method": "POST",
    "supportsMock": false
  },
  "/overseas-stock/v1/trading/inquire-ccnl": {
    "name": "해외주식 주문체결내역",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": true
  },
  "/overseas-stock/v1/trading/inquire-paymt-stdr-balance": {
    "name": "해외주식 결제기준잔고",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/trading/inquire-period-trans": {
    "name": "해외주식 일별거래내역",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/trading/daytime-order": {
    "name": "해외주식 미국주간주문",
    "category": "해외주식 주문/계좌",
    "method": "POST",
    "supportsMock": false
  },
  "/overseas-stock/v1/trading/order-resv-list": {
    "name": "해외주식 예약주문조회",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/trading/order": {
    "name": "해외주식 주문",
    "category": "해외주식 주문/계좌",
    "method": "POST",
    "supportsMock": true
  },
  "/overseas-stock/v1/trading/order-resv-ccnl": {
    "name": "해외주식 예약주문접수취소",
    "category": "해외주식 주문/계좌",
    "method": "POST",
    "supportsMock": true
  },
  "/overseas-stock/v1/trading/algo-ordno": {
    "name": "해외주식 지정가주문번호조회",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/trading/foreign-margin": {
    "name": "해외증거금 통화별조회",
    "category": "해외주식 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/inquire-ccnl": {
    "name": "해외주식 체결추이",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/dailyprice": {
    "name": "해외주식 기간별시세",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/overseas-stock/v1/quotations/countries-holiday": {
    "name": "해외결제일자조회",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/price": {
    "name": "해외주식 현재체결가",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/overseas-price/v1/quotations/inquire-search": {
    "name": "해외주식조건검색",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/overseas-price/v1/quotations/search-info": {
    "name": "해외주식 상품기본정보",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/inquire-time-indexchartprice": {
    "name": "해외지수분봉조회",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/inquire-time-itemchartprice": {
    "name": "해외주식분봉조회",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/price-detail": {
    "name": "해외주식 현재가상세",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/industry-price": {
    "name": "해외주식 업종별코드조회",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/inquire-daily-chartprice": {
    "name": "해외주식 종목/지수/환율기간별시세(일/주/월/년)",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": true
  },
  "/overseas-price/v1/quotations/industry-theme": {
    "name": "해외주식 업종별시세",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/inquire-asking-price": {
    "name": "해외주식 현재가 1호가",
    "category": "해외주식 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/ranking/trade-growth": {
    "name": "해외주식 거래증가율순위",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/period-rights": {
    "name": "해외주식 기간별권리조회",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/ranking/price-fluct": {
    "name": "해외주식 가격급등락",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/ranking/trade-pbmn": {
    "name": "해외주식 거래대금순위",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/ranking/volume-surge": {
    "name": "해외주식 거래량급증",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/ranking/new-highlow": {
    "name": "해외주식 신고/신저가",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/ranking/volume-power": {
    "name": "해외주식 매수체결강도상위",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/ranking/trade-turnover": {
    "name": "해외주식 거래회전율순위",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/news-title": {
    "name": "해외뉴스종합(제목)",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/colable-by-company": {
    "name": "당사 해외주식담보대출 가능 종목",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/ranking/market-cap": {
    "name": "해외주식 시가총액순위",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/brknews-title": {
    "name": "해외속보(제목)",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/ranking/updown-rate": {
    "name": "해외주식 상승율/하락율",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-price/v1/quotations/rights-by-ice": {
    "name": "해외주식 권리종합",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-stock/v1/ranking/trade-vol": {
    "name": "해외주식 거래량순위",
    "category": "해외주식 시세분석",
    "method": "GET",
    "supportsMock": false
  },
  "/tryitout/HDFSASP0": {
    "name": "해외주식 실시간호가",
    "category": "해외주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/HDFSASP1": {
    "name": "해외주식 지연호가(아시아)",
    "category": "해외주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/HDFSCNT0": {
    "name": "해외주식 실시간지연체결가",
    "category": "해외주식 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0GSCNI0": {
    "name": "해외주식 실시간체결통보",
    "category": "해외주식 실시간시세",
    "method": "POST",
    "supportsMock": true
  },
  "/overseas-futureoption/v1/trading/order": {
    "name": "해외선물옵션 주문",
    "category": "해외선물옵션 주문/계좌",
    "method": "POST",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/trading/order-rvsecncl": {
    "name": "해외선물옵션 정정취소주문",
    "category": "해외선물옵션 주문/계좌",
    "method": "POST",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/trading/inquire-ccld": {
    "name": "해외선물옵션 당일주문내역조회",
    "category": "해외선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/trading/inquire-unpd": {
    "name": "해외선물옵션 미결제내역조회(잔고)",
    "category": "해외선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/trading/inquire-psamount": {
    "name": "해외선물옵션 주문가능조회",
    "category": "해외선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/trading/inquire-period-ccld": {
    "name": "해외선물옵션 기간계좌손익 일별",
    "category": "해외선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/trading/inquire-daily-ccld": {
    "name": "해외선물옵션 일별 체결내역",
    "category": "해외선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/trading/inquire-deposit": {
    "name": "해외선물옵션 예수금현황",
    "category": "해외선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/trading/inquire-daily-order": {
    "name": "해외선물옵션 일별 주문내역",
    "category": "해외선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/trading/inquire-period-trans": {
    "name": "해외선물옵션 기간계좌거래내역",
    "category": "해외선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/trading/margin-detail": {
    "name": "해외선물옵션 증거금상세",
    "category": "해외선물옵션 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/inquire-price": {
    "name": "해외선물종목현재가",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/stock-detail": {
    "name": "해외선물종목상세",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/inquire-asking-price": {
    "name": "해외선물 호가",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/inquire-time-futurechartprice": {
    "name": "해외선물 분봉조회",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/tick-ccnl": {
    "name": "해외선물 체결추이(틱)",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/weekly-ccnl": {
    "name": "해외선물 체결추이(주간)",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/daily-ccnl": {
    "name": "해외선물 체결추이(일간)",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/monthly-ccnl": {
    "name": "해외선물 체결추이(월간)",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/search-contract-detail": {
    "name": "해외선물 상품기본정보",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/investor-unpd-trend": {
    "name": "해외선물 미결제추이",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/opt-price": {
    "name": "해외옵션종목현재가",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/opt-detail": {
    "name": "해외옵션종목상세",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/opt-asking-price": {
    "name": "해외옵션 호가",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/inquire-time-optchartprice": {
    "name": "해외옵션 분봉조회",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/opt-tick-ccnl": {
    "name": "해외옵션 체결추이(틱)",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/opt-daily-ccnl": {
    "name": "해외옵션 체결추이(일간)",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/opt-weekly-ccnl": {
    "name": "해외옵션 체결추이(주간)",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/opt-monthly-ccnl": {
    "name": "해외옵션 체결추이(월간)",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/search-opt-detail": {
    "name": "해외옵션 상품기본정보",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/overseas-futureoption/v1/quotations/market-time": {
    "name": "해외선물옵션 장운영시간",
    "category": "해외선물옵션 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/tryitout/HDFFF020": {
    "name": "해외선물옵션 실시간체결가",
    "category": "해외선물옵션실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/HDFFF010": {
    "name": "해외선물옵션 실시간호가",
    "category": "해외선물옵션실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/HDFFF1C0": {
    "name": "해외선물옵션 실시간주문내역통보",
    "category": "해외선물옵션실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/HDFFF2C0": {
    "name": "해외선물옵션 실시간체결내역통보",
    "category": "해외선물옵션실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/domestic-bond/v1/trading/buy": {
    "name": "장내채권 매수주문",
    "category": "장내채권 주문/계좌",
    "method": "POST",
    "supportsMock": false
  },
  "/domestic-bond/v1/trading/sell": {
    "name": "장내채권 매도주문",
    "category": "장내채권 주문/계좌",
    "method": "POST",
    "supportsMock": false
  },
  "/domestic-bond/v1/trading/order-rvsecncl": {
    "name": "장내채권 정정취소주문",
    "category": "장내채권 주문/계좌",
    "method": "POST",
    "supportsMock": false
  },
  "/domestic-bond/v1/trading/inquire-psbl-rvsecncl": {
    "name": "채권정정취소가능주문조회",
    "category": "장내채권 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/trading/inquire-daily-ccld": {
    "name": "장내채권 주문체결내역",
    "category": "장내채권 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/trading/inquire-balance": {
    "name": "장내채권 잔고조회",
    "category": "장내채권 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/trading/inquire-psbl-order": {
    "name": "장내채권 매수가능조회",
    "category": "장내채권 주문/계좌",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/quotations/inquire-asking-price": {
    "name": "장내채권현재가(호가)",
    "category": "장내채권 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/quotations/inquire-price": {
    "name": "장내채권현재가(시세)",
    "category": "장내채권 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/quotations/inquire-ccnl": {
    "name": "장내채권현재가(체결)",
    "category": "장내채권 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/quotations/inquire-daily-price": {
    "name": "장내채권현재가(일별)",
    "category": "장내채권 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/quotations/inquire-daily-itemchartprice": {
    "name": "장내채권 기간별시세(일)",
    "category": "장내채권 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/quotations/avg-unit": {
    "name": "장내채권 평균단가조회",
    "category": "장내채권 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/quotations/issue-info": {
    "name": "장내채권 발행정보",
    "category": "장내채권 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/domestic-bond/v1/quotations/search-bond-info": {
    "name": "장내채권 기본조회",
    "category": "장내채권 기본시세",
    "method": "GET",
    "supportsMock": false
  },
  "/tryitout/H0BJCNT0": {
    "name": "일반채권 실시간체결가",
    "category": "장내채권 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0BJASP0": {
    "name": "일반채권 실시간호가",
    "category": "장내채권 실시간시세",
    "method": "POST",
    "supportsMock": false
  },
  "/tryitout/H0BICNT0": {
    "name": "채권지수 실시간체결가",
    "category": "장내채권 실시간시세",
    "method": "POST",
    "supportsMock": false
  }
};

// 카테고리별 API 목록
export const API_CATEGORIES: Record<string, string[]> = {
  "국내주식 주문/계좌": [
    "/domestic-stock/v1/trading/period-rights",
    "/domestic-stock/v1/trading/inquire-account-balance",
    "/domestic-stock/v1/trading/pension/inquire-deposit",
    "/domestic-stock/v1/trading/order-resv-rvsecncl",
    "/domestic-stock/v1/trading/inquire-credit-psamount",
    "/domestic-stock/v1/trading/intgr-margin",
    "/domestic-stock/v1/trading/pension/inquire-daily-ccld",
    "/domestic-stock/v1/trading/inquire-period-trade-profit",
    "/domestic-stock/v1/trading/order-rvsecncl",
    "/domestic-stock/v1/trading/order-resv-ccnl",
    "/domestic-stock/v1/trading/pension/inquire-psbl-order",
    "/domestic-stock/v1/trading/inquire-balance",
    "/domestic-stock/v1/trading/pension/inquire-present-balance",
    "/domestic-stock/v1/trading/inquire-psbl-order",
    "/domestic-stock/v1/trading/inquire-period-profit",
    "/domestic-stock/v1/trading/order-cash",
    "/domestic-stock/v1/trading/inquire-psbl-sell",
    "/domestic-stock/v1/trading/inquire-daily-ccld",
    "/domestic-stock/v1/trading/inquire-psbl-rvsecncl",
    "/domestic-stock/v1/trading/order-resv",
    "/domestic-stock/v1/trading/order-credit",
    "/domestic-stock/v1/trading/pension/inquire-balance",
    "/domestic-stock/v1/trading/inquire-balance-rlz-pl"
  ],
  "국내주식 기본시세": [
    "/domestic-stock/v1/quotations/inquire-daily-price",
    "/domestic-stock/v1/quotations/inquire-price",
    "/domestic-stock/v1/quotations/inquire-overtime-price",
    "/etfetn/v1/quotations/inquire-component-stock-price",
    "/domestic-stock/v1/quotations/inquire-time-overtimeconclusion",
    "/etfetn/v1/quotations/nav-comparison-trend",
    "/domestic-stock/v1/quotations/inquire-daily-overtimeprice",
    "/domestic-stock/v1/quotations/inquire-overtime-asking-price",
    "/domestic-stock/v1/quotations/inquire-time-itemconclusion",
    "/domestic-stock/v1/quotations/inquire-price-2",
    "/domestic-stock/v1/quotations/inquire-time-dailychartprice",
    "/domestic-stock/v1/quotations/inquire-daily-itemchartprice",
    "/etfetn/v1/quotations/nav-comparison-daily-trend",
    "/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn",
    "/domestic-stock/v1/quotations/inquire-ccnl",
    "/domestic-stock/v1/quotations/inquire-member",
    "/etfetn/v1/quotations/nav-comparison-time-trend",
    "/domestic-stock/v1/quotations/inquire-investor",
    "/etfetn/v1/quotations/inquire-price",
    "/domestic-stock/v1/quotations/exp-closing-price",
    "/domestic-stock/v1/quotations/inquire-time-itemchartprice"
  ],
  "국내주식 ELW 시세": [
    "/domestic-stock/v1/quotations/inquire-elw-price",
    "/elw/v1/quotations/newly-listed",
    "/elw/v1/quotations/indicator-trend-daily",
    "/elw/v1/ranking/sensitivity",
    "/elw/v1/quotations/udrl-asset-price",
    "/elw/v1/quotations/cond-search",
    "/elw/v1/quotations/volatility-trend-minute",
    "/elw/v1/quotations/volatility-trend-ccnl",
    "/elw/v1/ranking/quick-change",
    "/elw/v1/quotations/indicator-trend-minute",
    "/elw/v1/quotations/udrl-asset-list",
    "/elw/v1/quotations/volatility-trend-daily",
    "/elw/v1/ranking/volume-rank",
    "/elw/v1/ranking/indicator",
    "/elw/v1/quotations/indicator-trend-ccnl",
    "/elw/v1/ranking/updown-rate",
    "/elw/v1/quotations/sensitivity-trend-daily",
    "/elw/v1/quotations/compare-stocks",
    "/elw/v1/quotations/expiration-stocks",
    "/elw/v1/quotations/lp-trade-trend",
    "/elw/v1/quotations/sensitivity-trend-ccnl",
    "/elw/v1/quotations/volatility-trend-tick"
  ],
  "국내주식 업종/기타": [
    "/domestic-stock/v1/quotations/exp-index-trend",
    "/domestic-stock/v1/quotations/inquire-daily-indexchartprice",
    "/domestic-stock/v1/quotations/inquire-index-timeprice",
    "/domestic-stock/v1/quotations/inquire-index-category-price",
    "/domestic-stock/v1/quotations/inquire-time-indexchartprice",
    "/domestic-stock/v1/quotations/chk-holiday",
    "/domestic-stock/v1/quotations/exp-total-index",
    "/domestic-stock/v1/quotations/inquire-index-price",
    "/domestic-stock/v1/quotations/market-time",
    "/domestic-stock/v1/quotations/inquire-index-tickprice",
    "/domestic-stock/v1/quotations/inquire-index-daily-price",
    "/domestic-stock/v1/quotations/comp-interest",
    "/domestic-stock/v1/quotations/inquire-vi-status",
    "/domestic-stock/v1/quotations/news-title"
  ],
  "국내주식 종목정보": [
    "/domestic-stock/v1/quotations/search-info",
    "/domestic-stock/v1/ksdinfo/list-info",
    "/domestic-stock/v1/ksdinfo/pub-offer",
    "/domestic-stock/v1/finance/financial-ratio",
    "/domestic-stock/v1/ksdinfo/cap-dcrs",
    "/domestic-stock/v1/ksdinfo/bonus-issue",
    "/domestic-stock/v1/quotations/invest-opbysec",
    "/domestic-stock/v1/quotations/credit-by-company",
    "/domestic-stock/v1/ksdinfo/purreq",
    "/domestic-stock/v1/ksdinfo/rev-split",
    "/domestic-stock/v1/ksdinfo/dividend",
    "/domestic-stock/v1/quotations/invest-opinion",
    "/domestic-stock/v1/finance/stability-ratio",
    "/domestic-stock/v1/finance/profit-ratio",
    "/domestic-stock/v1/ksdinfo/forfeit",
    "/domestic-stock/v1/ksdinfo/mand-deposit",
    "/domestic-stock/v1/finance/income-statement",
    "/domestic-stock/v1/quotations/lendable-by-company",
    "/domestic-stock/v1/quotations/search-stock-info",
    "/domestic-stock/v1/ksdinfo/paidin-capin",
    "/domestic-stock/v1/ksdinfo/sharehld-meet",
    "/domestic-stock/v1/finance/growth-ratio",
    "/domestic-stock/v1/finance/balance-sheet",
    "/domestic-stock/v1/ksdinfo/merger-split",
    "/domestic-stock/v1/quotations/estimate-perform",
    "/domestic-stock/v1/finance/other-major-ratios"
  ],
  "국내주식 시세분석": [
    "/domestic-stock/v1/quotations/comp-program-trade-today",
    "/domestic-stock/v1/quotations/daily-credit-balance",
    "/domestic-stock/v1/quotations/inquire-investor-daily-by-market",
    "/domestic-stock/v1/quotations/daily-short-sale",
    "/domestic-stock/v1/quotations/investor-trade-by-stock-daily",
    "/domestic-stock/v1/quotations/psearch-title",
    "/domestic-stock/v1/quotations/capture-uplowprice",
    "/domestic-stock/v1/quotations/comp-program-trade-daily",
    "/domestic-stock/v1/quotations/daily-loan-trans",
    "/domestic-stock/v1/quotations/psearch-result",
    "/domestic-stock/v1/quotations/pbar-tratio",
    "/domestic-stock/v1/quotations/foreign-institution-total",
    "/domestic-stock/v1/quotations/intstock-stocklist-by-group",
    "/domestic-stock/v1/quotations/inquire-member-daily",
    "/domestic-stock/v1/quotations/program-trade-by-stock-daily",
    "/domestic-stock/v1/quotations/intstock-grouplist",
    "/domestic-stock/v1/quotations/investor-trend-estimate",
    "/domestic-stock/v1/quotations/inquire-daily-trade-volume",
    "/domestic-stock/v1/quotations/tradprt-byamt",
    "/domestic-stock/v1/quotations/investor-program-trade-today",
    "/domestic-stock/v1/quotations/mktfunds",
    "/domestic-stock/v1/quotations/exp-price-trend",
    "/domestic-stock/v1/quotations/frgnmem-trade-trend",
    "/domestic-stock/v1/quotations/inquire-investor-time-by-market",
    "/domestic-stock/v1/quotations/program-trade-by-stock",
    "/domestic-stock/v1/quotations/frgnmem-trade-estimate",
    "/domestic-stock/v1/ranking/overtime-exp-trans-fluct",
    "/domestic-stock/v1/quotations/frgnmem-pchs-trend",
    "/domestic-stock/v1/quotations/intstock-multprice"
  ],
  "국내주식 순위분석": [
    "/domestic-stock/v1/ranking/exp-trans-updown",
    "/domestic-stock/v1/ranking/quote-balance",
    "/domestic-stock/v1/ranking/credit-balance",
    "/domestic-stock/v1/ranking/overtime-volume",
    "/domestic-stock/v1/ranking/dividend-rate",
    "/domestic-stock/v1/ranking/after-hour-balance",
    "/domestic-stock/v1/ranking/short-sale",
    "/domestic-stock/v1/ranking/disparity",
    "/domestic-stock/v1/ranking/hts-top-view",
    "/domestic-stock/v1/quotations/volume-rank",
    "/domestic-stock/v1/ranking/profit-asset-index",
    "/domestic-stock/v1/ranking/near-new-highlow",
    "/domestic-stock/v1/ranking/prefer-disparate-ratio",
    "/domestic-stock/v1/ranking/bulk-trans-num",
    "/domestic-stock/v1/ranking/finance-ratio",
    "/domestic-stock/v1/ranking/market-cap",
    "/domestic-stock/v1/ranking/traded-by-company",
    "/domestic-stock/v1/ranking/fluctuation",
    "/domestic-stock/v1/ranking/market-value",
    "/domestic-stock/v1/ranking/top-interest-stock",
    "/domestic-stock/v1/ranking/volume-power",
    "/domestic-stock/v1/ranking/overtime-fluctuation"
  ],
  "국내주식 실시간시세": [
    "/tryitout/H0UPANC0",
    "/tryitout/H0UNMKO0",
    "/tryitout/H0NXMBC0",
    "/tryitout/H0STCNI0",
    "/tryitout/H0STOAC0",
    "/tryitout/H0STOAA0",
    "/tryitout/H0UNPGM0",
    "/tryitout/H0UNASP0",
    "/tryitout/H0STPGM0",
    "/tryitout/H0STMKO0",
    "/tryitout/H0STCNT0",
    "/tryitout/H0UPPGM0",
    "/tryitout/H0UNMBC0",
    "/tryitout/H0UPCNT0",
    "/tryitout/H0STANC0",
    "/tryitout/H0EWASP0",
    "/tryitout/H0STASP0",
    "/tryitout/H0UNCNT0",
    "/tryitout/H0NXASP0",
    "/tryitout/H0NXPGM0",
    "/tryitout/H0NXCNT0",
    "/tryitout/H0EWCNT0",
    "/tryitout/H0EWANC0",
    "/tryitout/H0NXANC0",
    "/tryitout/H0STMBC0",
    "/tryitout/H0UNANC0",
    "/tryitout/H0NXMKO0",
    "/tryitout/H0STNAV0",
    "/tryitout/H0STOUP0"
  ],
  "국내선물옵션 주문/계좌": [
    "/domestic-futureoption/v1/trading/ngt-margin-detail",
    "/domestic-futureoption/v1/trading/inquire-deposit",
    "/domestic-futureoption/v1/trading/inquire-daily-amount-fee",
    "/domestic-futureoption/v1/trading/inquire-ngt-balance",
    "/domestic-futureoption/v1/trading/inquire-balance",
    "/domestic-futureoption/v1/trading/order",
    "/domestic-futureoption/v1/trading/inquire-balance-valuation-pl",
    "/domestic-futureoption/v1/trading/order-rvsecncl",
    "/domestic-futureoption/v1/trading/inquire-ccnl",
    "/domestic-futureoption/v1/trading/inquire-ngt-ccnl",
    "/domestic-futureoption/v1/trading/inquire-psbl-ngt-order",
    "/domestic-futureoption/v1/trading/inquire-balance-settlement-pl",
    "/domestic-futureoption/v1/trading/inquire-psbl-order",
    "/domestic-futureoption/v1/trading/inquire-ccnl-bstime"
  ],
  "국내선물옵션 기본시세": [
    "/domestic-futureoption/v1/quotations/inquire-price",
    "/domestic-futureoption/v1/quotations/display-board-top",
    "/domestic-futureoption/v1/quotations/exp-price-trend",
    "/domestic-futureoption/v1/quotations/inquire-daily-fuopchartprice",
    "/domestic-futureoption/v1/quotations/display-board-futures",
    "/domestic-futureoption/v1/quotations/inquire-time-fuopchartprice",
    "/domestic-futureoption/v1/quotations/display-board-option-list",
    "/domestic-futureoption/v1/quotations/inquire-asking-price",
    "/domestic-futureoption/v1/quotations/display-board-callput"
  ],
  "국내선물옵션 실시간시세": [
    "/tryitout/H0ZOASP0",
    "/tryitout/H0IFCNI0",
    "/tryitout/H0MFCNT0",
    "/tryitout/H0MFASP0",
    "/tryitout/H0EUCNT0",
    "/tryitout/H0EUANC0",
    "/tryitout/H0IFCNT0",
    "/tryitout/H0ZFANC0",
    "/tryitout/H0EUCNI0",
    "/tryitout/H0MFCNI0",
    "/tryitout/H0CFCNT0",
    "/tryitout/H0IFASP0",
    "/tryitout/H0IOCNT0",
    "/tryitout/H0EUASP0",
    "/tryitout/H0CFASP0",
    "/tryitout/H0ZOANC0",
    "/tryitout/H0ZFASP0",
    "/tryitout/H0ZOCNT0",
    "/tryitout/H0IOASP0",
    "/tryitout/H0ZFCNT0"
  ],
  "해외주식 주문/계좌": [
    "/overseas-stock/v1/trading/inquire-balance",
    "/overseas-stock/v1/trading/inquire-present-balance",
    "/overseas-stock/v1/trading/inquire-algo-ccnl",
    "/overseas-stock/v1/trading/inquire-period-profit",
    "/overseas-stock/v1/trading/inquire-psamount",
    "/overseas-stock/v1/trading/order-rvsecncl",
    "/overseas-stock/v1/trading/order-resv",
    "/overseas-stock/v1/trading/inquire-nccs",
    "/overseas-stock/v1/trading/daytime-order-rvsecncl",
    "/overseas-stock/v1/trading/inquire-ccnl",
    "/overseas-stock/v1/trading/inquire-paymt-stdr-balance",
    "/overseas-stock/v1/trading/inquire-period-trans",
    "/overseas-stock/v1/trading/daytime-order",
    "/overseas-stock/v1/trading/order-resv-list",
    "/overseas-stock/v1/trading/order",
    "/overseas-stock/v1/trading/order-resv-ccnl",
    "/overseas-stock/v1/trading/algo-ordno",
    "/overseas-stock/v1/trading/foreign-margin"
  ],
  "해외주식 기본시세": [
    "/overseas-price/v1/quotations/inquire-ccnl",
    "/overseas-price/v1/quotations/dailyprice",
    "/overseas-stock/v1/quotations/countries-holiday",
    "/overseas-price/v1/quotations/price",
    "/overseas-price/v1/quotations/inquire-search",
    "/overseas-price/v1/quotations/search-info",
    "/overseas-price/v1/quotations/inquire-time-indexchartprice",
    "/overseas-price/v1/quotations/inquire-time-itemchartprice",
    "/overseas-price/v1/quotations/price-detail",
    "/overseas-price/v1/quotations/industry-price",
    "/overseas-price/v1/quotations/inquire-daily-chartprice",
    "/overseas-price/v1/quotations/industry-theme",
    "/overseas-price/v1/quotations/inquire-asking-price"
  ],
  "해외주식 시세분석": [
    "/overseas-stock/v1/ranking/trade-growth",
    "/overseas-price/v1/quotations/period-rights",
    "/overseas-stock/v1/ranking/price-fluct",
    "/overseas-stock/v1/ranking/trade-pbmn",
    "/overseas-stock/v1/ranking/volume-surge",
    "/overseas-stock/v1/ranking/new-highlow",
    "/overseas-stock/v1/ranking/volume-power",
    "/overseas-stock/v1/ranking/trade-turnover",
    "/overseas-price/v1/quotations/news-title",
    "/overseas-price/v1/quotations/colable-by-company",
    "/overseas-stock/v1/ranking/market-cap",
    "/overseas-price/v1/quotations/brknews-title",
    "/overseas-stock/v1/ranking/updown-rate",
    "/overseas-price/v1/quotations/rights-by-ice",
    "/overseas-stock/v1/ranking/trade-vol"
  ],
  "해외주식 실시간시세": [
    "/tryitout/HDFSASP0",
    "/tryitout/HDFSASP1",
    "/tryitout/HDFSCNT0",
    "/tryitout/H0GSCNI0"
  ],
  "해외선물옵션 주문/계좌": [
    "/overseas-futureoption/v1/trading/order",
    "/overseas-futureoption/v1/trading/order-rvsecncl",
    "/overseas-futureoption/v1/trading/inquire-ccld",
    "/overseas-futureoption/v1/trading/inquire-unpd",
    "/overseas-futureoption/v1/trading/inquire-psamount",
    "/overseas-futureoption/v1/trading/inquire-period-ccld",
    "/overseas-futureoption/v1/trading/inquire-daily-ccld",
    "/overseas-futureoption/v1/trading/inquire-deposit",
    "/overseas-futureoption/v1/trading/inquire-daily-order",
    "/overseas-futureoption/v1/trading/inquire-period-trans",
    "/overseas-futureoption/v1/trading/margin-detail"
  ],
  "해외선물옵션 기본시세": [
    "/overseas-futureoption/v1/quotations/inquire-price",
    "/overseas-futureoption/v1/quotations/stock-detail",
    "/overseas-futureoption/v1/quotations/inquire-asking-price",
    "/overseas-futureoption/v1/quotations/inquire-time-futurechartprice",
    "/overseas-futureoption/v1/quotations/tick-ccnl",
    "/overseas-futureoption/v1/quotations/weekly-ccnl",
    "/overseas-futureoption/v1/quotations/daily-ccnl",
    "/overseas-futureoption/v1/quotations/monthly-ccnl",
    "/overseas-futureoption/v1/quotations/search-contract-detail",
    "/overseas-futureoption/v1/quotations/investor-unpd-trend",
    "/overseas-futureoption/v1/quotations/opt-price",
    "/overseas-futureoption/v1/quotations/opt-detail",
    "/overseas-futureoption/v1/quotations/opt-asking-price",
    "/overseas-futureoption/v1/quotations/inquire-time-optchartprice",
    "/overseas-futureoption/v1/quotations/opt-tick-ccnl",
    "/overseas-futureoption/v1/quotations/opt-daily-ccnl",
    "/overseas-futureoption/v1/quotations/opt-weekly-ccnl",
    "/overseas-futureoption/v1/quotations/opt-monthly-ccnl",
    "/overseas-futureoption/v1/quotations/search-opt-detail",
    "/overseas-futureoption/v1/quotations/market-time"
  ],
  "해외선물옵션실시간시세": [
    "/tryitout/HDFFF020",
    "/tryitout/HDFFF010",
    "/tryitout/HDFFF1C0",
    "/tryitout/HDFFF2C0"
  ],
  "장내채권 주문/계좌": [
    "/domestic-bond/v1/trading/buy",
    "/domestic-bond/v1/trading/sell",
    "/domestic-bond/v1/trading/order-rvsecncl",
    "/domestic-bond/v1/trading/inquire-psbl-rvsecncl",
    "/domestic-bond/v1/trading/inquire-daily-ccld",
    "/domestic-bond/v1/trading/inquire-balance",
    "/domestic-bond/v1/trading/inquire-psbl-order"
  ],
  "장내채권 기본시세": [
    "/domestic-bond/v1/quotations/inquire-asking-price",
    "/domestic-bond/v1/quotations/inquire-price",
    "/domestic-bond/v1/quotations/inquire-ccnl",
    "/domestic-bond/v1/quotations/inquire-daily-price",
    "/domestic-bond/v1/quotations/inquire-daily-itemchartprice",
    "/domestic-bond/v1/quotations/avg-unit",
    "/domestic-bond/v1/quotations/issue-info",
    "/domestic-bond/v1/quotations/search-bond-info"
  ],
  "장내채권 실시간시세": [
    "/tryitout/H0BJCNT0",
    "/tryitout/H0BJASP0",
    "/tryitout/H0BICNT0"
  ]
};

/**
 * URL에 따라 TR_ID를 반환하는 함수
 */
export function getTrId(url: string, environment: 'real' | 'mock' = 'real'): string | undefined {
  const mapping = TR_ID_MAPPINGS[url];
  if (!mapping) {
    return undefined;
  }

  return environment === 'mock' ? mapping.mock : mapping.real;
}

/**
 * API 정보를 반환하는 함수
 */
export function getApiInfo(url: string): ApiInfo | undefined {
  return API_INFO[url];
}

/**
 * 모의투자 지원 여부를 확인하는 함수
 */
export function supportsMockTrading(url: string): boolean {
  const info = API_INFO[url];
  return info ? info.supportsMock : false;
}

/**
 * 카테고리별 API 목록을 반환하는 함수
 */
export function getApisByCategory(category: string): string[] {
  return API_CATEGORIES[category] || [];
}

/**
 * 모든 카테고리 목록을 반환하는 함수
 */
export function getAllCategories(): string[] {
  return Object.keys(API_CATEGORIES);
}

// 통계 정보
export const STATISTICS = {
  totalApis: 335,
  realTradingSupported: 332,
  mockTradingSupported: 43,
  categories: 21
};
