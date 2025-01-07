import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApiConfiguration, queryConfiguration } from "../utils";

export const conversationApi = createApi({
  reducerPath: "conversationApi",
  baseQuery: fetchBaseQuery(createApiConfiguration({ callwithUserData: true })),
  endpoints: (builder) => ({
    createThread: builder.mutation({
      query: (payload) =>
        queryConfiguration({
          url: "/threads/",
          method: "POST",
          body: payload,
        }),
    }),

    threads: builder.query({
      query: (params) =>
        queryConfiguration({
          url: "/threads/",
          method: "GET",
          params,
        }),
    }),

    viewThread: builder.query({
      query: ({ id }: { id: string }) =>
        queryConfiguration({
          url: `/threads/${id}`,
          method: "GET",
        }),
    }),

    starredThreads: builder.query({
      query: (payload) =>
        queryConfiguration({
          url: "/login/",
          method: "POST",
          body: payload,
        }),
    }),

    starThread: builder.mutation({
      query: ({ payload, threadId }) =>
        queryConfiguration({
          url: `/api/threads/${threadId}/star/`,
          method: "PATCH",
          body: payload,
        }),
    }),

    deleteThread: builder.mutation({
      query: ({ threadId }) =>
        queryConfiguration({
          url: `/threads/${threadId}/`,
          method: "DELETE",
        }),
    }),
  }),
});

export const {
  useCreateThreadMutation,
  useDeleteThreadMutation,
  useStarThreadMutation,
  useThreadsQuery,
  useViewThreadQuery,
  useStarredThreadsQuery,
} = conversationApi;
