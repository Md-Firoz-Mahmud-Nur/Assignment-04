import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/api/bookApi";
import type { AddBookForm } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export function EditBook() {
  const { id } = useParams();
  const { data: bookData, isLoading } = useGetSingleBookQuery(id);
  const book = bookData?.data;

  const [updateBook] = useUpdateBookMutation();

  const GENRES = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ] as const;

  const form = useForm<AddBookForm>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 0,
      available: true,
    },
  });

  useEffect(() => {
    if (book) {
      form.reset({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        isbn: book.isbn || "",
        description: book.description || "",
        copies: book.copies || 0,
        available: book.available ?? true,
      });
    }
  }, [book, form]);

  async function onSubmit(data: AddBookForm) {
    console.log(data);

    const updatedData = { ...data, copies: Number(data.copies) };

    try {
      const res = await updateBook({ id, data: updatedData });
      console.log(res);

      if (res?.data?.success) {
        toast.success(`${res.data.message} `);
      } else {
        toast.error(`No changes detected!`);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  }

  if (isLoading) return <Loader />;

  return (
    <section className="mx-auto mt-10 max-w-xl rounded-md border bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
        Edit Book
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Book Title" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Author Name"
                      {...field}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    required
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                    defaultValue={book?.genre || undefined}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GENRES.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="ISBN Number" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Available copies"
                      {...field}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(val === "true")}
                    value={String(field.value)}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Short description" {...field} required />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Update Book
          </Button>
        </form>
      </Form>
    </section>
  );
}
