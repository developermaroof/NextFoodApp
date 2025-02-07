import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    console.log(email, password);
    let response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    response = await response.json();
    if (response.success) {
      alert("Successfully LoggedIn");
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (props?.redirect?.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("Login failed");
    }
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
