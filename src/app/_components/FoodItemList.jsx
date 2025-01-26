import React from "react";

const FoodItemList = () => {
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
          <tr>
            <td>1</td>
            <td>Pizza</td>
            <td>$20</td>
            <td>Delicious Italian Pizza</td>
            <td>
              <img src="" alt="Image" />
            </td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
