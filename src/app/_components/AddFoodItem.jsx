"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddFood = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    try {
      setLoading(true);
      const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
      const food_id = restaurantData?._id;
      let response = await fetch("/api/restaurant/foods", {
        method: "POST",
        body: JSON.stringify({ name, price, path, description, food_id }),
      });
      let data = await response.json();
      if (data.success) {
        toast.success("Food Item Added Successfully");
        props.setAddItem(false);
      } else {
        toast.error("Failed to Add Food Item");
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      toast.error("An error occurred while adding the food item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Food Item
      </h1>
      <div className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Enter Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !name && (
            <span className="text-red-500 text-sm">Please Enter Food Name</span>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !price && (
            <span className="text-red-500 text-sm">Please Enter Price</span>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Image Path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !path && (
            <span className="text-red-500 text-sm">
              Please Enter Image Path
            </span>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          {error && !description && (
            <span className="text-red-500 text-sm">
              Please Enter Description
            </span>
          )}
        </div>
      </div>
      <button
        onClick={handleAddFood}
        disabled={loading}
        className={`mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
};

export default AddFoodItem;
