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
    <div>
      <CustomerHeader />
      <h1>My Profile</h1>
      <h2>My Orders</h2>
      {myOrders &&
        myOrders.map((item) => {
          return (
            <div className="restaurant-wrapper" key={item.data._id}>
              <h3>Order ID: {item.data._id}</h3>
              <p>Restaurant Name: {item.data.restaurantName}</p>
              <p>City: {item.data.city}</p>
              <p>Address: {item.data.address}</p>
              <p>Total Amount: {item.amount}</p>
              <p>Status: {item.status}</p>
            </div>
          );
        })}
      <Footer />
    </div>
  );
};

export default MyProfile;
