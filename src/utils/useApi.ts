"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UseApiOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  type?: "mount" | "manual";
  slug?: string | number;
  autoFetch?: boolean;
  params?: Record<string, any>;
  requiresAuth?: boolean;
}

export default function useApi(options: UseApiOptions) {
  const {
    url,
    method = "GET",
    type = "manual",
    slug,
    autoFetch = true,
    params = {},
    requiresAuth = true,
  } = options;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState(params);

  // 🔹 Build query string
  const buildQuery = (obj: Record<string, any>) => {
    const query = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "")
        query.append(key, String(value));
    });
    return query.toString() ? `?${query.toString()}` : "";
  };

  // 🔹 Build final URL
  const buildUrl = () => {
    const query = buildQuery(queryParams);
    const finalSlug = slug ? `/${slug}` : "";
    return `${baseUrl}${url}${finalSlug}${query}`;
  };

  // 🔹 Get token (if required)
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || sessionStorage.getItem("token") || "";
    }
    return "";
  };

  // 🔹 Main request function
  const request = async (customMethod: string, payload?: any) => {
    setLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = {};
      const token = getToken();

      // ✅ Only add Authorization header (Content-Type depends on payload)
      if (requiresAuth && token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      let body: BodyInit | undefined;

      // ✅ Detect FormData automatically
      if (payload instanceof FormData) {
        body = payload;
        // DO NOT set Content-Type manually — browser sets it automatically
      } else if (customMethod !== "GET" && payload) {
        body = JSON.stringify(payload);
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(buildUrl(), {
        method: customMethod,
        headers,
        body,
      });

      const json = await res.json();

      if (res.status === 401 || res.status === 403) {
        setError("Session expired. Redirecting to login...");
        localStorage.removeItem("token");
        setTimeout(() => router.push("/admin/login"), 1500);
        return;
      }

      if (!res.ok) {
        setError(json.message || "Request failed");
      } else {
        setData(json.data || json);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchApi = async () => request(method);

  const sendData = async (
    payload: any,
    callback?: (data: any) => void,
    customMethod: "POST" | "PUT" | "PATCH" = "POST"
  ) => {
    await request(customMethod, payload);
    if (typeof callback === "function") callback(data);
  };

  const updateParams = (newParams: Record<string, any>) => {
    setQueryParams((prev) => ({ ...prev, ...newParams }));
  };

  useEffect(() => {
    if (type === "mount" && autoFetch) {
      fetchApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queryParams)]);

  return {
    loading,
    data,
    error,
    fetchApi,
    sendData,
    updateParams,
    queryParams,
  };
}
