"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

const Details = () => {
  // Unwrap dynamic route params and search params
  const params = useParams();
  const searchParams = useSearchParams();

  const restaurantName = params.name; // useParams() returns the resolved params
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();

  // Lazy initialize cartStorage only on client
  const [cartStorage, setCartStorage] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cartData");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [cartId, setCartId] = useState(
    () => cartStorage.map((item) => item._id) || []
  );
  const [removeCartData, setRemoveCartData] = useState();

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    const id = searchParams.get("id");
    let response = await fetch(`/api/customer/${id}`);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.restaurantDetails);
      setFoodItems(response.foodItems);
    }
  };

  const handleAddToCart = (item) => {
    setCartData(item);
    const newCartIds = [...cartId, item._id];
    setCartId(newCartIds);
    setRemoveCartData(undefined);
  };

  const handleRemoveFromCart = (id) => {
    setRemoveCartData(id);
    const updatedCartIds = cartId.filter((item) => item !== id);
    setCartData(undefined);
    setCartId(updatedCartIds);
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

      {/* Food Items List */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {foodItems.length > 0 ? (
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
