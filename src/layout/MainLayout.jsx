import { Outlet } from "react-router-dom";
import { ShoppingCart, LogOut, Menu, X } from 'lucide-react'
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

export default function MainLayout() {
  const navigation = useNavigate();
  const {user, logout} = useAuth();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-neutral-100 dark:bg-neutral-950 z-50 shadow-lg">
        <Container className="flex items-center justify-between py-4 text-gray-900 dark:text-gray-50">
          <h1 className="text-lg sm:text-xl font-bold"><Link to="/">REBEX <span className="text-xs md:text-sm lg:text-lg text-primary-600 dark:text-primary-400">Shop</span></Link></h1>
          <Navbar isOpen={isOpen} onClose={() => setIsOpen(false)} />
          <div className="controls flex items-center space-x-3 md:space-x-4">
            <Link to="/cart" className="relative flex items-center justify-center rounded-lg p-2 text-black dark:text-white transition-colors cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900" aria-label="Shopping Cart">
              <ShoppingCart size={20} aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute flex items-center justify-center -top-1 -right-1 w-5 h-5 text-xs bg-primary-500 rounded-full text-white">{totalItems}</span>
              )}
            </Link>
            {user ? (
              <>
              <button
                onClick={() => {logout(), navigation("/")}}
                className="flex items-center justify-center rounded-lg p-2 text-black dark:text-white transition-colors cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900"
              >
                <LogOut size={20} aria-label="Logout" />
              </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-primary-500 text-white px-4 py-2 text-sm rounded hover:bg-primary-600 transition-colors duration-200"
              >
                Get Started
              </Link>
            )}
            <ThemeToggle className="hover:bg-neutral-200 dark:hover:bg-neutral-900" />
            <button className="flex md:hidden items-center justify-center rounded-lg p-2 text-black dark:text-white transition-colors cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (<X size={20} aria-label="close Menu" />) : (<Menu size={20} aria-label="open Menu" />)}
            </button>
          </div>
        </Container>
      </header>
      <main className="grow mt-16 text-gray-900 dark:text-gray-50">
        <Outlet />
      </main>
      <footer className="bg-neutral-100 dark:bg-neutral-950 p-4 py-8 text-gray-600 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-900">
        <Container className="flex flex-col md:flex-row items-center justify-between">
          <p>&copy; 2024 REBEX Shop. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}
