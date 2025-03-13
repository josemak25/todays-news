import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import { CalendarIcon, Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { NewsSources } from "~/components/ui/news-sources";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "~/components/ui/sheet";

const FormSchema = z.object({
  query: z.string().optional(),
  end_date: z.date().optional(),
  start_date: z.date().optional(),
  category: z.string().optional(),
  source: z.enum(["GUARDIAN", "NEWS_API"]).optional(),
});

const DatePicker = ({ field, label }: any) => (
  <FormItem className="flex flex-1 flex-col">
    <FormLabel>{label}</FormLabel>
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
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
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <FormMessage />
  </FormItem>
);

export function NewsSearch() {
  const { categories } = useLoaderData<ArticleLoaderData>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const selectedSource = form.watch("source");
  const selectedCategory = form.watch("category");

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast("You submitted the following values:");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" className="rounded-2xl size-10">
          <Search className="size-5 opacity-50" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full lg:min-w-[550px] p-1">
        <SheetHeader>
          <SheetTitle className="text-2xl">Search News</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col w-full p-4"
          >
            <FormField
              name="query"
              control={form.control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Search your news..."
                  className="border p-2 rounded-md"
                  {...field}
                />
              )}
            />

            <div className="flex flex-col justify-between gap-6 lg:flex-row">
              <FormField
                name="start_date"
                control={form.control}
                render={({ field }) => (
                  <DatePicker field={field} label="Start Date" />
                )}
              />

              <FormField
                name="end_date"
                control={form.control}
                render={({ field }) => (
                  <DatePicker field={field} label="End Date" />
                )}
              />
            </div>

            <p className="mt-5 text-1xl font-semibold">Category</p>
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <ScrollArea
                  className="w-full mt-2 "
                  aria-orientation="horizontal"
                >
                  <div className="flex w-max px-4 space-x-2">
                    {categories.map((t) => (
                      <Button
                        key={t}
                        type="button"
                        onClick={() => field.onChange(t)}
                        className={cn(
                          "px-4 py-2 rounded-full capitalize",
                          selectedCategory !== t &&
                            "bg-primary/30 text-primary-foreground/80"
                        )}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" hidden />
                </ScrollArea>
              )}
            />

            <p className="mt-5 mb-2 text-1xl font-semibold">Source</p>
            <FormField
              name="source"
              control={form.control}
              render={({ field }) => (
                <NewsSources
                  selected={selectedSource}
                  onSelect={(selected) => field.onChange(selected)}
                />
              )}
            />

            <Button className="mt-6 w-40 self-end" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
