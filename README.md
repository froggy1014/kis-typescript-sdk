# KIS TypeScript SDK

[![npm version](https://badge.fury.io/js/kis-typescript-sdk.svg)](https://badge.fury.io/js/kis-typescript-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

한국투자증권 OpenAPI를 위한 TypeScript SDK입니다. 완전한 타입 안전성과 OpenAPI 문서를 제공합니다.

## 주요 기능

### 🔑 OAuth 인증

- 접근토큰 발급/폐기
- Hashkey 생성
- 웹소켓 접속키 발급

### 📈 국내주식 시세 조회

- **주식현재가 시세** - 가장 많이 사용하는 기본 시세 API
- **호가/예상체결** - 매수/매도 호가 정보
- **일별/주별/월별 시세** - 기간별 차트 데이터
- **분봉 차트** - 당일 및 기간별 분봉 데이터
- **체결 내역** - 실시간 체결 정보
- **투자자/회원사 동향** - 기관/외국인 매매 정보
- **시간외 거래** - 장외 시간 시세 정보
- **ETF/ETN 시세** - ETF 구성종목 및 NAV 정보

### 🛠️ 개발자 도구

- **완전한 TypeScript 지원** - 모든 API 응답에 대한 타입 정의
- **OpenAPI 문서** - Swagger UI로 API 테스트 가능
- **자동 TR_ID 매핑** - CSV 파일 기반 TR_ID 자동 관리
- **Express 서버** - 즉시 사용 가능한 API 서버

## 설치

```bash
npm install kis-typescript-sdk
```

## 빠른 시작

### 1. 기본 사용법

```typescript
import { app } from "kis-typescript-sdk";

// 서버 시작
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다`);
  console.log(`API 문서: http://localhost:${PORT}/swagger`);
});
```

### 2. API 문서 확인

서버 실행 후 브라우저에서 `http://localhost:8080/swagger`에 접속하면 완전한 API 문서를 확인할 수 있습니다.

### 3. 주요 API 엔드포인트

#### OAuth 인증

```bash
# 접근토큰 발급
POST /oauth2/tokenP

# Hashkey 생성
POST /uapi/hashkey

# 웹소켓 접속키 발급
POST /oauth2/Approval
```

#### 국내주식 시세

```bash
# 주식현재가 (가장 기본적인 API)
GET /uapi/domestic-stock/v1/quotations/inquire-price?FID_INPUT_ISCD=005930

# 호가/예상체결
GET /uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn?FID_INPUT_ISCD=005930

# 일별시세
GET /uapi/domestic-stock/v1/quotations/inquire-daily-price?FID_INPUT_ISCD=005930

# 체결내역
GET /uapi/domestic-stock/v1/quotations/inquire-ccnl?FID_INPUT_ISCD=005930
```

### 4. 헤더 설정

모든 API 호출 시 다음 헤더가 필요합니다:

```typescript
const headers = {
  authorization: "Bearer YOUR_ACCESS_TOKEN",
  appkey: "YOUR_APP_KEY",
  appsecret: "YOUR_APP_SECRET",
  tr_id: "FHKST01010100", // API별 고유 TR_ID
  custtype: "P", // P: 개인, B: 법인
};
```

## 프로젝트 구조

```
src/
├── api/
│   ├── oauth/              # OAuth 인증 API
│   └── domestic-stock/     # 국내주식 시세 API
├── api-docs/              # OpenAPI 문서 생성
└── utils/                 # TR_ID 매핑 유틸리티
```

## 개발자 가이드

### CSV 기반 TR_ID 관리

프로젝트는 `kis-api-table.csv` 파일을 기반으로 TR_ID를 자동 관리합니다:

```bash
# TR_ID 매핑 파일 생성
npm run generate:tr-mappings
```

### OpenAPI 문서 생성

```bash
# OpenAPI spec 생성
npm run generate:openapi

# 전체 생성 (추천)
npm run generate
```

### 빌드 및 실행

```bash
# 개발 모드
npm run start:dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start:prod
```

## 기여하기

1. 이 저장소를 Fork 합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 지원

- 📧 이슈: [GitHub Issues](https://github.com/froggy1014/kis-typescript-sdk/issues)
- 🏛️ 공식 API: [한국투자증권 OpenAPI](https://apiportal.koreainvestment.com)
