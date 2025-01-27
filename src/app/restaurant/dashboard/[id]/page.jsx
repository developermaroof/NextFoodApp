"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditFoodItem = ({ params }) => {
  const id = params.id;
  console.log("ID:", id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleLoadFoodItem();
  }, []);

  const handleLoadFoodItem = async () => {
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${id}`
    );
    response = await response.json();
    if (response.success) {
      console.log(response.result);
      setName(response.result.name);
      setPrice(response.result.price);
      setPath(response.result.path);
      setDescription(response.result.description);
    }
  };

  const handleEditFood = async () => {
    console.log(name, price, path, description);
    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name,
          price,
          path,
          description,
        }),
      }
    );
    response = await response.json();
    if (response.success) {
      alert("Food item has been Updated Successfully!");
      router.push("../dashboard");
    } else {
      alert("Failed to Update Food Item!");
    }
  };

  return (
    <div className="container">
      <h1>Update Food Item</h1>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="input-error">Please Enter Food Name</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className="input-error">Please Enter Price</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Image Path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        {error && !path && (
          <span className="input-error">Please Enter Image Path</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && !description && (
          <span className="input-error">Please Enter Description</span>
        )}
      </div>
      <div className="input-wrapper">
        <button onClick={handleEditFood} className="button">
          Update
        </button>
      </div>
      <div className="input-wrapper">
        <button onClick={() => router.push(`../dashboard`)} className="button">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default EditFoodItem;
