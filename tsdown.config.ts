import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: "package/index.ts",
		outDir: "dist",
		format: ["esm", "cjs"],
		dts: true,
		clean: true,
		minify: true,
		platform: "neutral",
		exports: true,
	},
	{
		entry: "src/index.ts",
		outDir: "build",
		format: ["esm", "cjs"],
		dts: true,
		clean: true,
		minify: true,
		platform: "node",
		exports: true,
	},
]);
