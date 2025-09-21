import { OpenAPIRegistry, OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { domesticQuotationsRegistry } from "../api/domestic-stock/quotationsRouter";
import { oauthRegistry } from "../api/oauth/oauthRouter";

export function generateOpenAPIDocument(): any {
	// Create main registry and merge all registries
	const registry = new OpenAPIRegistry();

	// Merge all registries
	const registries = [
		domesticQuotationsRegistry,
		oauthRegistry,
	];

	registries.forEach((subRegistry) => {
		// @ts-ignore - accessing private property for merging
		if (subRegistry._definitions) {
			// @ts-ignore
			registry._definitions = [...registry._definitions, ...subRegistry._definitions];
		}
	});

	// Generate OpenAPI document
	const generator = new OpenApiGeneratorV31(registry.definitions);

	const document = generator.generateDocument({
		openapi: "3.1.0",
		info: {
			title: "Korea Investment API",
			version: "1.0.0",
			description: "한국투자증권 OpenAPI TypeScript Implementation",
		},
		servers: [
			{
				url: "http://localhost:8080",
				description: "Development server",
			},
			{
				url: "https://openapi.koreainvestment.com:9443",
				description: "Production server",
			},
			{
				url: "https://openapivts.koreainvestment.com:29443",
				description: "Virtual trading server",
			},
		],
		tags: [
			{
				name: "oauth",
				description: "OAuth 2.0 Authentication APIs",
			},
			{
				name: "domestic-stock-quotations",
				description: "Domestic Stock Quotation APIs",
			},
		],
	});

	// Add security schemes after generating the document
	document.components = {
		...document.components,
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				description: "한국투자증권 OAuth 2.0 접근토큰",
			},
		},
	};

	return document;
}