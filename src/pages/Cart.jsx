import { Link } from "react-router-dom";
import { X, Minus, Plus } from "lucide-react";
import Container from "../components/Container";
import Price from "../components/Price";
import Breadcrumb from "../components/Breadcrumb";
import { useCart } from "../context/useCart";

export default function Cart() {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeItemCompletely } =
    useCart();

  return (
    <>
      <Breadcrumb items={[
        { to: "/", label: "Home" },
        { label: "Shopping Cart" },
      ]} />
      <Container className="text-gray-900 dark:text-gray-50 py-10">
        <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-primary-900/10 max-w-xl mx-auto mt-16 p-8 rounded-lg">
              <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-lg">
                Go back to the <Link to="/" className="text-primary-500 dark:text-primary-400 hover:underline">home page</Link> and add some items to your cart.
              </p>
            </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[repeat(3,_1fr)] gap-16">
            <div className="grid grid-cols-1 gap-6 lg:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex flex-col grow">
                    <h2 className="text-md font-bold">{item.name}</h2>
                    <Price price={item.price} discount={item.discount} />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                      <button
                        className="text-sm bg-primary-500 text-white h-8 w-8 p-2 inline-flex items-center justify-center rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" aria-label="Decrease quantity" />
                      </button>
                      <span className="h-8 w-8 inline-flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        className="text-sm bg-primary-500 text-white h-8 w-8 p-2 inline-flex items-center justify-center rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" aria-label="Increase quantity" />
                      </button>
                    </p>
                  </div>
                  <div className="remove">
                    <button
                      className="text-sm bg-transparent text-red-500 h-8 w-8 inline-flex items-center justify-center rounded hover:text-red-600 transition-colors duration-200 cursor-pointer"
                      onClick={() => removeItemCompletely(item.id)}
                    >
                      <X className="w-6 h-6" aria-label="Remove item" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-start-3 h-fit mt-8 md:mt-0 p-8 bg-neutral-100 dark:bg-neutral-950 border border-gray-200 dark:border-gray-900 rounded-lg shadow-md min-w-96">
              <h2 className="text-xl font-bold mb-4">
                Total Items: {totalItems}
              </h2>
              <h2 className="text-xl font-bold mb-6">
                Total Price: ${totalPrice.toFixed(2)}
              </h2>
              <Link
                to="/checkout"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}