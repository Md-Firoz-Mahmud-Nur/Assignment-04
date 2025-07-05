import { baseApi } from "./baseApi";
export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
