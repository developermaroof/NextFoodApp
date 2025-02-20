"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DeliveryPartnerLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!phone || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let response = await fetch("/api/deliverypartners/login", {
      method: "POST",
      body: JSON.stringify({
        phone,
        password,
      }),
    });
    response = await response.json();

    if (response.success) {
      alert("Successfully Logged In");
      const { result } = response;
      delete result.password;
      localStorage.setItem("deliverypartners", JSON.stringify(result));
      router.push("/deliverypartner/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <input
          type="tel"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {error && !phone && (
          <span className="text-red-500 text-sm">Phone Number is Required</span>
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
      <div>
        <button
          onClick={handleLogin}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default DeliveryPartnerLogin;
