import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: `/auth/register`,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
    }),
    createRecipe: builder.mutation({
      query: (body) => ({
        url: `/recipelist/createrecipe`,
        method: "POST",
        body,
      }),
    }),
    getCategory: builder.query({
      query: () => ({
        url: `/category/getCategory`,
        method: "GET",
      }),
    }),
    getHomepageData: builder.query({
      query: () => ({
        url: `/home/getHomeData`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateRecipeMutation,
  useGetCategoryQuery,
  useGetHomepageDataQuery
} = api;
