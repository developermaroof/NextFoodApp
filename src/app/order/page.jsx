"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Order = () => {
  const [userStorage, setUserStorage] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [cartStorage, setCartStorage] = useState(() => {
    const data = localStorage.getItem("cartData");
    return data ? JSON.parse(data) : [];
  });
  const total = cartStorage.reduce((sum, item) => {
    const numericPrice = Number(String(item.price).replace(/[^0-9.]/g, ""));
    return sum + (isNaN(numericPrice) ? 0 : numericPrice);
  }, 0);

  const [removeCartData, setRemoveCartData] = useState(false);
  const router = useRouter();

  // Tax calculation (5% example)
  const taxRate = 5;
  const tax = (total * taxRate) / 100;
  const delivery = 200;
  const totalAmount = total + tax + delivery;

  useEffect(() => {
    if (!total) {
      router.push("/");
    }
  }, [total]);

  const handleOrderNow = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    let user_id = userData._id;
    let user_city = userData.city;

    let cart = JSON.parse(localStorage.getItem("cartData"));
    let foodItemIds = cart.map((item) => item._id).toString();
    let resto_id = cart[0].food_id;

    let deliveryBoyResponse = await fetch(
      `http://localhost:3000/api/deliverypartners/${user_city}`
    );
    deliveryBoyResponse = await deliveryBoyResponse.json();
    let deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id);
    let deliveryBoy_id =
      deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];
    if (!deliveryBoy_id) {
      alert("No delivery partners available in your city");
      return false;
    }

    let collection = {
      user_id,
      resto_id,
      foodItemIds,
      deliveryBoy_id,
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
      setRemoveCartData(true);
      router.push("/myprofile");
    } else {
      alert("Failed to Place Order");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerHeader removeCartData={removeCartData} />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-center text-amber-700 mb-10">
          Confirm Your Order
        </h1>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* User Details Card */}
          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
              User Details
            </h2>
            <div className="space-y-3 text-gray-700">
              <div>
                <span className="font-medium">Name:</span>{" "}
                <span>{userStorage.name}</span>
              </div>
              <div>
                <span className="font-medium">Address:</span>{" "}
                <span>{userStorage.address}</span>
              </div>
              <div>
                <span className="font-medium">Email:</span>{" "}
                <span>{userStorage.email}</span>
              </div>
              <div>
                <span className="font-medium">Contact No:</span>{" "}
                <span>{userStorage.contact}</span>
              </div>
              <div>
                <span className="font-medium">City:</span>{" "}
                <span>{userStorage.city}</span>
              </div>
            </div>
          </div>

          {/* Amount Details & Payment Card */}
          <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
                Amount Details
              </h2>
              <div className="space-y-3 text-gray-700">
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
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
                Payment Methods
              </h2>
              <div className="bg-amber-50 rounded-lg p-4 mb-6 text-center">
                <span className="text-lg font-medium text-amber-800">
                  Cash on Delivery
                </span>
              </div>
              <button
                onClick={handleOrderNow}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-colors text-xl"
              >
                Place Your Order Now
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Order;
