"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import React, { useState } from "react";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <RestaurantHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Tabs */}
        <div className="max-w-md mx-auto mb-8 flex justify-center space-x-4">
          <button
            onClick={() => setAddItem(true)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              addItem
                ? "bg-amber-600 text-white"
                : "bg-white text-gray-600 hover:bg-amber-50"
            }`}
          >
            Add Food
          </button>
          <button
            onClick={() => setAddItem(false)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              !addItem
                ? "bg-amber-600 text-white"
                : "bg-white text-gray-600 hover:bg-amber-50"
            }`}
          >
            Dashboard
          </button>
        </div>
        {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
      </main>
    </div>
  );
};

export default Dashboard;
