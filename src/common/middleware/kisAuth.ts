import type { Request, Response, NextFunction } from "express";
import { logger } from "@/server";

/**
 * Extended Request interface with KIS Bearer token
 */
export interface KisAuthenticatedRequest extends Request {
  kisToken?: string;
}

/**
 * Simple Bearer token authentication middleware for Swagger UI
 * Users provide their KIS access token via Authorization header
 */
export const kisAuthMiddleware = (
  req: KisAuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: "Authentication required",
      message: "Please provide your Korea Investment Securities access token in Authorization header",
      format: "Authorization: Bearer <your_kis_access_token>",
    });
    return;
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  if (!token) {
    res.status(401).json({
      error: "Invalid token",
      message: "Access token is required",
    });
    return;
  }

  // Attach token to request for use in controllers
  req.kisToken = token;
  
  logger.debug("KIS access token provided via Authorization header");
  next();
};