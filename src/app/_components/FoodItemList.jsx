import React, { useEffect, useState } from "react";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    const food_id = restaurantData._id;
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/${food_id}`
    );
    response = await response.json();
    if (response.success) {
      setFoodItems(response.result);
    } else {
      alert("Couldn't find food items");
    }
  };

  const handleDeleteFoodItem = async (id) => {
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/${id}`,
      {
        method: "DELETE",
      }
    );
    response = await response.json();
    if (response.success) {
      alert("Food Item deleted successfully");
      loadFoodItems();
    } else {
      alert("Failed to delete food item");
    }
  };

  return (
    <div>
      <h1>Food Items List</h1>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Food Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodItems &&
            foodItems.map((item, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <img src={item.path} alt="Image" />
                </td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDeleteFoodItem(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
