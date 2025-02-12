import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DeliveryPartnerSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if ((!name, !password, !confirmPassword, !city, !address, !phone)) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    console.log(
      "SignUp Clicked",
      name,
      password,
      confirmPassword,
      city,
      address,
      phone
    );

    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/signup",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          password,
          city,
          address,
          phone,
        }),
      }
    );
    response = await response.json();

    if (response.success) {
      alert("Successfully Signed Up");
      const { result } = response;
      delete result.password;
      localStorage.setItem("deliverypartners", JSON.stringify(result));
      router.push("/deliverypartner/dashboard");
    } else {
      alert("Failed to Sign Up");
    }
  };

  return (
    <>
      <h1>SignUp</h1>
      <div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <span className="input-error">Please Enter Name</span>
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
            <span className="input-error">Please Enter Password</span>
          )}
          {passwordError && (
            <span className="input-error">Passwords do not match</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && !confirmPassword && (
            <span className="input-error">Please Enter Confirm Password</span>
          )}
          {passwordError && (
            <span className="input-error">Passwords do not match</span>
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
            <span className="input-error">Please Enter City</span>
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
            <span className="input-error">Please Enter Address</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && !phone && (
            <span className="input-error">Please Enter Phone Number</span>
          )}
        </div>
        <div className="input-wrapper">
          <button onClick={handleSignUp} className="button">
            SignUp
          </button>
        </div>
      </div>
    </>
  );
};

export default DeliveryPartnerSignup;
