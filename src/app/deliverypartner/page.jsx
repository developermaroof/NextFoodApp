"use client";
import React, { useState } from "react";
import DeliveryPartnerLogin from "../_components/DeliveryPartnerLogin";
import DeliveryPartnerSignup from "../_components/DeliveryPartnerSignup";
import DeliveryPartnerHeader from "../_components/DeliveryPartnerHeader";
import Footer from "../_components/Footer";

const DeliveryPartnerAuth = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <DeliveryPartnerHeader />
      <main className="flex-grow bg-gradient-to-b from-orange-50 to-amber-50 py-12">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {login ? "Welcome Back!" : "Create Account"}
          </h1>
          <div
            className={`transition-opacity duration-500 ${
              login ? "opacity-100" : "opacity-0"
            }`}
          >
            {login && <DeliveryPartnerLogin />}
          </div>
          <div
            className={`transition-opacity duration-500 ${
              login ? "opacity-0" : "opacity-100"
            }`}
          >
            {!login && <DeliveryPartnerSignup />}
          </div>
          <button
            onClick={() => setLogin(!login)}
            aria-label={
              login ? "Switch to sign up form" : "Switch to login form"
            }
            className="mt-6 text-amber-600 hover:text-amber-700 text-sm font-medium w-full text-center"
          >
            {login
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryPartnerAuth;
