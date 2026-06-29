import { useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getProductById } from "../data/products"; // Assuming you have a function to fetch product details
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
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
        <Container className="text-gray-900 dark:text-gray-50 bg-primary-50 dark:bg-primary-950 py-10">
          <p className="text-sm tracking-wider flex items-center gap-2 font-medium">
            <a
              href="/"
              className="text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-200"
            >
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            {product.name}
          </p>
        </Container>
      )}
      {product && (
        <Container className="text-gray-900 dark:text-gray-50 py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div className="product-image">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 sm:h-72 lg:h-96 object-cover"
            />
          </div>
          <div className="product-details flex flex-col">
            <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
            <p className="text-2xl font-bold mb-6 text-primary-500">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-lg mb-6 grow">{product.description}</p>
            <button className="text-sm w-full sm:w-fit bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer">
              Add to Cart
            </button>
          </div>
        </Container>
      )}
    </>
  );
}
