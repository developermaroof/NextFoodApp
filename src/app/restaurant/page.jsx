"use client";
import React, { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";

const Restaurant = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <RestaurantHeader />
      <main className="flex-grow bg-gradient-to-b from-orange-50 to-amber-50 py-12">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {login ? "Welcome Back!" : "Create Account"}
          </h1>
          {login ? <RestaurantLogin /> : <RestaurantSignup />}
          <button
            onClick={() => setLogin(!login)}
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

export default Restaurant;
