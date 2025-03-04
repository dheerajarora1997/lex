import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApiConfiguration, queryConfiguration } from "../utils";

export const bookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery: fetchBaseQuery(createApiConfiguration({ callwithUserData: true })),
  tagTypes: ["Conversation"],
  endpoints: (builder) => ({
    starredConversations: builder.query({
      query: () =>
        queryConfiguration({
          url: "/search/starred",
          method: "GET",
        }),
      providesTags: ["Conversation"],
    }),
    bookMarkConversation: builder.mutation({
      query: (id) =>
        queryConfiguration({
          url: `/search/${id}/star/`,
          method: "PATCH",
        }),
      invalidatesTags: ["Conversation"],
    }),
    // Todo : need to review function
    starThread: builder.mutation({
      query: ({ payload, threadId }) =>
        queryConfiguration({
          url: `/threads/${threadId}/star/`,
          method: "PATCH",
          body: payload,
        }),
      invalidatesTags: ["Conversation"],
    }),

    deleteBookmarkConvo: builder.mutation({
      query: (convoID) =>
        queryConfiguration({
          url: `/search/${convoID}/star/`,
          method: "PATCH",
        }),
      invalidatesTags: ["Conversation"],
    }),
  }),
});

export const {
  useStarThreadMutation,
  useStarredConversationsQuery,
  useDeleteBookmarkConvoMutation,
  useBookMarkConversationMutation,
} = bookmarkApi;
