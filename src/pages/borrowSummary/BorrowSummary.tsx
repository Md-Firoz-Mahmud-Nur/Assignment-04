import Loader from "@/components/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowsQuery } from "@/redux/api/bookApi";
import type { ShowBorrowBook } from "@/types";

function BorrowSummary() {
  const { data, isLoading } = useGetBorrowsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const borrowBooks = data?.data ?? [];
  console.log("borrow data ", borrowBooks);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="container mx-auto">
      <div>
        <h2 className="mx-auto my-4 w-full text-center text-3xl font-semibold">
          Borrow Summary
        </h2>
      </div>

      <Table>
        <TableHeader className="bg-gray-300">
          <TableRow>
            <TableHead>Serial No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead className="w-min">Total Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrowBooks.map((borrow: ShowBorrowBook, index: number) => (
            <TableRow key={borrow?.book?.isbn ?? index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">
                {borrow?.book?.title}
              </TableCell>
              <TableCell className="font-medium">
                {borrow?.book?.isbn}
              </TableCell>
              <TableCell className="font-medium">
                {borrow?.totalQuantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

export default BorrowSummary;
