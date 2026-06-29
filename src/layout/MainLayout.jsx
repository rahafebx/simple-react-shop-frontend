import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
export default function MainLayout() {
  const {user, logout} = useContext(AuthContext);

  // why user is empty ?
  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-neutral-100 dark:bg-neutral-950 z-50">
        <Container className="flex items-center justify-between py-4 text-gray-900 dark:text-gray-50">
          <h1 className="text-xl font-bold">REBEX Shop</h1>
          <Navbar />
          <div className="controls flex items-center space-x-2">
            {user ? (
              <>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700 transition-colors duration-200 cursor-pointer"
              >
                Logout
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
      <main className="flex-grow mt-16 text-gray-900 dark:text-gray-50">
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
