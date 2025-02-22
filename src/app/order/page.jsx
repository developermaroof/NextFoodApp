"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Order = () => {
  const [userStorage, setUserStorage] = useState(null);
  const [cartStorage, setCartStorage] = useState([]);
  const [removeCartData, setRemoveCartData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = () => {
      try {
        if (typeof window !== "undefined") {
          const userData = localStorage.getItem("user");
          setUserStorage(userData ? JSON.parse(userData) : null);

          const cartData = localStorage.getItem("cartData");
          setCartStorage(cartData ? JSON.parse(cartData) : []);
        }
      } catch (error) {
        console.error("Error reading localStorage:", error);
        toast.error("Error loading user data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const total = cartStorage.reduce((sum, item) => {
    const numericPrice = Number(String(item.price).replace(/[^0-9.]/g, ""));
    return sum + (isNaN(numericPrice) ? 0 : numericPrice);
  }, 0);

  // Tax calculation (5% example)
  const taxRate = 5;
  const tax = (total * taxRate) / 100;
  const delivery = 200;
  const totalAmount = total + tax + delivery;

  const handleOrderNow = async () => {
    if (!userStorage || cartStorage.length === 0) {
      toast.error("User information or cart data is missing.");
      return;
    }
    setOrderLoading(true);
    try {
      const { _id: user_id, city: user_city } = userStorage;
      const cart = cartStorage;
      let foodItemIds = cart.map((item) => item._id).toString();
      let resto_id = cart[0].food_id;

      // Fetch delivery partners based on user city
      let deliveryPartnerResponse = await fetch(
        `/api/deliverypartners/${user_city}`
      );
      if (!deliveryPartnerResponse.ok) {
        toast.error("Failed to fetch delivery partners.");
        setOrderLoading(false);
        return;
      }
      const deliveryPartnerData = await deliveryPartnerResponse.json();
      let deliveryBoyIds = deliveryPartnerData.result.map((item) => item._id);
      let deliveryBoy_id =
        deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];
      if (!deliveryBoy_id) {
        toast.error("No delivery partners available in your city.");
        setOrderLoading(false);
        return;
      }

      let collection = {
        user_id,
        resto_id,
        foodItemIds,
        deliveryBoy_id,
        status: "confirmed",
        amount: totalAmount.toFixed(2),
      };

      // Place the order
      let response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collection),
      });
      if (!response.ok) {
        toast.error("Failed to place order. Please try again later.");
        setOrderLoading(false);
        return;
      }
      let responseData = await response.json();
      if (responseData.success) {
        toast.success("Order Placed Successfully");
        setRemoveCartData(true);
        router.push("/myprofile");
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order.");
    } finally {
      setOrderLoading(false);
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

  if (!userStorage || cartStorage.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <CustomerHeader />
        <main className="container mx-auto px-4 py-8 flex-grow text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            No order information available.
          </h2>
          <p className="mt-4 text-gray-600">
            Please ensure you are logged in and have items in your cart.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to Home
          </button>
        </main>
        <Footer />
      </div>
    );
  }

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
                disabled={orderLoading}
                className={`w-full ${
                  orderLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700"
                } text-white font-bold py-3 rounded-lg transition-colors text-xl`}
              >
                {orderLoading ? "Processing..." : "Place Your Order Now"}
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
