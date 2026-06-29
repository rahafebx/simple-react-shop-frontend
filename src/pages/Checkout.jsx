import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { CircleCheckBig } from "lucide-react";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import FormField from "../components/FormField";
import Breadcrumb from "../components/Breadcrumb";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const [isComplete, setIsComplete] = useState(false);

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

  const onSubmit = useCallback(() => {
    clearCart();
    setIsComplete(true);
  }, [clearCart]);

  useEffect(() => {
    if (!isComplete) return;
    const id = setTimeout(() => {
      setIsComplete(false);
      navigate("/");
    }, 5000);
    return () => clearTimeout(id);
  }, [isComplete, navigate]);

  if (cartItems.length === 0 && !isComplete) {
    return null;
  }

  return (
    <>
      <Breadcrumb items={[
        { to: "/", label: "Home" },
        { label: "Checkout" },
      ]} />

      {!isComplete && cartItems.length > 0 ? (
        <Container className="text-gray-900 dark:text-gray-50 py-10">
          <h1 className="text-3xl font-bold mb-10">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-[repeat(3,_1fr)] gap-16">
            <div className="form lg:col-span-2 order-2 lg:order-1">
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Please fill in your details below to complete the checkout process.
                </p>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  label="Name"
                  id="name"
                  placeholder="Enter your name"
                  defaultValue={user?.name || ""}
                  error={errors.name?.message}
                  registration={register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                    maxLength: { value: 30, message: "Name must be at most 30 characters" },
                  })}
                />

                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  defaultValue={user?.email || ""}
                  error={errors.email?.message}
                  registration={register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                  })}
                />

                <FormField
                  label="Address"
                  id="address"
                  placeholder="Enter your address"
                  error={errors.address?.message}
                  registration={register("address", {
                    required: "Address is required",
                    minLength: { value: 2, message: "Address must be at least 2 characters" },
                    maxLength: { value: 150, message: "Address must be at most 150 characters" },
                  })}
                />

                <FormField
                  label="Phone"
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  error={errors.phone?.message}
                  registration={register("phone", {
                    required: "Phone is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Please enter a valid 10-digit phone number" },
                  })}
                />

                <FormField
                  label="Notes"
                  id="notes"
                  type="textarea"
                  placeholder="Enter any additional notes"
                  error={errors.notes?.message}
                  registration={register("notes", {
                    maxLength: { value: 200, message: "Notes must be at most 200 characters" },
                  })}
                />

                <div>
                  {user ? (
                    <button
                      type="submit"
                      className="block bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
                    >
                      Place Order
                    </button>
                  ) : (
                    <p>
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
              <div className="items-table text-sm">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
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