import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/products";

export default function Home() {
    const products = getProducts();

  return (
    <>
      <Container as="section" className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to REBEX Shop</h1>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
          Discover the best products at unbeatable prices. Shop now and enjoy
          exclusive deals!
        </p>
      </Container>
      <Container as="section" className="text-center py-20 pt-0">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
          Check out our top picks and find your next favorite item.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </>
  );
}
