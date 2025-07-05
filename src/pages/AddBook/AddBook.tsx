import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddBookMutation } from "@/redux/api/bookApi";
import type { AddBookForm } from "@/types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type RTKQueryError = {
  data?: {
    message?: string;
  };
};
export function AddBook() {
  const [createBook] = useAddBookMutation();
  const navigate = useNavigate();

  const GENRES = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ] as const;
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 0,
      available: true,
    },
  });

  async function onSubmit(data: AddBookForm) {
    const submitData = { ...data, copies: Number(data.copies) };
    console.log("book create er data is ", submitData);
    try {
      const res = await createBook(submitData);

      if ("data" in res && res?.data?.success) {
        toast.success(`${res?.data?.message},  😍`);
        navigate("/books");
      } else if (
        "error" in res &&
        res?.error &&
        typeof res.error === "object" &&
        "data" in res.error
      ) {
        const error = res.error as RTKQueryError;
        toast.error(`${error.data?.message ?? "An error occurred"} 😒`);
      } else {
        toast.error("An error occurred 😒");
      }
    } catch (error) {
      console.log("error is in catch ", error);
    }
  }

  return (
    <section className="max-w-[500px] mx-auto">
      <div>
        <h2 className="w-full mx-auto mt-4 text-center font-semibold text-3xl">
          Add New Book
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input required placeholder="Book Title" {...field} />
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
                  <Input required placeholder="Book Author" {...field} />
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
                <Select required onValueChange={field.onChange}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENRES?.map((genre) => (
                      <SelectItem value={genre}>{genre}</SelectItem>
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
                  <Input required placeholder="Book ISBN" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input required placeholder="Description" {...field} />
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
                    required
                    type="number"
                    placeholder="Copies"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select book availability" />
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

          <Button type="submit">Added</Button>
        </form>
      </Form>
    </section>
  );
}
