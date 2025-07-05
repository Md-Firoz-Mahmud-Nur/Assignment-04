import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-five-iota.vercel.app/api",
  }),
  tagTypes: ["books", "borrow"],
  endpoints: () => ({}),
});
