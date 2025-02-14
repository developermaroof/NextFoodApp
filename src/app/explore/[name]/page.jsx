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
    let response = await fetch(`http://localhost:3000/api/customer/${id}`);
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
    <div>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(restaurantName)}</h1>
      </div>
      <div className="detail-wrapper">
        <h4>Contact: {restaurantDetails?.contact}</h4>
        <h4>City: {restaurantDetails?.city}</h4>
        <h4>Address: {restaurantDetails?.address}</h4>
        <h4>Email: {restaurantDetails?.email}</h4>
      </div>
      <div className="food-item-wrapper">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div className="list-item" key={item._id}>
              <div>
                <img src={item.path} alt={item.name} />
              </div>
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                {cartId.includes(item._id) ? (
                  <button onClick={() => handleRemoveFromCart(item._id)}>
                    Remove from cart
                  </button>
                ) : (
                  <button onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                )}
              </div>
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

export default Details;
