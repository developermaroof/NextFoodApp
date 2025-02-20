"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RestaurantSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignUp = async () => {
    if (password !== confPassword) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (
      !email ||
      !password ||
      !confPassword ||
      !restaurantName ||
      !city ||
      !address ||
      !contact
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let response = await fetch("/api/restaurant", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        restaurantName,
        city,
        address,
        contact,
      }),
    });
    response = await response.json();
    if (response.success) {
      alert("Successfully Signed Up");
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    } else {
      alert("Failed to Sign Up");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Sign Up
      </h1>
      <div className="space-y-6">
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
          {passwordError && (
            <span className="text-red-500 text-sm">Passwords do not match</span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !confPassword && (
            <span className="text-red-500 text-sm">
              Confirm Password is Required
            </span>
          )}
          {passwordError && (
            <span className="text-red-500 text-sm">Passwords do not match</span>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !restaurantName && (
            <span className="text-red-500 text-sm">
              Restaurant Name is Required
            </span>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !city && (
            <span className="text-red-500 text-sm">City is Required</span>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !address && (
            <span className="text-red-500 text-sm">Address is Required</span>
          )}
        </div>
        <div>
          <input
            type="number"
            placeholder="Enter Contact No."
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !contact && (
            <span className="text-red-500 text-sm">Contact No is Required</span>
          )}
        </div>
      </div>
      <button
        onClick={handleSignUp}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Sign Up
      </button>
    </div>
  );
};

export default RestaurantSignup;
