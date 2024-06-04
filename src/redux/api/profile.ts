import { tagTypes } from "../tag-type";
import baseApi from "./baseApi";

export const profileAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query({
      query: (id) => {
        return {
          url: `/profile/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),
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

export const {
  useGetUserProfileQuery,
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} = profileAPi;
