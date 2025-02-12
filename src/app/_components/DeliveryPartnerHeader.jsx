"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DeliveryPartnerHeader = () => {
  const [deliveryPartnerDetails, setDeliveryPartnerDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("deliverypartners");
    if (!data && pathName == "/deliverypartner/dashboard") {
      router.push("/deliverypartner");
    } else if (data && pathName == "/deliverypartner") {
      router.push("/deliverypartner/dashboard");
    } else {
      setDeliveryPartnerDetails(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("deliverypartners");
    alert("LoggedOut!");
    router.push("/deliverypartner");
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
        {deliveryPartnerDetails && deliveryPartnerDetails.name ? (
          <li>
            <button onClick={handleLogout} className="button">
              LogOut
            </button>
          </li>
        ) : (
          <li>
            <Link href="/">Login/SignUp</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DeliveryPartnerHeader;
