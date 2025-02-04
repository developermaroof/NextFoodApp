"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Cart = () => {
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

      <div className="food-item-wrapper">
        {cartStorage.length > 0 ? (
          cartStorage.map((item) => (
            <div className="list-item" key={item._id}>
              <div className="list-item-block-1">
                <img src={item.path} alt={item.name} />
              </div>
              <div className="list-item-block-2">
                <div>{item.name}</div>
                <div className="description">{item.description}</div>
                <button onClick={() => handleRemoveFromCart(item._id)}>
                  Remove from cart
                </button>
              </div>
              <div className="list-item-block-3">
                Price: {Number(item.price).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <h1>No food items added for now...</h1>
        )}
      </div>

      <div className="total-wrapper">
        <div className="block-1">
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
        <div className="block-2">
          <button>Order Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
