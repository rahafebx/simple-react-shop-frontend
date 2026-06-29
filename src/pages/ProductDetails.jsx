import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { getProductById } from "../data/products";
import Rating from "../components/Rating";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import Price from "../components/Price";
import { useCart } from "../context/useCart";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = useMemo(() => getProductById(id), [id]);

  useEffect(() => {
    if (!product) {
      navigate("/not-found");
    }
  }, [product, navigate]);

  if (!product) return null;

  return (
    <>
      <Breadcrumb items={[
        { to: "/", label: "Home" },
        { label: product.name },
      ]} />
      <Container className="text-gray-900 dark:text-gray-50 py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
            className="bg-primary-50 dark:bg-primary-950 w-full h-64 sm:h-72 lg:h-96 object-cover rounded-lg"
          />
        </div>
        <div className="product-details flex flex-col">
          <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
          <div className="mb-6">
            <Rating value={product.rate} size="w-5 h-5" />
          </div>
          <Price price={product.price} discount={product.discount} className="mb-6" />
          <p className="text-lg mb-6 grow text-gray-600 dark:text-gray-400">{product.description}</p>
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
    </>
  );
}