import { createContext, useState, useContext } from "react";

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
    const updatedUsers = [
      ...users.map((user) => ({ ...user, isAuth: false })),
      newUser,
    ];
    setUser(newUser);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const storedUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (storedUser) {
      const updatedUsers = users.map((user) => ({
        ...user,
        isAuth: user.email === email,
      }));
      setUser(updatedUsers.find((user) => user.email === email) || null);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
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


export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}