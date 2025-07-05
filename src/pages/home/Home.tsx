import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBooksQuery, useDeleteBookMutation } from "@/redux/api/bookApi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiTakeawayLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import { BorrowModal } from "../allBooks/BorrowModal";

function Home() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const books = data?.data ?? [];

  const handleDelete = (bookId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteBook(bookId);
          if (res?.data?.success) {
            Swal.fire("Deleted!", "Your book has been deleted.", "success");
          }
        } catch (error) {
          toast.error((error as Error)?.message || "Something went wrong");
        }
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;

  if (books.length === 0) {
    return (
      <div className="py-10 text-center text-lg font-semibold text-gray-500">
        No books added yet.
      </div>
    );
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3">
      {books.map((book: any) => (
        <Card key={book._id} className="shadow-lg transition hover:shadow-xl">
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <p className="text-sm text-gray-500">by {book.author}</p>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2 text-sm">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="text-muted-foreground mb-2 text-sm">
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p className="text-muted-foreground mb-2 text-sm">
              <strong>Description:</strong> {book.description}
            </p>
            <p className="mb-4 text-sm font-medium text-green-600">
              {book.available
                ? `Available (${book.copies} copies)`
                : "Not Available"}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-2">
              <Link to={`/edit-book/${book._id}`}>
                <Button
                  size="sm"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <FaEdit />
                </Button>
              </Link>

              <BorrowModal
                bookId={book._id}
                isHome={true}
                trigger={
                  <Button
                    size="sm"
                    className="bg-yellow-500 text-black hover:bg-yellow-600"
                  >
                    <RiTakeawayLine />
                  </Button>
                }
              />

              <Button
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDelete(book._id)}
              >
                <MdOutlineDeleteForever />
              </Button>

              <Link to={`/books/${book._id}`}>
                <Button
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <BsEye />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Home;
