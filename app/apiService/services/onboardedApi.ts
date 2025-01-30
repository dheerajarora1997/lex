import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApiConfiguration, queryConfiguration } from "../utils";

export const onboardedApi = createApi({
  reducerPath: "onboardedApi",
  baseQuery: fetchBaseQuery(createApiConfiguration({ callwithUserData: true })),
  endpoints: (builder) => ({
    getOnboardingStatus: builder.query({
      query: () =>
        queryConfiguration({
          url: "/onboarding-completed/",
          method: "POST",
          body: {},
        }),
    }),
    onboardingCompleted: builder.mutation({
      query: (payload) =>
        queryConfiguration({
          url: "/onboarding-completed/",
          method: "POST",
          body: payload,
        }),
    }),
  }),
});

export const { useGetOnboardingStatusQuery, useOnboardingCompletedMutation } =
  onboardedApi;
