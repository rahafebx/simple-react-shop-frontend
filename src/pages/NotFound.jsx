import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-900 dark:text-gray-50">
      <h1 className="text-9xl font-bold mb-4 text-primary-500">404</h1>
      <p className="text-lg mb-6">Page not found</p>
        <Link to="/" className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200">
          Go to Home
        </Link>
    </div>
  );
}
