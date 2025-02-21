"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSignUp = async () => {
    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !city ||
      !address ||
      !contact
    ) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          city,
          address,
          contact,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Successfully Signed Up");
        const { result } = data;
        delete result.password;
        localStorage.setItem("user", JSON.stringify(result));
        if (searchParams?.get("order")) {
          router.push("/order");
        } else {
          router.push("/");
        }
      } else {
        toast.error("Failed to Sign Up");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Sign Up
      </h1>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter City"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />

          <input
            type="text"
            placeholder="Enter Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
          />

          <input
            type="tel"
            placeholder="Enter Contact Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
      <button
        onClick={handleSignUp}
        disabled={loading}
        className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>
    </div>
  );
};

export default UserSignUp;
