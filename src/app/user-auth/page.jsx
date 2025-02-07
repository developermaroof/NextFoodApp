"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";

const UserAuth = (props) => {
  const [login, setLogin] = useState(true);
  console.log("Props", props);

  return (
    <div>
      <CustomerHeader />
      <div className="container">
        <h1>{login ? "User Login" : "User SignUp"}</h1>
        {login ? (
          <UserLogin redirect={props.searchParams} />
        ) : (
          <UserSignUp redirect={props.searchParams} />
        )}
        <button className="button-link" onClick={() => setLogin(!login)}>
          {login
            ? "Do not have an account? SignUp"
            : "Already have an account? Login"}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default UserAuth;
