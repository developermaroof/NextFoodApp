"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import React, { useEffect, useState } from "react";

const Details = (props) => {
  const restaurantName = props.params.name;
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;
    console.log(id);
    let response = await fetch(`http://localhost:3000/api/customer/${id}`);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.restaurantDetails);
      setFoodItems(response.foodItems);
    }
  };

  const handleAddToCart = (item) => {
    setCartData(item);
  };

  return (
    <div>
      <CustomerHeader cartData={cartData} />
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
            <div className="list-item">
              <div>
                <img src={item.path} />
              </div>
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                <button onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
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
