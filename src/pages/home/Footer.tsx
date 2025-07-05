import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../../assets/BookHive.jpeg";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and intro */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="mb-4">
            <img src={Logo} alt="BookHive Logo" className="h-14 rounded-xl" />
          </Link>
          <p className="text-sm text-center md:text-left text-gray-300">
            BookHive - A modern library system to manage books and borrowing
            efficiently.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li>
              <Link to="/books" className="hover:text-white">
                All Books
              </Link>
            </li>
            <li>
              <Link to="/create-book" className="hover:text-white">
                Add Book
              </Link>
            </li>
            <li>
              <Link to="/borrow-summary" className="hover:text-white">
                Borrow Summary
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-gray-300">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white">
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white">
              <BsTwitter size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white">
              <BsInstagram size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white">
              <BsLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-slate-800 text-center py-3 text-sm text-gray-400">
        © {new Date().getFullYear()} BookHive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
