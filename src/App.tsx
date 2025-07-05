import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "./redux/api/bookApi";

function App() {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  console.log(data, isLoading, isError);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}

export default App;
