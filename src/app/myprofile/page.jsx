"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyProfile = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMyOrders();
  }, []);

  const loadMyOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = localStorage.getItem("user");
      const userStorage = userData ? JSON.parse(userData) : null;
      if (userStorage && userStorage._id) {
        let response = await fetch(`/api/order?id=${userStorage._id}`);
        response = await response.json();
        if (response.success) {
          setMyOrders(response.result);
        } else {
          setError(response.message || "Failed to load orders.");
        }
      } else {
        setError("User not logged in.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <CustomerHeader />
        <main className="container mx-auto px-4 py-8 flex-grow text-center">
          <SkeletonTheme baseColor="#f5f5f5" highlightColor="#db9721">
            <Skeleton height={40} width={300} className="mx-auto mb-8" />
            <Skeleton count={5} />
          </SkeletonTheme>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <CustomerHeader />
        <main className="container mx-auto px-4 py-8 flex-grow text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={loadMyOrders}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </main>
        <Footer />
      </div>
    );
  }

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
                key={`${item.data?._id}-${index}`}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Order ID: {item.data?._id}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Restaurant Name:</span>{" "}
                  {item.data?.restaurantName}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">City:</span> {item.data?.city}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Address:</span>{" "}
                  {item.data?.address}
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
