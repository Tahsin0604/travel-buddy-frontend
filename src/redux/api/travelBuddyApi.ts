import { tagTypes } from "../tag-type";
import baseApi from "./baseApi";

export const travelBuddyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendBuddyRequest: build.mutation({
      query: ({ tripId, data }) => {
       
        return {
          url: `/trip/${tripId}/request`,
          method: "POST",
          data: data,
        };
      },

      invalidatesTags: [tagTypes.tripBuddy],
    }),

    getAllBuddyForATrips: build.query({
      query: ({ tripId, args }) => {
        return {
          url: `/travel-buddies/${tripId}`,
          method: "GET",
          params: args,
        };
      },
      transformResponse: (data: Record<string, any>[], meta) => {
        return {
          buddy: data,
          meta: meta,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.buddy.map(({ id }) => ({
                type: tagTypes.tripBuddy as const,
                id,
              })),
              tagTypes.tripBuddy,
            ]
          : [tagTypes.tripBuddy],
    }),

    getAllTripRequest: build.query({
      query: (args) => {
        return {
          url: `/travel-buddies/request`,
          method: "GET",
          params: args,
        };
      },
      transformResponse: (data: Record<string, any>[], meta) => {
        return {
          trips: data,
          meta: meta,
        };
      },
      providesTags: [tagTypes.myTripRequest],
    }),
    getStatusForATripRequest: build.query({
      query: (tripId) => {
        return {
          url: `/travel-buddies/status/${tripId}`,
          method: "GET",
        };
      },

      providesTags: [tagTypes.tripBuddy],
    }),

    sendTripResponse: build.mutation({
      query: ({ buddyId, data }) => {
        return {
          url: `/travel-buddies/${buddyId}/respond`,
          method: "PUT",
          data: data,
        };
      },
    }),
  }),
});

export const {
  useSendBuddyRequestMutation,
  useGetAllBuddyForATripsQuery,
  useGetAllTripRequestQuery,
  useGetStatusForATripRequestQuery,
  useSendTripResponseMutation,
} = travelBuddyApi;
