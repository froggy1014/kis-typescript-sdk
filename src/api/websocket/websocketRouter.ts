import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

// WebSocket 승인키 발급
const WebSocketApprovalRequestSchema = z.object({
	grant_type: z.string().openapi({ example: "client_credentials" }).describe("권한부여타입"),
	appkey: z.string().openapi({ example: "PA12345678901234567890" }).describe("앱키"),
	secretkey: z.string().openapi({ example: "SecretKey1234567890" }).describe("시크릿키"),
});

const WebSocketApprovalResponseSchema = z.object({
	approval_key: z.string().openapi({ example: "a2585daf-8c09-4587-9fce-8ab893d8e8f2b4d7c2e1f0a9" }).describe("웹소켓 접속키"),
});

export const websocketRegistry = new OpenAPIRegistry();

websocketRegistry.register("WebSocketApprovalRequest", WebSocketApprovalRequestSchema);
websocketRegistry.register("WebSocketApprovalResponse", WebSocketApprovalResponseSchema);

export const websocketRouter: Router = (() => {
	const router = express.Router();
	
	// WebSocket 승인키 발급
	router.post("/oauth2/Approval", async (req, res) => {
		res.status(200).json({
			approval_key: "a2585daf-8c09-4587-9fce-8ab893d8e8f2b4d7c2e1f0a9b8c7d6e5f4g3h2i1j0k9l8m7n6o5p4q3r2s1t0u9v8w7x6y5z4",
		});
	});

	return router;
})();