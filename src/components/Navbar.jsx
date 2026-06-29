import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/cart", label: "Cart" },
];

export default function Navbar({ isOpen = false, onClose }) {
  return (
    <nav
      className={`bg-neutral-100 dark:bg-neutral-950 text-gray-900 dark:text-gray-50 text-sm absolute md:static top-16 left-0 right-0
        transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden
        ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 md:opacity-100 md:max-h-none"}
        md:overflow-visible`}
    >
      <ul className="flex flex-col md:flex-row py-4 md:py-0">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              onClick={onClose}
              className="hover:text-blue-500 transition-colors duration-200 block px-4 py-3 md:py-2 font-medium uppercase"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
