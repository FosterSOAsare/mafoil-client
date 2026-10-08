import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAuthorizationHeader } from "@/utils/cookie";

// Base URL of the API server, e.g. http://localhost:8000 (without /api)
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

// Shared RTK Query base query: calls `${API_URL}/api${path}` directly and attaches the auth header
const createBaseQuery = (path: string) =>
	fetchBaseQuery({
		baseUrl: `${API_URL}/api${path}`,
		prepareHeaders: (headers) => {
			return createAuthorizationHeader(headers);
		},
	});

export default createBaseQuery;
