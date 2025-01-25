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
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignUp = async () => {
    if (password !== confPassword) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (
      (!email,
      !password,
      !confPassword,
      !restaurantName,
      !city,
      !address,
      !contact)
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

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
          {error && !email && (
            <span className="input-error">Email is Required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="input-error">Password is Required</span>
          )}
          {passwordError && (
            <span className="input-error">Passwords do not match</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            placeholder="Confirm Password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          {error && !confPassword && (
            <span className="input-error">Password is Required</span>
          )}
          {passwordError && (
            <span className="input-error">Passwords do not match</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
          {error && !restaurantName && (
            <span className="input-error">Restaurant Name is Required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {error && !city && (
            <span className="input-error">City is Required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {error && !address && (
            <span className="input-error">Address is Required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="number"
            placeholder="Enter Contact No."
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {error && !contact && (
            <span className="input-error">Contact No is Required</span>
          )}
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
