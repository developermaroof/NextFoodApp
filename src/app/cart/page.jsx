"use client";
import React, { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [cartStorage, setCartStorage] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("cartData");
    if (data) {
      setCartStorage(JSON.parse(data));
    }
  }, []);

  const total = cartStorage.reduce((sum, item) => {
    const numericPrice = Number(String(item.price).replace(/[^0-9.]/g, ""));
    return sum + (isNaN(numericPrice) ? 0 : numericPrice);
  }, 0);

  const router = useRouter();

  // Tax calculation (5% example)
  const taxRate = 5;
  const tax = (total * taxRate) / 100;
  const delivery = 200;
  const totalAmount = total + tax + delivery;

  const handleRemoveFromCart = (id) => {
    const updated = cartStorage.filter((item) => item._id !== id);
    setCartStorage(updated);
    localStorage.setItem("cartData", JSON.stringify(updated));
  };

  const handleOrderNow = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-amber-700 mb-8">
          Your Cart
        </h1>

        {cartStorage.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cart Items */}
            <div>
              {cartStorage.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-700">
                        Price: {Number(item.price).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white shadow-xl rounded-lg p-6 h-full">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
                Summary
              </h2>
              <div className="space-y-4 mb-6 text-gray-700">
                <div className="flex justify-between">
                  <span>Food Charges:</span>
                  <span>{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({taxRate}%):</span>
                  <span>{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges:</span>
                  <span>{delivery.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-800 border-t pt-3">
                  <span>Total Amount:</span>
                  <span>{totalAmount.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={handleOrderNow}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg text-xl font-bold transition-colors"
              >
                Order Now
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">
              No food items added for now...
            </h2>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
