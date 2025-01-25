"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RestaurantHeader = () => {
  const [userDetails, setUserDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data && pathName == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setUserDetails(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("restaurantUser");
    alert("LoggedOut!");
    router.push("/restaurant");
  };
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img style={{ width: "100px" }} src="/logo.png" alt="Logo" />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {userDetails && userDetails.restaurantName ? (
          <>
            <li>
              <button onClick={handleLogout} className="button">
                LogOut
              </button>
            </li>
            <li>
              <Link href="/">Profile</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/">Login/SignUp</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantHeader;
