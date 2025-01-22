"use client";
import React, { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignup from "../_components/restaurantSignup";

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <h1>Restaurant Login/Signup Page</h1>
        {login ? <RestaurantLogin /> : <RestaurantSignup />}

        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login
              ? "Don't have an account? SignUp"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
