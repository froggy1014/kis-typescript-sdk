import { OpenAPIRegistry, OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { domesticQuotationsRegistry } from "../api/domestic-stock/quotationsRouter";
import { oauthRegistry } from "../api/oauth/oauthRouter";

export function generateOpenAPIDocument(): Record<string, any> {
  // Create main registry and merge all registries
  const registry = new OpenAPIRegistry();

  // Merge all registries
  const registries = [domesticQuotationsRegistry, oauthRegistry];

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
      description: `
[OpenAPI json 링크](https://comforting-meringue-518bd8.netlify.app/swagger.json)\n
[API 문서 링크](https://api.koreainvestment.com/openapi/docs)

## 🔐 인증 방법
1. **상단의 "Authorize" 버튼을 클릭**하여 API 키들을 입력하세요
2. 필요한 헤더 정보:
   - **appkey**: 한국투자증권에서 발급받은 앱키
   - **appsecret**: 한국투자증권에서 발급받은 앱시크릿
   - **tr_id**: API별 고유 거래ID (각 API 문서 참조)
   - **custtype**: 고객타입 (P: 개인, B: 법인)

## 🚀 사용 방법
- OAuth API는 appkey, appsecret만 필요
- 시세 조회 API는 모든 헤더 정보 필요
- WebSocket 연결 시에는 별도 접속키 발급 필요
			`,
    },
    servers: [
      {
        url: "https://comforting-meringue-518bd8.netlify.app",
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

  // Add global security requirements for Swagger UI authorization
  document.security = [
    {
      KoreaInvestmentAuth: [],
      KoreaInvestmentSecret: [],
      TransactionId: [],
      CustomerType: [],
    },
  ];

  // Add security schemes after generating the document
  document.components = {
    ...document.components,
    securitySchemes: {
      KoreaInvestmentAuth: {
        type: "apiKey",
        in: "header",
        name: "appkey",
        description: "🔑 한국투자증권에서 발급받은 앱키 (App Key) - 모든 API에서 필수",
      },
      KoreaInvestmentSecret: {
        type: "apiKey",
        in: "header",
        name: "appsecret",
        description: "🔐 한국투자증권에서 발급받은 앱시크릿 (App Secret) - 모든 API에서 필수",
      },
      TransactionId: {
        type: "apiKey",
        in: "header",
        name: "tr_id",
        description: "📋 거래ID (Transaction ID) - API별로 고유한 값 (예: FHKST01010100)",
      },
      CustomerType: {
        type: "apiKey",
        in: "header",
        name: "custtype",
        description: "👤 고객타입 (Customer Type) - P: 개인, B: 법인 (기본값: P)",
      },
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "한국투자증권 OAuth 2.0 접근토큰",
      },
    },
  };

  // Post-process to convert query parameters to object-style parameters
  postProcessQueryParameters(document);

  return document;
}

/**
 * Post-processes the OpenAPI document to convert individual query parameters
 * to object-style parameters with deepObject style
 */
function postProcessQueryParameters(document: any): void {
  if (!document.paths) return;

  for (const pathKey in document.paths) {
    const path = document.paths[pathKey];
    for (const method in path) {
      const operation = path[method];
      if (!operation.parameters) continue;

      // Group query parameters that belong to the same schema
      const queryParams = operation.parameters.filter((p: any) => p.in === "query");
      if (queryParams.length <= 1) continue;

      // Find potential request schema names from the components.schemas
      const potentialSchemas = Object.keys(document.components?.schemas || {}).filter((name) =>
        name.endsWith("Request"),
      );

      // Try to find a matching schema based on the query parameter names
      let matchingSchema: string | null = null;
      for (const schemaName of potentialSchemas) {
        const schema = document.components.schemas[schemaName];
        if (schema?.type === "object" && schema.properties) {
          const schemaProps = Object.keys(schema.properties);
          const queryParamNames = queryParams.map((p: any) => p.name);

          // Check if all query parameter names match schema properties
          if (
            queryParamNames.every((name: string) => schemaProps.includes(name)) &&
            schemaProps.every((prop: string) => queryParamNames.includes(prop))
          ) {
            matchingSchema = schemaName;
            break;
          }
        }
      }

      if (!matchingSchema) continue;

      // Replace individual query parameters with a single object parameter
      operation.parameters = operation.parameters.filter((p: any) => p.in !== "query");
      operation.parameters.push({
        name: matchingSchema.toLowerCase(),
        in: "query",
        style: "deepObject",
        explode: true,
        schema: {
          $ref: `#/components/schemas/${matchingSchema}`,
        },
        description: `${matchingSchema} object parameter`,
        required: true,
      });
    }
  }
}
