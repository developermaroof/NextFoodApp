"use client";
import DeliveryPartnerHeader from "@/app/_components/DeliveryPartnerHeader";
import Footer from "@/app/_components/Footer";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    loadMyOrders();
  }, []);

  const loadMyOrders = async () => {
    const deliveryPartnerStorage = JSON.parse(
      localStorage.getItem("deliverypartners")
    );
    let response = await fetch(
      `http://localhost:3000/api/deliverypartners/orders/${deliveryPartnerStorage._id}`
    );
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DeliveryPartnerHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-center text-amber-700 mb-10">
          Delivery Partner Dashboard
        </h1>
        {myOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myOrders.map((item) => (
              <div
                key={item.data._id}
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
                <p className="text-gray-600 mb-3">
                  <span className="font-medium">Total Amount:</span>{" "}
                  {item.amount.toLocaleString()}
                </p>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Update Status:
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                    <option>Confirm</option>
                    <option>Delivered</option>
                    <option>Cancel</option>
                  </select>
                </div>
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

export default Dashboard;
