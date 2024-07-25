import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getAllComment: builder.query({
      query: (postId) => `/comment/post/${postId}`,
    }),

    createComment: builder.mutation({
      query: (commentData) => ({
        url: `/comment/add/`,
        method: "POST",
        body: commentData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateComment: builder.mutation({
      query: (newData) => ({
        url: `/comment/update`,
        method: "PUT",
        body:newData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetAllCommentQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation
} = commentApi;
