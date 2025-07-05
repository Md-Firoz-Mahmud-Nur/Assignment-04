import { Button } from "@/components/ui/button";
import Home from "./pages/home/home";

function App() {
  return (
    <>
      <Home></Home>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
