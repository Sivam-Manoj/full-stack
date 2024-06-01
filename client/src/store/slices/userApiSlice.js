import { apiSlice } from "./apiSlice";

const USER_ENDPOINTS = "/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINTS}/login`,
        method: "POST",
        body: data,
      }),
    }),
    registerAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINTS}/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginApiMutation,useRegisterAPIMutation } = userApiSlice;
