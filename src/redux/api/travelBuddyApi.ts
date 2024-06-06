import { tagTypes } from "../tag-type";
import baseApi from "./baseApi";

export const travelBuddyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendBuddyRequest: build.mutation({
      query: ({ tripId, data }) => {
        console.log({ tripId, data });
        return {
          url: `/trip/${tripId}/request`,
          method: "POST",
          data: data,
        };
      },
      invalidatesTags: [
        tagTypes.tripBuddy,
        tagTypes.trips,
        tagTypes.user,
        tagTypes.myProfile,
      ],
    }),

    getAllBuddyForATrips: build.query({
      query: ({ tripId, args }) => {
        return {
          url: `/travel-buddies/${tripId}`,
          method: "GET",
          params: args,
        };
      },
      transformResponse: (data, meta) => {
        return {
          buddy: data,
          meta: meta,
        };
      },
      providesTags: [tagTypes.tripBuddy],
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
  useGetStatusForATripRequestQuery,
  useSendTripResponseMutation,
} = travelBuddyApi;
