"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import React, { useState } from "react";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <div>
      <RestaurantHeader />
      <button onClick={() => setAddItem(true)}>Add Food</button>
      <button onClick={() => setAddItem(false)}>Dashboard</button>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </div>
  );
};

export default Dashboard;
