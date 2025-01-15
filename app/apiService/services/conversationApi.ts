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
      query: () =>
        queryConfiguration({
          url: "/threads/",
          method: "GET",
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
      query: () =>
        queryConfiguration({
          url: "/threads/starred",
          method: "GET",
        }),
    }),

    starThread: builder.mutation({
      query: ({ payload, threadId }) =>
        queryConfiguration({
          url: `/threads/${threadId}/star/`,
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
    createConversation: builder.mutation({
      query: (payload) =>
        queryConfiguration({
          url: "/search/",
          method: "POST",
          body: payload,
        }),
    }),
    viewConversation: builder.query({
      query: ({ id }: { id: string }) =>
        queryConfiguration({
          url: `/search/${id}`,
          method: "GET",
        }),
    }),
    updateConversation: builder.mutation({
      query: ({ id, payload }) =>
        queryConfiguration({
          url: `/search/${id}`,
          method: "POST",
          body: payload,
        }),
    }),
  }),
});

export const {
  useCreateThreadMutation,
  useThreadsQuery,
  useStarThreadMutation,
  useViewThreadQuery,
  useStarredThreadsQuery,
  useDeleteThreadMutation,
  useCreateConversationMutation,
  useViewConversationQuery,
  useUpdateConversationMutation,
} = conversationApi;
