import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const router = useRouter();

  const handleSignUp = async () => {
    console.log(name, email, password, confirmPassword, city, address, contact);
    let response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        city,
        address,
        contact,
      }),
    });
    response = await response.json();
    if (response.success) {
      alert("Successfully Signed Up");
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      router.push("/");
    } else {
      alert("Failed to Sign Up");
    }
  };
  return (
    <div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <input
          className="input-field"
          type="email"
          placeholder="Enter Email Address"
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
          placeholder="Enter Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          type="tel"
          placeholder="Enter Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <button onClick={handleSignUp} className="button">
          SignUp
        </button>
      </div>
    </div>
  );
};

export default UserSignUp;
