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
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
    }),
    createBorrow: builder.mutation({
      query: (borrowData) => ({
        url: `/borrow`,
        method: "POST",
        body: borrowData,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation, useDeleteBookMutation,useCreateBorrowMutation } =
  bookApi;
