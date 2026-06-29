import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-neutral-100 dark:bg-neutral-950 text-gray-900 dark:text-gray-50 text-sm">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-blue-500 transition-colors duration-200">
            Home
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-blue-500 transition-colors duration-200">
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
}
