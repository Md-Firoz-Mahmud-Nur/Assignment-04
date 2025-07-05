import { Link } from "react-router";
import Logo from "../../assets/BookHive.jpeg";
import { ModeToggle } from "../ModeToggle";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto h-16 flex items-center gap-3 px-5">
      <Link to="/" className="flex items-center font-bold ml-2">
        <img src={Logo} alt="BookHive" className="w-8 h-8 mr-2" /> BookHive
      </Link>
      <Link className="hover:underline" to="/books">
        Books
      </Link>
      <Link className="hover:underline" to="/create-book">
        Add Book
      </Link>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </nav>
  );
}
