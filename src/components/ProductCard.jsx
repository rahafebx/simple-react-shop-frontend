import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import Rating from "./Rating";
import Price from "./Price";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div
      key={product.id}
      className="relative bg-neutral-100 dark:bg-neutral-950 rounded-lg shadow-md overflow-hidden text-gray-900 dark:text-gray-50
      flex flex-col transition-all transform hover:scale-[1.02] hover:shadow-xl duration-300 border border-gray-200 dark:border-gray-900 group"
    >
      {product.discount > 0 && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full z-10">
          {product.discount}% OFF
        </div>
      )}
      <div className="img h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover bg-primary-50 dark:bg-primary-950 group-hover:scale-[1.05] group-hover:filter group-hover:blur-[0.09rem] transition-all duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4 grow">
        <h3 className="text-xl font-bold mb-2">
          <Link to={`/products/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <div className="mb-4">
          <Rating value={product.rate} />
        </div>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
          {product.description}
        </p>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-900 flex items-center justify-between">
        <Price price={product.price} discount={product.discount} />
        <button
          className="text-sm bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
