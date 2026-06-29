import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  // initialize user from localStorage to avoid calling setState synchronously in an effect
  const [user, setUser] = useState(() => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const authenticatedUser = users.find((u) => u.isAuth === true);
      return authenticatedUser || null;
    } catch (e) {
      return null;
    }
  });

  const [message, setMessage] = useState({
    content: "",
    type: "", // 'success' or 'error'
  });

  const signup = (email, password, name) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userData = { email, password, name };
    if (users.some((user) => user.email === email)) {
      setMessage({
        content: "User already exists, please log in instead.",
        type: "error",
      });
      return;
    }

    const newUser = { ...userData, isAuth: true };
    setUser(newUser);
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "/"; // redirect to home page after successful signup
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const storedUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (storedUser) {
      setUser({ ...storedUser, isAuth: true });
      // Update the isAuth property of the logged-in user to true
      const updatedUsers = users.map((user) =>
        user.email === email ? { ...user, isAuth: true } : user,
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      window.location.href = "/"; // redirect to home page after successful login
    } else {
      setMessage({
        content: "Invalid email or password.",
        type: "error",
      });
    }
  };

  const logout = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // change the isAuth property of the logged-out user to false
    const updatedUsers = users.map((user) =>
      user.isAuth ? { ...user, isAuth: false } : user,
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, message, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
