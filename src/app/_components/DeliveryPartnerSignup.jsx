"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DeliveryPartnerSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (!name || !password || !confirmPassword || !city || !address || !phone) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/signup",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          password,
          city,
          address,
          phone,
        }),
      }
    );
    response = await response.json();

    if (response.success) {
      alert("Successfully Signed Up");
      const { result } = response;
      delete result.password;
      localStorage.setItem("deliverypartners", JSON.stringify(result));
      router.push("/deliverypartner/dashboard");
    } else {
      alert("Failed to Sign Up");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !name && (
            <span className="text-red-500 text-sm">Please Enter Name</span>
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
            <span className="text-red-500 text-sm">Please Enter Password</span>
          )}
          {passwordError && (
            <span className="text-red-500 text-sm">Passwords do not match</span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !confirmPassword && (
            <span className="text-red-500 text-sm">
              Please Enter Confirm Password
            </span>
          )}
          {passwordError && (
            <span className="text-red-500 text-sm">Passwords do not match</span>
          )}
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !city && (
            <span className="text-red-500 text-sm">Please Enter City</span>
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
            <span className="text-red-500 text-sm">Please Enter Address</span>
          )}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !phone && (
            <span className="text-red-500 text-sm">
              Please Enter Phone Number
            </span>
          )}
        </div>
      </div>
      <button
        onClick={handleSignUp}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Create Account
      </button>
    </div>
  );
};

export default DeliveryPartnerSignup;
