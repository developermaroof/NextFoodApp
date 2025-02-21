"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import React, { useState, useEffect } from "react";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Simulate a delay for loading state
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error during loading:", error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <RestaurantHeader />
        <main className="container mx-auto px-4 py-8 flex-grow text-center">
          <SkeletonTheme baseColor="#f5f5f5" highlightColor="#db9721">
            <Skeleton height={40} width={300} className="mx-auto mb-8" />
            <Skeleton count={5} />
          </SkeletonTheme>
        </main>
      </div>
    );
  }

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
