import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { oauthRouter } from "@/api/oauth/oauthRouter";
import { domesticQuotationsRouter } from "@/api/domestic-stock/quotationsRouter";
import { domesticTradingRouter } from "@/api/domestic-stock/tradingRouter";
import { domesticElwRouter } from "@/api/domestic-stock/elwRouter";
import { domesticSectorRouter } from "@/api/domestic-stock/sectorRouter";
import { domesticStockInfoRouter } from "@/api/domestic-stock/stockInfoRouter";
import { marketAnalysisRouter } from "@/api/domestic-stock/marketAnalysisRouter";
import { websocketRouter } from "@/api/websocket/websocketRouter";
import { futuresOptionsRouter } from "@/api/futures-options/futuresOptionsRouter";
import { openAPIRouter } from "@/api-docs/openAPIRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Korea Investment Securities API Routes
app.use("/", oauthRouter); // OAuth 인증
app.use("/", domesticQuotationsRouter); // 국내주식 기본시세
app.use("/", domesticTradingRouter); // 국내주식 주문/계좌
app.use("/", domesticElwRouter); // 국내주식 ELW 시세
app.use("/", domesticSectorRouter); // 국내주식 업종/기타
app.use("/", domesticStockInfoRouter); // 국내주식 종목정보
app.use("/", marketAnalysisRouter); // 국내주식 시장분석
app.use("/", websocketRouter); // WebSocket 실시간시세
app.use("/", futuresOptionsRouter); // 국내선물옵션

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
