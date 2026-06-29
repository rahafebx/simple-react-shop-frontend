import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <div className="text-gray-900 dark:text-gray-50 bg-primary-50 dark:bg-primary-950 py-10">
      <p className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-sm tracking-wider flex items-center gap-2 font-medium">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4" />}
            {item.to ? (
              <Link
                to={item.to}
                className="text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-200"
              >
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
}
