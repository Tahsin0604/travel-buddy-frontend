import { TMeta } from "@/types";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?: TMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": "application/json" || contentType,
        },
      });
      return result;
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: error,
      };
    }
  };
export default axiosBaseQuery;
