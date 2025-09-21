import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export function createDirectApiResponse<T extends z.ZodTypeAny>(
	registry: OpenAPIRegistry,
	schemaName: string,
	schema: T,
	description: string,
) {
	const registeredSchema = registry.register(schemaName, schema);

	return {
		200: {
			description,
			content: {
				"application/json": {
					schema: registeredSchema,
				},
			},
		},
	};
}

export function createApiResponse<T extends z.ZodTypeAny>(
	registry: OpenAPIRegistry,
	schemaName: string,
	schema: T,
	description: string,
) {
	return createDirectApiResponse(registry, schemaName, schema, description);
}