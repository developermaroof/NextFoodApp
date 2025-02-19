"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        login: true,
      }),
    });
    response = await response.json();

    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
      alert("Successfully Logged In");
    } else {
      alert("Invalid Email or Password");
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
        />
        {error && !password && (
          <span className="text-red-500 text-sm">Password is Required</span>
        )}
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Login
      </button>
    </div>
  );
};

export default RestaurantLogin;
