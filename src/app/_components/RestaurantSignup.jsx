import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RestaurantSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    console.log(
      "SignUp Clicked",
      email,
      password,
      confPassword,
      restaurantName,
      city,
      address,
      contact
    );
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        restaurantName,
        city,
        address,
        contact,
      }),
    });
    response = await response.json();
    console.log(response);
    if (response.success) {
      alert("Successfully Signed Up");
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };

  return (
    <>
      <h1>SignUp</h1>
      <div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="email"
            placeholder="Enter EmailID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            placeholder="Confirm Password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="number"
            placeholder="Enter Contact No."
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <button className="button" onClick={handleSignUp}>
            SignUp
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignup;
