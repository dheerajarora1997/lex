import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApiConfiguration, queryConfiguration } from "../utils";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery(createApiConfiguration({ callwithUserData: true })),
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => queryConfiguration({ url: "/profile/", method: "GET" }),
    }),
  }),
});

export const { useProfileQuery } = profileApi;
