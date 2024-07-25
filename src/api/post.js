import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => `/post/`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("getAllPost response:", data);
        } catch (error) {
          console.error("getAllPost error:", error);
        }
      },
    }),

    getSearchPost: builder.mutation({
      query: (search) => ({
        url: `/post/search/${search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("getSearchPost response:", data);
        } catch (error) {
          console.error("getSearchPost error:", error);
        }
      },
    }),

    getPostById: builder.query({
      query: (postId) => `/post/${postId}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("getPostById response:", data);
        } catch (error) {
          console.error("getPostById error:", error);
        }
      },
    }),

    uploadFile: builder.mutation({
      query: (file) => ({
        url: `/post/upload`,
        method: "POST",
        body: file,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("uploadFile response:", data);
        } catch (error) {
          console.error("uploadFile error:", error);
        }
      },
    }),

    postUpload: builder.mutation({
      query: (data) => ({
        url: `/post/create`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("postUpload response:", data);
        } catch (error) {
          console.error("postUpload error:", error);
        }
      },
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("deletePost response:", data);
        } catch (error) {
          console.error("deletePost error:", error);
        }
      },
    }),

    updatePost: builder.mutation({
      query: ({ updateData, postId }) => ({
        url: `/post/${postId}`,
        method: "PUT",
        body: updateData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("updatePost response:", data);
        } catch (error) {
          console.error("updatePost error:", error);
        }
      },
    }),

    getUserPost: builder.query({
      query: (userId) => `/post/user/${userId}`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("getUserPost response:", data);
        } catch (error) {
          console.error("getUserPost error:", error);
        }
      },
    }),

    likePost: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/post/like/${id}`,
        method: "PUT",
        body: { userId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("likePost response:", data);
        } catch (error) {
          console.error("likePost error:", error);
        }
      },
    }),

    unlikePost: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/post/unlike/${id}`,
        method: "PUT",
        body: { userId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("unlikePost response:", data);
        } catch (error) {
          console.error("unlikePost error:", error);
        }
      },
    }),

    addBookmark: builder.mutation({
      query: (id) => ({
        url: `/post/addbookmark/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("addBookmark response:", data);
        } catch (error) {
          console.error("addBookmark error:", error);
        }
      },
    }),

    removeBookmark: builder.mutation({
      query: (id) => ({
        url: `/post/removebookmark/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("removeBookmark response:", data);
        } catch (error) {
          console.error("removeBookmark error:", error);
        }
      },
    }),

    getFollowingPost: builder.query({
      query: () => `/post/followings`,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("getFollowingPost response:", data);
        } catch (error) {
          console.error("getFollowingPost error:", error);
        }
      },
    }),

    getAnalytics: builder.query({
      query: () => "/post/analytics",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("getAnalytics response:", data);
        } catch (error) {
          console.error("getAnalytics error:", error);
        }
      },
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetSearchPostMutation,
  useGetPostByIdQuery,
  useUploadFileMutation,
  usePostUploadMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetUserPostQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetFollowingPostQuery,
  useGetAnalyticsQuery,
} = postApi;
