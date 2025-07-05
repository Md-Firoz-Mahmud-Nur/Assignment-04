import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useCreateBorrowMutation } from "@/redux/api/bookApi";

import { formatDate } from "date-fns";
import { CalendarIcon, ShoppingBag } from "lucide-react";
import { useForm } from "react-hook-form";
import { RiTakeawayLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { ReactNode } from "react";

type BorrowModal = {
  bookId: string;
  isHome: boolean;
  trigger?: ReactNode;
};
type BorrowFormData = {
  quantity: string;
  dueDate: string;
};
export function BorrowModal({ bookId, isHome, trigger }: BorrowModal) {
  const navigate = useNavigate();

  const [createBorrow] = useCreateBorrowMutation();
  const form = useForm({
    defaultValues: {
      quantity: "",
      dueDate: "",
    },
  });

  async function onSubmit(data: BorrowFormData) {
    const borrowData = { ...data, book: bookId };
    try {
      const res = await createBorrow(borrowData);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/borrow-summary");
      } else {
        toast.error(
          (res?.error &&
            "data" in res.error &&
            (res.error as { data?: { message?: string } }).data?.message) ||
            "An error occurred"
        );
      }
    } catch (error) {
      console.log("Borrow error is", error);
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          {trigger ? (
            trigger
          ) : isHome ? (
            <p>
              <ShoppingBag />
            </p>
          ) : (
            <Button
              size="sm"
              className="bg-yellow-500 text-black hover:bg-yellow-600 hover:cursor-pointer">
              <RiTakeawayLine />
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            <DialogDescription>
              Your cannot borrow over stock book
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* calendar  */}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-5">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}>
                            {field.value ? (
                              formatDate(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-5">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Borrowed</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
