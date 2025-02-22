"use client";
import React, { Suspense, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";

const UserAuth = () => {
  const [login, setLogin] = useState(true);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-orange-50 to-amber-50">
          <div className="text-xl text-amber-600">Loading...</div>
        </div>
      }
    >
      <div className="min-h-screen flex flex-col">
        <CustomerHeader />
        <main className="flex-grow bg-gradient-to-b from-orange-50 to-amber-50 py-12">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {login ? "Welcome Back!" : "Create Account"}
            </h1>
            <div className="relative h-auto">
              <div
                className={`transition-opacity duration-500 ${
                  login ? "opacity-100" : "opacity-0"
                }`}
              >
                {login && <UserLogin />}
              </div>
              <div
                className={`transition-opacity duration-500 ${
                  login ? "opacity-0" : "opacity-100"
                }`}
              >
                {!login && <UserSignUp />}
              </div>
            </div>
            <button
              onClick={() => setLogin(!login)}
              aria-label={
                login ? "Switch to Sign Up form" : "Switch to Log In form"
              }
              className="mt-6 text-amber-600 hover:text-amber-700 text-sm font-medium w-full text-center"
            >
              {login
                ? "Don't have an account? Sign Up"
                : "Already have an account? Log In"}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
};

export default UserAuth;
