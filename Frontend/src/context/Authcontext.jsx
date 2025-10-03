import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check auth using /me endpoint or token in localStorage
  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setUser(null);
        return;
      }

      const res = await axiosInstance.get("/api/auth/me"); // token sent automatically via axios interceptor
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        toast.success("Login Successfully");
        navigate("/dashboard");
      }
      return res.data;
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axiosInstance.post("/api/auth/signup", { name, email, password });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        toast.success("Register Successfully");
        navigate("/dashboard");
      }
      return res.data;
    } catch (error) {
      console.error(error);
      toast.error("Register failed");
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    } finally {
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  return (
    <Authcontext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        checkAuth,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
