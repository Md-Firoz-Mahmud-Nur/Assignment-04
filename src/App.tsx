import Navbar from "./components/layout/Navbar";
import { Outlet } from "react-router";
import Footer from "./pages/home/Footer";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
