import { tagTypes } from "../tag-type";
import baseApi from "./baseApi";

export const profileAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMYProfile: build.query({
      query: () => {
        return {
          url: "/profile/",
          method: "GET",
        };
      },
      providesTags: [tagTypes.myProfile],
    }),
    updateMYProfile: build.mutation({
      query: (data) => {
        return {
          url: "/profile/",
          method: "PUT",
          data,
        };
      },
      invalidatesTags: [tagTypes.myProfile, tagTypes.user],
    }),
  }),
});

export const { useGetMYProfileQuery, useUpdateMYProfileMutation } = profileAPi;
