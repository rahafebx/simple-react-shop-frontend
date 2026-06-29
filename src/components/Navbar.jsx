import { Link } from "react-router-dom";

export default function Navbar({ isOpen = false }) {
  return (
    <nav
      className={`bg-neutral-100 dark:bg-neutral-950 text-gray-900 dark:text-gray-50 text-sm absolute md:static opacity-0 md:opacity-100 top-16 left-0 right-0 
        max-h-0 overflow-hidden md:overflow-visible transition-max-h transition-opacity duration-200 ease-in-out
        ${isOpen ? "max-h-lvh opacity-100" : "max-h-0 opacity-0 md:max-h-none"}`}
    >
      <ul className="flex flex-col md:flex-row py-6 md:py-0 ">
        <li>
          <Link
            to="/"
            className="hover:text-blue-500 transition-colors duration-200 block px-4 py-2 md:py-4"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            className="hover:text-blue-500 transition-colors duration-200 block px-4 py-2 md:py-4"
          >
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
}
