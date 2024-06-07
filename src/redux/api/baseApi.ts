import axiosBaseQuery from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-type";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://travel-buddy-ecru.vercel.app/api",
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});

export default baseApi;
