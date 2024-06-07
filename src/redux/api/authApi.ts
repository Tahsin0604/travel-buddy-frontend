import { tagTypes } from "../tag-type";
import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        contentType: "application/json",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useChangePasswordMutation } = authApi;
