import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { StatusCodes } from "http-status-codes";
import type { z } from "zod";

import { ServiceResponseSchema } from "@/common/models/serviceResponse";

export function createApiResponse(schema: z.ZodTypeAny, description: string, statusCode = StatusCodes.OK) {
	return {
		[statusCode]: {
			description,
			content: {
				"application/json": {
					schema: ServiceResponseSchema(schema),
				},
			},
		},
	};
}

export function createDirectApiResponse(
	registry: OpenAPIRegistry,
	schemaName: string,
	responseSchema: z.ZodTypeAny,
	description: string,
	statusCode = StatusCodes.OK,
) {
	// Register the direct response schema without ServiceResponse wrapper
	const namedSchema = registry.register(schemaName, responseSchema);

	return {
		[statusCode]: {
			description,
			content: {
				"application/json": {
					schema: namedSchema,
				},
			},
		},
	};
}

// Use if you want multiple responses for a single endpoint

// import { ResponseConfig } from '@asteasolutions/zod-to-openapi';
// import { ApiResponseConfig } from '@common/models/openAPIResponseConfig';
// export type ApiResponseConfig = {
//   schema: z.ZodTypeAny;
//   description: string;
//   statusCode: StatusCodes;
// };
// export function createApiResponses(configs: ApiResponseConfig[]) {
//   const responses: { [key: string]: ResponseConfig } = {};
//   configs.forEach(({ schema, description, statusCode }) => {
//     responses[statusCode] = {
//       description,
//       content: {
//         'application/json': {
//           schema: ServiceResponseSchema(schema),
//         },
//       },
//     };
//   });
//   return responses;
// }
