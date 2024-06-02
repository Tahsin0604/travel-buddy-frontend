import axiosBaseQuery from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-type";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});

export default baseApi;
