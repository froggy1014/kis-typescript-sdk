import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { domesticQuotationsRouter } from "@/api/domestic-stock/quotationsRouter";
import { oauthRouter } from "@/api/oauth/oauthRouter";
import { generateOpenAPIDocument } from "@/api-docs/openAPIDocumentGenerator";
import { openAPIRouter } from "@/api-docs/openAPIRouter";

const app: Express = express();

// Basic middleware
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable for Swagger UI
  }),
);
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

// Export OpenAPI spec at /swagger.json
app.get("/swagger.json", (_req, res) => {
  const openAPIDocument = generateOpenAPIDocument();
  res.json(openAPIDocument);
});

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

export default app;
