import { tagTypes } from "../tag-type";
import baseApi from "./baseApi";

export const tripsAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTrips: build.query({
      query: (args) => {
        return {
          url: "/trips/",
          method: "GET",
          params: args,
        };
      },
      providesTags: [tagTypes.trips],
    }),
    getAllMyTrips: build.query({
      query: ({ userId, args }) => {
        return {
          url: `/trips/user/${userId}`,
          method: "GET",
          params: args,
        };
      },
      providesTags: [tagTypes.myTrips],
    }),
    getTripDetails: build.query({
      query: (id) => {
        return {
          url: `/trips/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.trips],
    }),
    createTrip: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/trips/",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.myTrips, tagTypes.trips],
    }),
    updateTrip: build.mutation({
      query: (data) => {
        return {
          url: `/trips/${data.id}`,
          method: "PUT",
          data: data.data,
        };
      },
      invalidatesTags: [tagTypes.myTrips, tagTypes.trips],
    }),
    deleteTrip: build.mutation({
      query: (data) => {
        return {
          url: `/trips/${data.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.myTrips, tagTypes.trips],
    }),
  }),
});

export const {
  useCreateTripMutation,
  useDeleteTripMutation,
  useUpdateTripMutation,
  useGetAllMyTripsQuery,
  useGetAllTripsQuery,
  useGetTripDetailsQuery,
} = tripsAPi;