import App from "@/App";
import { AddBook } from "@/pages/AddBook/AddBook";
import { AllBooks } from "@/pages/allBooks/AllBooks";
import BookDetails from "@/pages/bookDetails/BookDetails";
import { EditBook } from "@/pages/bookEdit/EditBook";
import BorrowSummary from "@/pages/borrowSummary/BorrowSummary";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/books",
        element: <AllBooks></AllBooks>,
      },
      {
        path: "/create-book",
        element: <AddBook></AddBook>,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary></BorrowSummary>,
      },
      {
        path: "edit-book/:id",
        element: <EditBook></EditBook>,
      },
      {
        path: "books/:id",
        element: <BookDetails></BookDetails>,
      },
    ],
  },
]);

export default router;
