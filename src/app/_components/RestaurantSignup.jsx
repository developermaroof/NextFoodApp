import React from "react";

const RestaurantSignup = () => {
  return (
    <>
      <h1>SignUp</h1>
      <div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="email"
            placeholder="Enter EmailID"
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
          <input
            className="input-field"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Restaurant Name"
          />
        </div>
        <div className="input-wrapper">
          <input className="input-field" type="text" placeholder="Enter City" />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Address"
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="number"
            placeholder="Enter Contact No."
          />
        </div>
        <div className="input-wrapper">
          <button className="button">SignUp</button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignup;
