import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async () => {
    let response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    response = await response.json();
    if (response.success) {
      alert("Successfully LoggedIn");
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (searchParams?.get("order")) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <input
          type="text"
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
