"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Details = () => {
  // Unwrap dynamic route params and search params
  const params = useParams();
  const searchParams = useSearchParams();

  const restaurantName = params.name; // Resolved dynamic route param
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsError, setDetailsError] = useState(null);

  // Lazy initialize cartStorage only on client
  const [cartStorage, setCartStorage] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cartData");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Derive cartId from cartStorage
  const [cartId, setCartId] = useState(() =>
    cartStorage.map((item) => item._id)
  );
  const [cartData, setCartData] = useState(null);
  const [removeCartData, setRemoveCartData] = useState(null);

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    setLoading(true);
    setDetailsError(null);
    try {
      const id = searchParams.get("id");
      let response = await fetch(`/api/customer/${id}`);
      const data = await response.json();
      if (data.success) {
        setRestaurantDetails(data.restaurantDetails);
        setFoodItems(data.foodItems);
      } else {
        setDetailsError(data.message || "Failed to load restaurant details.");
      }
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      setDetailsError("Error fetching restaurant details.");
    } finally {
      setLoading(false);
    }
  };

  // Persist cartStorage changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartData", JSON.stringify(cartStorage));
    }
  }, [cartStorage]);

  const handleAddToCart = (item) => {
    setCartData(item);
    const newCartIds = [...cartId, item._id];
    setCartId(newCartIds);
    setCartStorage((prev) => [...prev, item]);
    setRemoveCartData(null);
  };

  const handleRemoveFromCart = (id) => {
    setRemoveCartData(id);
    const updatedCartIds = cartId.filter((itemId) => itemId !== id);
    setCartId(updatedCartIds);
    setCartStorage((prev) => prev.filter((item) => item._id !== id));
    setCartData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />

      {/* Restaurant Banner */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {decodeURI(restaurantName)}
          </h1>
        </div>
      </div>

      {/* Restaurant Details Card */}
      {loading ? (
        <SkeletonTheme baseColor="#f5f5f5" highlightColor="#db9721">
          <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <h4 className="font-semibold">Contact:</h4>
              <p>
                <Skeleton width={200} height={20} />
              </p>
              <h4 className="font-semibold">City:</h4>
              <p>
                <Skeleton width={200} height={20} />
              </p>
              <h4 className="font-semibold">Address:</h4>
              <p>
                <Skeleton width={200} height={20} />
              </p>
              <h4 className="font-semibold">Email:</h4>
              <p>
                <Skeleton width={200} height={20} />
              </p>
            </div>
          </div>
        </SkeletonTheme>
      ) : detailsError ? (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md text-center text-red-500">
          <p>{detailsError}</p>
          <button
            onClick={loadRestaurantDetails}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <h4 className="font-semibold">Contact:</h4>
            <p>{restaurantDetails?.contact}</p>
            <h4 className="font-semibold">City:</h4>
            <p>{restaurantDetails?.city}</p>
            <h4 className="font-semibold">Address:</h4>
            <p>{restaurantDetails?.address}</p>
            <h4 className="font-semibold">Email:</h4>
            <p>{restaurantDetails?.email}</p>
          </div>
        </div>
      )}

      {/* Food Items List */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <SkeletonTheme baseColor="#f5f5f5" highlightColor="#db9721">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden p-4"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 md:w-32 md:h-32">
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <Skeleton height={24} width="60%" className="mb-2" />
                      <Skeleton count={2} />
                      <Skeleton height={20} width="40%" className="mt-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SkeletonTheme>
        ) : foodItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {foodItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex"
              >
                {/* Food Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <img
                    src={item.path}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Food Details */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <p className="text-gray-700 font-medium">
                      Price: {item.price}
                    </p>
                  </div>
                  <div>
                    {cartId.includes(item._id) ? (
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors mt-4"
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition-colors mt-4"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h1 className="text-2xl font-semibold text-gray-700">
              No food items added for now...
            </h1>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Details;
