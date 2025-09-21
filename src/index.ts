import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { domesticQuotationsRouter } from "@/api/domestic-stock/quotationsRouter";
import { oauthRouter } from "@/api/oauth/oauthRouter";

const app: Express = express();

// Basic middleware
app.use(cors());
app.use(helmet({
	contentSecurityPolicy: false, // Disable for Swagger UI
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
	res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// API routes
app.use("/oauth2", oauthRouter);
app.use("/uapi/domestic-stock", domesticQuotationsRouter);

// Swagger documentation
app.use("/swagger", openAPIRouter);

// Root redirect to Swagger
app.get("/", (_req, res) => {
	res.redirect("/swagger");
});

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
	console.error(err.stack);
	res.status(500).json({
		error: "Internal Server Error",
		message: err.message,
	});
});

// Start server
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

const server = app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
	console.log(`📚 Swagger documentation available at http://localhost:${PORT}/swagger`);
	console.log(`🔧 Health check available at http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
	console.log("SIGTERM signal received: closing HTTP server");
	server.close(() => {
		console.log("HTTP server closed");
		process.exit(0);
	});
});

process.on("SIGINT", () => {
	console.log("\nSIGINT signal received: closing HTTP server");
	server.close(() => {
		console.log("HTTP server closed");
		process.exit(0);
	});
});

export { app };