import React from "react";

const RestaurantLogin = () => {
  return (
    <>
      <h1>Login</h1>
      <div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="email"
            placeholder="Enter Email ID"
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <div className="input-wrapper">
          <button className="button">Login</button>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
