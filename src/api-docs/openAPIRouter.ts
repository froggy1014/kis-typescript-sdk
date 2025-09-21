import express, { type Router } from "express";
import swaggerUi from "swagger-ui-express";
import { generateOpenAPIDocument } from "./openAPIDocumentGenerator";

export const openAPIRouter: Router = express.Router();

// Generate OpenAPI document
const openAPIDocument = generateOpenAPIDocument();

// Serve Swagger UI
openAPIRouter.use("/", swaggerUi.serve);
openAPIRouter.get("/", swaggerUi.setup(openAPIDocument));

// Serve OpenAPI JSON
openAPIRouter.get("/openapi.json", (_req, res) => {
	res.json(openAPIDocument);
});
