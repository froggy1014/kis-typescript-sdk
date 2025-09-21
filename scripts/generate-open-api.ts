/**
 * Script to generate OpenAPI JSON file
 * Run with: npx tsx scripts/generate-open-api.mjs
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { generateOpenAPIDocument } from "@/api-docs/openAPIDocumentGenerator";

// Generate the OpenAPI document
const openAPIDocument = generateOpenAPIDocument();

// Define output path
const outputPath = path.join(process.cwd(), "openapi.json");

// Write to file
fs.writeFileSync(outputPath, JSON.stringify(openAPIDocument, null, 2));

console.log(`✅ OpenAPI document generated successfully at: ${outputPath}`);
console.log(`📄 Total endpoints: ${Object.keys(openAPIDocument.paths || {}).length}`);

// Print endpoint summary
if (openAPIDocument.paths) {
  console.log("\n📋 Endpoints:");
  Object.entries(openAPIDocument.paths).forEach(([path, methods]) => {
    Object.keys(methods).forEach((method) => {
      console.log(`  ${method.toUpperCase().padEnd(7)} ${path}`);
    });
  });
}
