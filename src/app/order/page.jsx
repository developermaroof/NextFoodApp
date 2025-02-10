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

  const handleOrderNow = async () => {
    let user_id = JSON.parse(localStorage.getItem("user"))._id;
    let cart = JSON.parse(localStorage.getItem("cartData"));
    let foodItemIds = cart.map((item) => item._id).toString();
    let resto_id = cart[0].food_id;
    let deliveryBoy = "67966d234f263498a4511023";
    let collection = {
      user_id,
      resto_id,
      foodItemIds,
      deliveryBoy,
      status: "confirmed",
      amount: totalAmount.toFixed(2),
    };
    let response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify(collection),
    });
    response = await response.json();
    if (response.success) {
      alert("Order Placed Successfully");
    } else {
      alert("Failed to Place Order");
    }
  };

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
          <button onClick={handleOrderNow}>Place Your Order Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
