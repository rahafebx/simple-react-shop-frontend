import { Outlet } from "react-router-dom";
import { ShoppingCart, LogOut} from 'lucide-react'
import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useAuth } from "./../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function MainLayout() {
  const navigation = useNavigate();
  const {user, logout} = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-neutral-100 dark:bg-neutral-950 z-50">
        <Container className="flex items-center justify-between py-4 text-gray-900 dark:text-gray-50">
          <h1 className="text-xl font-bold">REBEX Shop</h1>
          <Navbar />
          <div className="controls flex items-center space-x-3">
            <Link to="/cart" className="relative flex items-center justify-center rounded-lg p-2 text-black dark:text-white transition-colors cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900">
              <ShoppingCart size={20} aria-hidden="true" />
              <span className="absolute flex items-center justify-center -top-1 -right-1 w-5 h-5 text-xs bg-primary-500 rounded-full text-white">4</span>
            </Link>
            {user ? (
              <>
              <button
                onClick={() => {logout(), navigation("/")}}
                className="flex items-center justify-center rounded-lg p-2 text-black dark:text-white transition-colors cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900"
              >
                <LogOut size={20} aria-hidden="true" />
              </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Get Started
              </Link>
            )}
            <ThemeToggle className="hover:bg-neutral-200 dark:hover:bg-neutral-900" />
          </div>
        </Container>
      </header>
      <main className="grow mt-16 text-gray-900 dark:text-gray-50">
        <Outlet />
      </main>
      <footer className="bg-neutral-100 dark:bg-neutral-950 p-4 text-gray-900 dark:text-gray-50 text-sm">
        <Container className="flex flex-col md:flex-row items-center justify-between">
          <p>&copy; 2024 REBEX Shop. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}
