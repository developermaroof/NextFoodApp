"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeliveryPartnerLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!phone || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    setLoading(true);
    try {
      let response = await fetch("/api/deliverypartners/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Successfully Logged In");
        const { result } = data;
        delete result.password;
        localStorage.setItem("deliverypartners", JSON.stringify(result));
        router.push("/deliverypartner/dashboard");
      } else {
        toast.error("Login failed");
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
      <div>
        <input
          type="number"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          disabled={loading}
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
          disabled={loading}
        />
        {error && !password && (
          <span className="text-red-500 text-sm">Password is Required</span>
        )}
      </div>
      <div>
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
    </div>
  );
};

export default DeliveryPartnerLogin;
