"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EditFoodItem = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      handleLoadFoodItem();
    }
  }, [id]);

  const handleLoadFoodItem = async () => {
    try {
      const response = await fetch(`/api/restaurant/foods/edit/${id}`);
      const data = await response.json();
      if (data.success) {
        setName(data.result.name);
        setPrice(data.result.price);
        setPath(data.result.path);
        setDescription(data.result.description);
      } else {
        toast.error("Failed to load food item details.");
      }
    } catch (err) {
      console.error("Error loading food item:", err);
      toast.error("An error occurred while loading food item details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditFood = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    try {
      const response = await fetch(`/api/restaurant/foods/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          price,
          path,
          description,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Food item has been updated successfully!");
        router.push("../dashboard");
      } else {
        toast.error("Failed to update food item!");
      }
    } catch (err) {
      console.error("Error updating food item:", err);
      toast.error("An error occurred while updating the food item.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 text-center">
        <SkeletonTheme baseColor="#f5f5f5" highlightColor="#db9721">
          <Skeleton height={30} width="80%" className="mb-4 mx-auto" />
          <Skeleton height={40} width="100%" className="mb-4" />
          <Skeleton height={40} width="100%" className="mb-4" />
          <Skeleton height={40} width="100%" className="mb-4" />
          <Skeleton height={40} width="100%" className="mb-4" />
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Update Food Item
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
        onClick={handleEditFood}
        className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Update
      </button>
      <button
        onClick={() => router.push("../dashboard")}
        className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default EditFoodItem;
