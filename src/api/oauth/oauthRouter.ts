import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

// Extend Zod with OpenAPI
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export const oauthRegistry = new OpenAPIRegistry();
export const oauthRouter: Router = express.Router();

// 1. Hashkey 생성
oauthRegistry.registerPath({
  method: "post",
  path: "/uapi/hashkey",
  tags: ["OAuth 인증"],
  summary: "Hashkey 생성",
  description: "API 호출 시 필요한 hashkey를 생성합니다",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            datas: z.record(z.string()).describe("해시키 생성을 위한 데이터"),
          }),
        },
      },
    },
    headers: z.object({
      appkey: z.string().describe("앱키"),
      appsecret: z.string().describe("앱시크릿"),
    }),
  },
  responses: createApiResponse(z.object({
    HASH: z.string().describe("생성된 해시키"),
  }), "해시키 생성 성공"),
});

// 2. 접근토큰 발급
oauthRegistry.registerPath({
  method: "post", 
  path: "/oauth2/tokenP",
  tags: ["OAuth 인증"],
  summary: "접근토큰 발급(P)",
  description: "한국투자증권 API 접근을 위한 토큰을 발급받습니다",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            grant_type: z.string().default("client_credentials").describe("권한 부여 타입"),
            appkey: z.string().describe("앱키"),
            appsecret: z.string().describe("앱시크릿"),
          }),
        },
      },
    },
  },
  responses: createApiResponse(z.object({
    access_token: z.string().describe("액세스 토큰"),
    access_token_token_expired: z.string().describe("토큰 만료 시각"),
    token_type: z.string().describe("토큰 타입"),
    expires_in: z.number().describe("토큰 유효시간(초)"),
  }), "토큰 발급 성공"),
});

// 3. 접근토큰 폐기  
oauthRegistry.registerPath({
  method: "post",
  path: "/oauth2/revokeP", 
  tags: ["OAuth 인증"],
  summary: "접근토큰 폐기(P)",
  description: "발급받은 접근토큰을 폐기합니다",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            appkey: z.string().describe("앱키"),
            appsecret: z.string().describe("앱시크릿"),
            token: z.string().describe("폐기할 토큰"),
          }),
        },
      },
    },
  },
  responses: createApiResponse(z.object({
    code: z.string().describe("응답 코드"),
    message: z.string().describe("응답 메시지"),
  }), "토큰 폐기 성공"),
});

// 4. 웹소켓 접속키 발급
oauthRegistry.registerPath({
  method: "post",
  path: "/oauth2/Approval",
  tags: ["OAuth 인증"],
  summary: "실시간 (웹소켓) 접속키 발급",
  description: "웹소켓 실시간 시세를 위한 접속키를 발급받습니다",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            grant_type: z.string().default("client_credentials").describe("권한 부여 타입"),
            appkey: z.string().describe("앱키"),
            secretkey: z.string().describe("앱시크릿"),
          }),
        },
      },
    },
  },
  responses: createApiResponse(z.object({
    approval_key: z.string().describe("웹소켓 접속 승인키"),
  }), "웹소켓 접속키 발급 성공"),
});