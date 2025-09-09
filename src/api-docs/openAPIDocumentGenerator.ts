import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { oauthRegistry } from "@/api/oauth/oauthRouter";
import { domesticQuotationsRegistry } from "@/api/domestic-stock/quotationsRouter";
import { domesticTradingRegistry } from "@/api/domestic-stock/tradingRouter";

export type OpenAPIDocument = ReturnType<OpenApiGeneratorV3["generateDocument"]>;

export function generateOpenAPIDocument(): OpenAPIDocument {
	const registry = new OpenAPIRegistry([oauthRegistry, domesticQuotationsRegistry, domesticTradingRegistry]);
	
	// Register Bearer authentication security scheme
	registry.registerComponent("securitySchemes", "bearerAuth", {
		type: "http",
		scheme: "bearer",
		description: "Korea Investment Securities access token을 입력하세요",
	});

	const generator = new OpenApiGeneratorV3(registry.definitions);

	return generator.generateDocument({
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "Korea Investment Securities API",
			description: `한국투자증권 API를 위한 TypeScript REST API 명세서

## 🚀 서버 환경

### 실전 도메인
- **REST API**: https://openapi.koreainvestment.com:9443
- **WebSocket**: ws://ops.koreainvestment.com:21000

### 모의투자 도메인  
- **REST API**: https://openapivts.koreainvestment.com:29443
- **WebSocket**: ws://ops.koreainvestment.com:31000

## 🔑 인증 방법

1. **앱키/시크릿 발급**: [KIS 개발자센터](https://apiportal.koreainvestment.com)에서 발급
2. **토큰 발급**: \`POST /oauth2/tokenP\` 호출하여 access_token 획득
3. **API 호출**: Authorization 헤더에 \`Bearer {access_token}\` 설정

## 📋 TR_ID 구분

- **실전**: TTTC0012U (매수), TTTC0011U (매도)
- **모의**: VTTC0012U (매수), VTTC0011U (매도)`,
		},
		servers: [
			{
				url: "https://openapi.koreainvestment.com:9443",
				description: "실전 서버 (Production)",
			},
			{
				url: "https://openapivts.koreainvestment.com:29443", 
				description: "모의투자 서버 (Virtual Trading)",
			},
		],
		security: [
			{
				bearerAuth: [],
			},
		],
		externalDocs: {
			description: "View the raw OpenAPI Specification in JSON format",
			url: "/swagger.json",
		},
	});
}
