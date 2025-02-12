import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DeliveryPartnerLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!phone || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/login",
      {
        method: "POST",
        body: JSON.stringify({
          phone,
          password,
        }),
      }
    );
    response = await response.json();

    if (response.success) {
      alert("Successfully LoggedIn");
      const { result } = response;
      delete result.password;
      localStorage.setItem("deliverypartners", JSON.stringify(result));
      router.push("/deliverypartner/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div>
        <div className="input-wrapper">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field"
            type="tel"
            placeholder="Enter Phone Number"
          />
          {error && !phone && (
            <span className="input-error">Phone Number is Required</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            type="password"
            placeholder="Password"
          />
          {error && !password && (
            <span className="input-error">Password is Required</span>
          )}
        </div>
        <div className="input-wrapper">
          <button onClick={handleLogin} className="button">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default DeliveryPartnerLogin;
