"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const MyProfile = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    loadMyOrders();
  }, []);

  const loadMyOrders = async () => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    let response = await fetch(
      `http://localhost:3000/api/order?id=${userStorage._id}`
    );
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-center text-amber-700 mb-10">
          My Profile
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h2>
        {myOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myOrders.map((item, index) => (
              <div
                key={`${item.data._id}-${index}`}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Order ID: {item.data._id}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Restaurant Name:</span>{" "}
                  {item.data.restaurantName}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">City:</span> {item.data.city}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Address:</span>{" "}
                  {item.data.address}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Total Amount:</span>{" "}
                  {item.amount}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Status:</span> {item.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Orders Found
            </h2>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyProfile;
