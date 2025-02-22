"use client";
import React, { useState, useEffect, useMemo } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Cart = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadCartData = () => {
      try {
        const data = localStorage.getItem("cartData");
        if (data) {
          setCartStorage(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error reading cart data from localStorage:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCartData();
  }, []);

  // Memoize total calculation to avoid unnecessary recalculations
  const total = useMemo(() => {
    return cartStorage.reduce((sum, item) => {
      const numericPrice = Number(String(item.price).replace(/[^0-9.]/g, ""));
      return sum + (isNaN(numericPrice) ? 0 : numericPrice);
    }, 0);
  }, [cartStorage]);

  // Tax (5%), delivery fee and total amount
  const taxRate = 5;
  const tax = (total * taxRate) / 100;
  const delivery = 200;
  const totalAmount = total + tax + delivery;

  const handleRemoveFromCart = (id) => {
    const updated = cartStorage.filter((item) => item._id !== id);
    setCartStorage(updated);
    try {
      localStorage.setItem("cartData", JSON.stringify(updated));
    } catch (error) {
      console.error("Error updating cart data in localStorage:", error);
    }
  };

  const handleOrderNow = async () => {
    setOrderLoading(true);
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
    if (user) {
      await router.push("/order");
    } else {
      await router.push("/user-auth?order=true");
    }
    // No need to call setOrderLoading(false) because navigation will unmount the component.
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <SkeletonTheme baseColor="#f5f5f5" highlightColor="#db9721">
            <div className="text-center py-20">
              <Skeleton height={40} width={200} className="mx-auto mb-8" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skeleton for Cart Items */}
                <div>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-lg rounded-lg p-6 mb-6"
                    >
                      <Skeleton height={30} width="80%" className="mb-4" />
                      <Skeleton count={2} />
                      <Skeleton height={20} width="50%" className="mt-4" />
                    </div>
                  ))}
                </div>
                {/* Skeleton for Summary */}
                <div className="bg-white shadow-xl rounded-lg p-6 h-full">
                  <Skeleton height={40} width="60%" className="mb-6" />
                  <div className="space-y-4 mb-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} height={20} width="90%" />
                    ))}
                  </div>
                  <Skeleton height={50} width="100%" />
                </div>
              </div>
            </div>
          </SkeletonTheme>
        ) : cartStorage.length > 0 ? (
          <>
            <h1 className="text-4xl font-bold text-center text-amber-700 mb-8">
              Your Cart
            </h1>
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
                  disabled={orderLoading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg text-xl font-bold transition-colors disabled:opacity-50"
                >
                  {orderLoading ? "Processing..." : "Order Now"}
                </button>
              </div>
            </div>
          </>
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
