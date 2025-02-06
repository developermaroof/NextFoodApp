import React, { useState } from "react";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(email, password);
  };

  return (
    <div>
      <div className="input-wrapper">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          type="text"
          placeholder="Email"
        />
      </div>
      <div className="input-wrapper">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          type="password"
          placeholder="Password"
        />
      </div>
      <div className="submit-wrapper">
        <button onClick={handleLogin} className="button">
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
