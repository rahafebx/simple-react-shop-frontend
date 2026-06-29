import { Link } from "react-router-dom";
import { useCart } from "../context/CardContext"

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div
      key={product.id}
      className="bg-neutral-100 dark:bg-neutral-950 rounded-lg shadow-md overflow-hidden text-gray-900 dark:text-gray-50
      flex flex-col transition-transform transform hover:scale-[1.02] hover:shadow-lg duration-200"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover bg-primary-50 dark:bg-primary-950"
        loading="lazy"
      />
      <div className="p-4 grow">
        <h3 className="text-xl font-bold mb-2">
          <Link to={`/products/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
      </div>
      {/* card footer with price and add to card lucide icon */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        <button 
          className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
