import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApiConfiguration, queryConfiguration } from "../utils";

export const conversationApi = createApi({
  reducerPath: "conversationApi",
  baseQuery: fetchBaseQuery(createApiConfiguration({ callwithUserData: true })),
  tagTypes: ["threads"],
  endpoints: (builder) => ({
    createThread: builder.mutation({
      query: (payload) =>
        queryConfiguration({
          url: "/threads/",
          method: "POST",
          body: payload,
        }),
      invalidatesTags: ["threads"],
    }),

    threads: builder.query({
      query: () =>
        queryConfiguration({
          url: "/threads/",
          method: "GET",
        }),
      providesTags: ["threads"],
    }),

    viewThread: builder.query({
      query: ({ id }: { id: string }) =>
        queryConfiguration({
          url: `/threads/${id}`,
          method: "GET",
        }),
    }),

    viewConvoThread: builder.query({
      query: ({ id }: { id: string }) =>
        queryConfiguration({
          url: `/search/thread/?pk=${id}`,
          method: "GET",
        }),
    }),

    starredThreads: builder.query({
      query: () =>
        queryConfiguration({
          url: "/search/starred",
          method: "GET",
        }),
    }),
    bookMarkConversation: builder.mutation({
      query: (id) =>
        queryConfiguration({
          url: `/search/${id}/star/`,
          method: "PATCH",
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
      query: (threadId) =>
        queryConfiguration({
          url: `/threads/${threadId}/`,
          method: "DELETE",
        }),
      invalidatesTags: ["threads"],
    }),
    createConversation: builder.mutation({
      query: (payload) =>
        queryConfiguration({
          url: "/search/",
          method: "POST",
          body: payload,
        }),
      invalidatesTags: ["threads"],
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
    getJudmentFile: builder.query({
      query: ({ id }: { id: string }) =>
        queryConfiguration({
          url: `/judgments/${id}/file/`,
          method: "GET",
        }),
    }),
  }),
});

export const {
  useCreateThreadMutation,
  useThreadsQuery,
  useStarThreadMutation,
  useViewThreadQuery,
  useViewConvoThreadQuery,
  useStarredThreadsQuery,
  useDeleteThreadMutation,
  useCreateConversationMutation,
  useViewConversationQuery,
  useUpdateConversationMutation,
  useBookMarkConversationMutation,
  useGetJudmentFileQuery,
} = conversationApi;
