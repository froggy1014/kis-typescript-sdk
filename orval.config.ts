import { defineConfig } from "orval";
import path from "path";
import { generateSingleApiIndex } from "./scripts/generate-single-api.ts";

export default defineConfig({
  kisApi: {
    output: {
      // 태그별로 분리
      mode: "tags-split",
      // 생성될 파일 이름 규칙
      namingConvention: "PascalCase",
      // 생성될 파일 경로
      target: "./package/api",
      // 생성될 모델 경로
      schemas: "./package/model",
      // 사용할 HTTP 클라이언트
      httpClient: "axios",
      // 코드 생성전에 기존 파일들 정리
      clean: true,
      override: {
        // Request를 실행할 Client 경로 및 이름
        mutator: {
          path: "./package/mutator/kis-instance.ts",
          name: "kisInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: () => {
        const apiDir = path.resolve(__dirname, "./package/api");
        generateSingleApiIndex(apiDir);
      },
    },
    input: {
      target: "./openapi.json",
    },
  },
  kisApiZod: {
    input: {
      target: "./openapi.json",
    },
    output: {
      mode: "tags-split",
      client: "zod",
      target: "package/gen/endpoints",
      fileExtension: ".zod.ts",
    },
    hooks: {
      afterAllFilesWrite: () => {
        const apiDir = path.resolve(__dirname, "./package/gen/endpoints");
        generateSingleApiIndex(apiDir);
      },
    },
  },
});
