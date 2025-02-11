"use client";
import React, { useState } from "react";

const DeliveryPartner = () => {
  // login states
  const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // signup states
  const [name, setName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [signupPhoneNumber, setSignupPhoneNumber] = useState("");

  const handleLogin = () => {
    console.log(loginPhoneNumber, loginPassword);
  };

  const handleSignup = () => {
    console.log(
      name,
      signupPhoneNumber,
      signupPassword,
      signupConfirmPassword,
      city,
      address
    );
  };

  return (
    <div>
      <h1>Delivery Partner</h1>
      <div className="auth-container">
        <div className="login-wrapper">
          <h3>Login</h3>
          <div className="input-wrapper">
            <input
              value={loginPhoneNumber}
              onChange={(e) => setLoginPhoneNumber(e.target.value)}
              className="input-field"
              type="tel"
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="input-wrapper">
            <input
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="input-field"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="input-wrapper">
            <button onClick={handleLogin} className="button">
              Login
            </button>
          </div>
        </div>

        <div className="signup-wrapper">
          <h3>SignUp</h3>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <input
              className="input-field"
              type="password"
              placeholder="Enter Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="password"
              placeholder="Enter Confirm Password"
              value={signupConfirmPassword}
              onChange={(e) =>
                setSignupConfirmPasswordignupConfirmPassword(e.target.value)
              }
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="tel"
              placeholder="Enter Phone Number"
              value={signupPhoneNumber}
              onChange={(e) => setSignupPhoneNumber(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <button onClick={handleSignup} className="button">
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartner;
