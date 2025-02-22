"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    setLoading(true);
    try {
      let restaurantData = null;
      try {
        const storedData = localStorage.getItem("restaurantUser");
        if (storedData) {
          restaurantData = JSON.parse(storedData);
        }
      } catch (parseError) {
        console.error(
          "Error parsing restaurantUser from localStorage:",
          parseError
        );
        toast.error("Invalid restaurant data stored");
        return;
      }
      if (!restaurantData || !restaurantData._id) {
        toast.error("Restaurant data not found");
        return;
      }
      const food_id = restaurantData._id;
      let response = await fetch(`/api/restaurant/foods/${food_id}`);
      const data = await response.json();
      if (data.success) {
        setFoodItems(data.result);
      } else {
        toast.error("Couldn't find food items");
      }
    } catch (error) {
      console.error("Error loading food items:", error);
      toast.error("An error occurred while loading food items");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFoodItem = async (id) => {
    try {
      let response = await fetch(`/api/restaurant/foods/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Food Item deleted successfully");
        loadFoodItems();
      } else {
        toast.error("Failed to delete food item");
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error("An error occurred while deleting the food item");
    }
  };

  const handleEditFoodItem = (id) => {
    setEditingItemId(id);
    router.push(`/restaurant/dashboard/${id}`);
  };

  const handleDeleteWrapper = async (id) => {
    setDeletingItemId(id);
    await handleDeleteFoodItem(id);
    setDeletingItemId(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Food Items List</h1>
      {loading ? (
        <p>Loading food items...</p>
      ) : foodItems.length === 0 ? (
        <p className="text-gray-600">No food items found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Food Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {foodItems.map((item, index) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.path}
                      alt="Food"
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 space-x-2">
                    <button
                      onClick={() => handleEditFoodItem(item._id)}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-3 py-1 rounded transition-colors"
                      disabled={
                        editingItemId === item._id ||
                        deletingItemId === item._id
                      }
                    >
                      {editingItemId === item._id ? "Editing..." : "Edit"}
                    </button>
                    <button
                      onClick={() => handleDeleteWrapper(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded transition-colors"
                      disabled={
                        deletingItemId === item._id ||
                        editingItemId === item._id
                      }
                    >
                      {deletingItemId === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FoodItemList;
