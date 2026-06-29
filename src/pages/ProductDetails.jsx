import { useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { getProductById } from "../data/products"; // Assuming you have a function to fetch product details
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useCart } from "../context/CardContext";
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { isProductInCart, addToCart } = useCart();
  // Fetch product details based on the ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await new Promise((resolve) => {
          resolve(getProductById(id));
        });
        if (!productData) {
          navigate("/not-found"); // Redirect to a not found page if the product doesn't exist
        }
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id, navigate]);

  return (
    <>
      {product && (
        <div className="text-gray-900 dark:text-gray-50 bg-primary-50 dark:bg-primary-950 py-10">
          <p className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-sm tracking-wider flex items-center gap-2 font-medium">
            <a
              href="/"
              className="text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-200"
            >
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            {product.name}
          </p>
        </div>
      )}
      {product && (
        <Container className="text-gray-900 dark:text-gray-50 py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div className="product-image">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 sm:h-72 lg:h-96 object-cover rounded-lg"
            />
          </div>
          <div className="product-details flex flex-col">
            <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
            <div className="flex items-center mb-6 gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  fill={
                    index < Math.floor(product.rate) ? "currentColor" : "none"
                  }
                  stroke={
                    index < Math.floor(product.rate)
                      ? "currentColor"
                      : "currentColor"
                  }
                  className={`w-5 h-5 ${index < Math.floor(product.rate) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {product.rate.toFixed(1)}
              </span>
            </div>
            <p className="text-2xl font-bold mb-6 text-primary-500">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-lg mb-6 grow">{product.description}</p>
            {/* product categories */}
            {product.category && product.category.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2 items-center">
                <h2 className="text-md font-semibold">Categories:</h2>
                <ul className="flex flex-wrap gap-2">
                  {product.category.map((cat, index) => (
                    <li
                      key={index}
                      className="bg-gray-200 dark:bg-primary-900 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm flex items-center justify-center"
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              className="text-sm w-full sm:w-fit bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </Container>
      )}
    </>
  );
}
