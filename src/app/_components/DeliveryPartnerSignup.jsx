"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      let response = await fetch("/api/deliverypartners/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          password,
          city,
          address,
          phone,
        }),
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Successfully Signed Up");
        const { result } = data;
        delete result.password;
        localStorage.setItem("deliverypartners", JSON.stringify(result));
        router.push("/deliverypartner/dashboard");
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
            type="number"
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
        disabled={loading}
        className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </div>
  );
};

export default DeliveryPartnerSignup;
