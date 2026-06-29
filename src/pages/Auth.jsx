import { useContext, useState } from "react";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigation = useNavigate();
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [user, login, signup, message] = [
    useContext(AuthContext).user,
    useContext(AuthContext).login,
    useContext(AuthContext).signup,
    useContext(AuthContext).message,
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (mode === "login") {
      login(data.email, data.password);
    } else {
      signup(data.email, data.password, data.name);
    }
    if(!message.content) {
        navigation("/") // redirect to home page after successful login
    }
  };

  return (
    <>
      {user ? (
        <Container className="text-center pt-20 bp-8 text-gray-900 dark:text-gray-50">
          <h1 className="text-4xl font-bold mb-4">Welcome, {user.name}!</h1>
          <p className="text-lg mb-6">
            You are now logged in. Enjoy shopping at REBEX Shop.
          </p>
          <p className="text-lg mb-6">
            <a
              href="/"
              className="text-blue-500 hover:text-blue-700"
            >
              Continue Shopping
            </a>
          </p>
        </Container>
      ) : (
        <>
          <Container
            as="section"
            className="text-center pt-20 bp-8 text-gray-900 dark:text-gray-50"
          >
            <h1 className="text-4xl font-bold mb-4">Welcome to REBEX Shop</h1>
            <p className="text-lg mb-6">
              Please log in or sign up to continue shopping.
            </p>
          </Container>

          <Container
            as="section"
            className="py-8 text-gray-900 dark:text-gray-50"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto p-8 rounded shadow-md bg-neutral-100 dark:bg-neutral-950"
            >
              <h2 className="text-3xl font-bold mb-4 text-center">
                {mode === "login" ? "Log In" : "Sign Up"}
              </h2>
              {message.content && (
                <div
                  className={`mb-6 p-4 rounded-md ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                >
                  {message.content}
                </div>
              )}
              <div className="mb-6">
                {mode === "signup" && (
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
                      placeholder="Enter your name"
                      className={`block text-sm w-full px-4 py-2 h-12 border rounded-md focus:outline-0 
                    ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}
                    `}
                      {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name must be at least 2 characters" }, maxLength: { value: 30, message: "Name must be at most 30 characters" } })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`block text-sm w-full px-4 py-2 h-12 border rounded-md focus:outline-0 
                ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}
                `}
                  {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className={`block text-sm w-full px-4 py-2 h-12 border rounded-md focus:outline-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}
                `}
                  {...register(
                    "password",
                    {
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password must be at most 12 characters",
                      },
                      required: "Password is required"
                    },
                      
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="block mx-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
              >
                {mode === "login" ? "Log In" : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
              >
                {mode === "login" ? "Sign Up" : "Log In"}
              </button>
            </p>
          </Container>
        </>
      )}
    </>
  );
}
