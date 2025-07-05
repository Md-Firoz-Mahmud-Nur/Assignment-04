import { baseApi } from "./baseApi";
export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: `/books`,
        method: "POST",
        body: book,
      }),
    }),
  }),
});

export const { useGetBooksQuery,useAddBookMutation } = bookApi;
