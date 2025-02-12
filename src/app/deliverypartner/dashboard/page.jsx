"use client";
import DeliveryPartnerHeader from "@/app/_components/DeliveryPartnerHeader";
import Footer from "@/app/_components/Footer";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [myOrders, setMyOrders] = useState([]);
  console.log(myOrders);

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
    <div>
      <DeliveryPartnerHeader />
      <h1>Delivery Partner Dashboard</h1>
      {myOrders &&
        myOrders.map((item) => {
          return (
            <div className="restaurant-wrapper" key={item.data._id}>
              <h3>Order ID: {item.data._id}</h3>
              <p>Restaurant Name: {item.data.restaurantName}</p>
              <p>City: {item.data.city}</p>
              <p>Address: {item.data.address}</p>
              <p>Total Amount: {item.amount}</p>
              <p>
                Update Status:
                <select>
                  <option>Confirm</option>
                  <option>Delivered</option>
                  <option>Cancel</option>
                </select>
              </p>
            </div>
          );
        })}
      <Footer />
    </div>
  );
};

export default Dashboard;
