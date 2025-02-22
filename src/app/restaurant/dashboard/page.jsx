"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import Footer from "@/app/_components/Footer";
import React, { useState, useEffect } from "react";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" or "addFood"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
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
        <Footer />
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
            onClick={() => setActiveTab("addFood")}
            aria-selected={activeTab === "addFood"}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "addFood"
                ? "bg-amber-600 text-white"
                : "bg-white text-gray-600 hover:bg-amber-50"
            }`}
          >
            Add Food
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            aria-selected={activeTab === "dashboard"}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "dashboard"
                ? "bg-amber-600 text-white"
                : "bg-white text-gray-600 hover:bg-amber-50"
            }`}
          >
            Dashboard
          </button>
        </div>
        {activeTab === "addFood" ? (
          <AddFoodItem setAddItem={setActiveTab} />
        ) : (
          <FoodItemList />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
