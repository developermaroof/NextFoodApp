"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Successfully Logged In");
        const { result } = data;
        delete result.password;
        localStorage.setItem("user", JSON.stringify(result));
        if (searchParams?.get("order")) {
          router.push("/order");
        } else {
          router.push("/");
        }
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
          type="text"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <button
          className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
