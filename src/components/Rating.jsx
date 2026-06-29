import { Star } from "lucide-react";

export default function Rating({ value, size = "w-4 h-4", className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          fill={index < Math.floor(value) ? "currentColor" : "none"}
          stroke="currentColor"
          className={`${size} ${index < Math.floor(value) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
