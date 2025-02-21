"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    const food_id = restaurantData._id;
    let response = await fetch(`/api/restaurant/foods/${food_id}`);
    response = await response.json();
    if (response.success) {
      setFoodItems(response.result);
    } else {
      toast.error("Couldn't find food items");
    }
  };

  const handleDeleteFoodItem = async (id) => {
    let response = await fetch(`/api/restaurant/foods/${id}`, {
      method: "DELETE",
    });
    response = await response.json();
    if (response.success) {
      toast.success("Food Item deleted successfully");
      loadFoodItems();
    } else {
      toast.error("Failed to delete food item");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Food Items List</h1>
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
            {foodItems &&
              foodItems.map((item, key) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {key + 1}
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
                      onClick={() =>
                        router.push(`/restaurant/dashboard/${item._id}`)
                      }
                      className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-3 py-1 rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFoodItem(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodItemList;
