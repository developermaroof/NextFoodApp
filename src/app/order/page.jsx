"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Order = () => {
  const [userStorage, setUserStorage] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [cartStorage, setCartStorage] = useState(() => {
    const data = localStorage.getItem("cartData");
    return data ? JSON.parse(data) : [];
  });

  const [total] = useState(() =>
    cartStorage.reduce((sum, item) => {
      const numericPrice = Number(String(item.price).replace(/[^0-9.]/g, ""));
      return sum + (isNaN(numericPrice) ? 0 : numericPrice);
    }, 0)
  );

  // Tax calculation (5% example)
  const taxRate = 5; // 5% tax rate
  const tax = (total * taxRate) / 100;
  const delivery = 200;
  const totalAmount = total + tax + delivery;

  return (
    <div>
      <CustomerHeader />

      <div className="total-wrapper">
        <div className="block-1">
          <div>
            <h2>User Details</h2>
            <div className="row">
              <span>Name: </span>
              <span>{userStorage.name}</span>
            </div>
            <div className="row">
              <span>Address: </span>
              <span>{userStorage.address}</span>
            </div>
            <div className="row">
              <span>Email: </span>
              <span>{userStorage.email}</span>
            </div>
            <div className="row">
              <span>Contact No: </span>
              <span>{userStorage.contact}</span>
            </div>
            <div className="row">
              <span>City:</span>
              <span>{userStorage.city}</span>
            </div>
          </div>

          <div>
            <h2>Amount Details</h2>
            <div className="row">
              <span>Food Charges: </span>
              <span>{total.toLocaleString()}</span>
            </div>
            <div className="row">
              <span>Tax ({taxRate}%): </span>
              <span>{tax.toLocaleString()}</span>
            </div>
            <div className="row">
              <span>Delivery Charges: </span>
              <span>{delivery.toLocaleString()}</span>
            </div>
            <div className="row">
              <span>Total Amount: </span>
              <span>{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <h2>Payment Methods</h2>
            <div className="row">
              <span>Cash on Delivery: </span>
              <span>{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="block-2">
          <button>Place Your Order Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
