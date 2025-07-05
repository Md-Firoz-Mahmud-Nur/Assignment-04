import App from "@/App";
import { AddBook } from "@/pages/AddBook/AddBook";
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
        element: <div>Books</div>,
      },
      {
        path: "/create-book",
        element: <AddBook></AddBook>,
      },
    ],
  },
]);

export default router;
