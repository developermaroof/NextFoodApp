"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    setLoading(true);
    try {
      const response = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          login: true,
        }),
      });
      const data = await response.json();

      if (data.success) {
        const { result } = data;
        delete result.password;
        localStorage.setItem("restaurantUser", JSON.stringify(result));
        router.push("/restaurant/dashboard");
        toast.success("Successfully Logged In");
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Login
      </h1>
      <div>
        <input
          type="email"
          placeholder="Enter Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          disabled={loading}
        />
        {error && !email && (
          <span className="text-red-500 text-sm">Email is Required</span>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          disabled={loading}
        />
        {error && !password && (
          <span className="text-red-500 text-sm">Password is Required</span>
        )}
      </div>
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default RestaurantLogin;
