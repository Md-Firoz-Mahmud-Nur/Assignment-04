import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBooksQuery } from "@/redux/api/bookApi";

function Home() {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  const books = data?.data || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {books.map((book) => (
        <Card key={book._id} className="shadow-lg hover:shadow-xl transition">
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <p className="text-sm text-gray-500">by {book.author}</p>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-muted-foreground">
              <strong>Genre:</strong> {book.genre}
            </p>
            <p className="mb-2 text-sm text-muted-foreground">
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p className="mb-2 text-sm text-muted-foreground">
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
