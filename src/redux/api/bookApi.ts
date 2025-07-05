import { baseApi } from "./baseApi";
export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: `/books`,
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    createBorrow: builder.mutation({
      query: (borrowData) => ({
        url: `/borrow`,
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrow", "books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (bookId) => `/books/${bookId}`,
      providesTags: ["books"],
    }),
    getBorrows: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),

  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useCreateBorrowMutation,
  useUpdateBookMutation,
  useGetSingleBookQuery,
  useGetBorrowsQuery
} = bookApi;
