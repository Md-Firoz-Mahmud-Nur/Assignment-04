import { NavLink } from "react-router";
import Logo from "../../assets/BookHive.jpeg";
import { ModeToggle } from "../ModeToggle";

export default function Navbar() {
  const navigationLinks = [
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/create-book" },
    { name: "Borrow Summary", href: "/borrow-summary" },
  ];

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center text-lg font-semibold gap-2">
          <img src={Logo} alt="BookHive" className="w-9 h-9 rounded-md" />
          <span className="text-slate-900 dark:text-white">BookHive</span>
        </NavLink>

        <div className="flex flex-wrap items-center gap-6 mt-2 md:mt-0 text-sm md:text-base">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-slate-700 dark:text-gray-300 hover:text-blue-600"
              }>
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto md:ml-0">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
