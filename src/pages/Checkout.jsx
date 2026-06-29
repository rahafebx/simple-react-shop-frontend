import Container from "../components/Container";
import { useCart } from "../context/CardContext";
import { ChevronRight, CircleCheckBig } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const [isComplete, setIsComplete] = useState(false);

  // Redirect if cart is empty and not in complete state
  useEffect(() => {
    if (cartItems.length === 0 && !isComplete) {
      navigate("/");
    }
  }, [cartItems.length, isComplete, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      address: "",
      phone: "",
      notes: "",
    },
  });

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log("Form submitted:", data);
    console.log("Order items:", cartItems);
    console.log("Total items:", totalItems);
    console.log("Total price:", totalPrice);

    clearCart(); // Clear the cart after successful checkout
    setIsComplete(true); // Set the checkout completion state to true

    // After 5 seconds redirect to home page
    const timeoutId = setTimeout(() => {
      setIsComplete(false);
      navigate("/");
    }, 5000);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timeoutId);
  };

  // If cart is empty and not in complete state, return null (will redirect via useEffect)
  if (cartItems.length === 0 && !isComplete) {
    return null;
  }

  return (
    <>
      <div className="text-gray-900 dark:text-gray-50 bg-primary-50 dark:bg-primary-950 py-10">
        <p className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-sm tracking-wider flex items-center gap-2 font-medium">
          <a
            href="/"
            className="text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-primary-200"
          >
            Home
          </a>
          <ChevronRight className="w-4 h-4" />
          Checkout
        </p>
      </div>

      {!isComplete && cartItems.length > 0 ? (
        <Container className="text-gray-900 dark:text-gray-50 py-10">
          <h1 className="text-3xl font-bold mb-10">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-[repeat(3,_1fr)] gap-16">
            <div className="form lg:col-span-2 order-2 lg:order-1">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={user?.name || ""}
                    placeholder="Enter your name"
                    className={`block text-sm w-full px-4 py-2 h-12 border rounded-md focus:outline-0 
                                  ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"}
                                  `}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                      maxLength: {
                        value: 30,
                        message: "Name must be at most 30 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={user?.email || ""}
                    placeholder="Enter your email"
                    className={`block text-sm w-full px-4 py-2 h-12 border rounded-md focus:outline-0 
                                  ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"}
                                  `}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter your address"
                    className={`block text-sm w-full px-4 py-2 h-12 border rounded-md focus:outline-0 
                                  ${errors.address ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"}
                                  `}
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 2,
                        message: "Address must be at least 2 characters",
                      },
                      maxLength: {
                        value: 150,
                        message: "Address must be at most 150 characters",
                      },
                    })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    className={`block text-sm w-full px-4 py-2 h-12 border rounded-md focus:outline-0 
                                  ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"}
                                  `}
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="notes"
                    className="block mb-2 text-sm font-medium"
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    placeholder="Enter any additional notes"
                    className={`block text-sm w-full px-4 py-2 h-24 border rounded-md focus:outline-0 
                                    ${errors.notes ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"}
                                    `}
                    {...register("notes", {
                      maxLength: {
                        value: 200,
                        message: "Notes must be at most 200 characters",
                      },
                    })}
                  />
                  {errors.notes && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.notes.message}
                    </p>
                  )}
                </div>

                <div>
                  {user ? (
                    <button
                      type="submit"
                      className="block bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
                    >
                      Place Order
                    </button>
                  ) : (
                    <p className="">
                      Please{" "}
                      <Link
                        to="/auth"
                        className="text-primary-500 hover:text-primary-600"
                      >
                        login
                      </Link>{" "}
                      to proceed with checkout.
                    </p>
                  )}
                </div>
              </form>
            </div>

            <div className="details lg:col-start-3 order-1 lg:order-2">
              <div className="items-table">
                <table className="w-full border border-gray-200 dark:border-gray-900 rounded-lg shadow-md">
                  <thead className="bg-neutral-100 dark:bg-neutral-950">
                    <tr>
                      <th className="text-left p-4">Item</th>
                      <th className="text-left p-4">Quantity</th>
                      <th className="text-left p-4">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-200 dark:border-gray-900"
                      >
                        <td className="p-4">{item.name}</td>
                        <td className="p-4">{item.quantity}</td>
                        <td className="p-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-neutral-100 dark:bg-neutral-950">
                    <tr>
                      <td className="p-4 font-bold">Total</td>
                      <td className="p-4 font-bold">{totalItems}</td>
                      <td className="p-4 font-bold">
                        ${totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <>
          {isComplete ? (
            <div className="text-center py-20 bg-green-900/10 max-w-xl mx-auto mt-16 p-8 rounded-lg">
              <CircleCheckBig className="mx-auto w-16 h-16 text-green-600 mb-4" />
              <h1 className="text-3xl font-bold mb-4">Order Complete!</h1>
              <p className="text-lg">
                Thank you for your order. You will be redirected to the home
                page shortly.
              </p>
            </div>
          ) : (
            <div className="text-center py-20 bg-red-900/10 max-w-xl mx-auto mt-16 p-8 rounded-lg">
              <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-lg">
                Please add items to your cart before proceeding to checkout.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}
