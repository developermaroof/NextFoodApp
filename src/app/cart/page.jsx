"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Cart = () => {
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cartData"))
  );
  return (
    <div>
      <CustomerHeader />

      <div className="food-item-wrapper">
        {cartStorage.length > 0 ? (
          cartStorage.map((item) => (
            <div className="list-item">
              <div className="list-item-block-1">
                <img src={item.path} />
              </div>
              <div className="list-item-block-2">
                <div>{item.name}</div>

                <div className="description">{item.description}</div>
                {
                  <button onClick={() => handleRemoveFromCart(item._id)}>
                    Remove from cart
                  </button>
                }
              </div>
              <div className="list-item-block-3">Price: {item.price}</div>
            </div>
          ))
        ) : (
          <h1>No food items added for now...</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
