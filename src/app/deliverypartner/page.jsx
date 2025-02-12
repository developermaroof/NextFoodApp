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

  const handleLogin = async () => {
    console.log(loginPhoneNumber, loginPassword);
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/login",
      {
        method: "POST",
        body: JSON.stringify({
          phone: loginPhoneNumber,
          password: loginPassword,
        }),
      }
    );
    response = await response.json();
    if (response.success) {
      alert("Successfully LoggedIn");
      const { result } = response;
      delete result.password;
      localStorage.setItem("deliverypartners", JSON.stringify(result));
    } else {
      alert("Login failed");
    }
  };

  const handleSignUp = async () => {
    console.log(
      name,
      signupPassword,
      signupConfirmPassword,
      city,
      address,
      signupPhoneNumber
    );
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/signup",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          password: signupPassword,
          city,
          address,
          phone: signupPhoneNumber,
        }),
      }
    );
    response = await response.json();
    if (response.success) {
      alert("Successfully Signed Up");
      const { result } = response;
      delete result.password;
      localStorage.setItem("deliverypartners", JSON.stringify(result));
    } else {
      alert("Failed to Sign Up");
    }
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
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
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
            <button onClick={handleSignUp} className="button">
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartner;
