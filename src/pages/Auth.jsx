import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "../components/Container";
import FormField from "../components/FormField";
import { useAuth } from "../context/useAuth";

export default function Auth() {
  const navigation = useNavigate();
  const [mode, setMode] = useState("login");
  const { user, login, signup, message } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let isLoginSuccessful = false;
    let isSignupSuccessful = false;

    if (mode === "login") {
      isLoginSuccessful = login(data.email, data.password);
    } else {
      isSignupSuccessful = signup(data.email, data.password, data.name);
    }
    if(isLoginSuccessful || isSignupSuccessful) {
        navigation("/")
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
            <Link
              to="/"
              className="text-primary-500 hover:text-primary-700"
            >
              Continue Shopping
            </Link>
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
                  <FormField
                    label="Name"
                    id="name"
                    placeholder="Enter your name"
                    error={errors.name?.message}
                    registration={register("name", {
                      required: "Name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" },
                      maxLength: { value: 30, message: "Name must be at most 30 characters" },
                    })}
                  />
                )}
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  registration={register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                  })}
                />
              </div>
              <div className="mb-6">
                <FormField
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  registration={register("password", {
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    maxLength: { value: 12, message: "Password must be at most 12 characters" },
                    required: "Password is required",
                  })}
                />
              </div>
              <button
                type="submit"
                className="block mx-auto bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors duration-200 cursor-pointer"
              >
                {mode === "login" ? "Log In" : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                className="text-primary-500 dark:text-primary-400 cursor-pointer hover:underline"
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