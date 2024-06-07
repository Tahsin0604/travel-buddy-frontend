import { tagTypes } from "../tag-type";
import baseApi from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTrips: build.query({
      query: (args) => {
        return {
          url: "/admin/trips",
          method: "GET",
          params: args,
        };
      },
      transformResponse: (data, meta) => {
        return {
          trips: data,
          meta: meta,
        };
      },
      providesTags: [tagTypes.trips],
    }),

    getAllUsers: build.query({
      query: (args) => {
        return {
          url: "/admin/users",
          method: "GET",
          params: args,
        };
      },
      transformResponse: (data, meta) => {
        return {
          users: data,
          meta: meta,
        };
      },
      providesTags: [tagTypes.myTrips],
    }),
  }),
});

export const { useGetAllTripsQuery, useGetAllUsersQuery } = adminApi;
