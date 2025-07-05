import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Book } from "@/types";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/bookApi";
import Loader from "@/components/Loader";
import { BorrowModal } from "./BorrowModal";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiTakeawayLine } from "react-icons/ri";

export function AllBooks() {
  const { data: bookData, isLoading } = useGetBooksQuery(undefined);
  const data = bookData?.data ?? [];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const [deleteBook] = useDeleteBookMutation();

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

  const columns: ColumnDef<Book>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("author")}</div>
      ),
    },
    {
      accessorKey: "genre",
      header: "Genre",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("genre")}</div>
      ),
    },
    {
      accessorKey: "isbn",
      header: "ISBN",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("isbn")}</div>
      ),
    },
    {
      accessorKey: "copies",
      header: "Copies",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("copies")}</div>
      ),
    },
    {
      accessorKey: "available",
      header: "Available",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("available") === true ? "Available" : "Not Available"}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const currentBook = row.original;

        return (
          <div className="flex gap-2">
            <Link to={`/edit-book/${currentBook?._id}`}>
              <Button
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700">
                <FaEdit></FaEdit>
              </Button>
            </Link>

            <BorrowModal
              bookId={currentBook?._id}
              isHome={false}
              trigger={
                <Button
                  size="sm"
                  className="bg-yellow-500 text-black hover:bg-yellow-600">
                  <RiTakeawayLine></RiTakeawayLine>
                </Button>
              }
            />

            <Button
              size="sm"
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => handleDelete(currentBook?._id)}>
              <MdOutlineDeleteForever></MdOutlineDeleteForever>
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-10 text-center text-lg font-semibold text-gray-500">
        No books added yet.
      </div>
    );
  }


  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between py-4 text-sm text-muted-foreground ">
        <div className="space-x-2 mx-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
