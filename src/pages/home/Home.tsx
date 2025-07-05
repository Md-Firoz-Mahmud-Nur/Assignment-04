import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBooksQuery } from "@/redux/api/bookApi";

function Home() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  console.log(data, isLoading);

  // const { data: bookData, isLoading } = useGetBooksQuery(undefined);
  // const data = bookData?.data ?? [];

  if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Something went wrong.</p>;

  const books = data?.data ?? [];

  if (books.length === 0) {
    return (
      <div className="py-10 text-center text-lg font-semibold text-gray-500">
        No books added yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 container mx-auto">
      {books.map((book) => (
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
            <p className="text-sm font-medium text-green-600">
              {book.available
                ? `Available (${book.copies} copies)`
                : "Not Available"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Home;
