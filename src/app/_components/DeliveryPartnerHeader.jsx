"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DeliveryPartnerHeader = () => {
  const [deliveryPartnerDetails, setDeliveryPartnerDetails] = useState(null);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const data = localStorage.getItem("deliverypartners");
    if (!data && pathName === "/deliverypartner/dashboard") {
      router.push("/deliverypartner");
    } else if (data && pathName === "/deliverypartner") {
      router.push("/deliverypartner/dashboard");
    } else if (data) {
      setDeliveryPartnerDetails(JSON.parse(data));
    }
  }, [pathName, router]);

  const handleLogout = () => {
    localStorage.removeItem("deliverypartners");
    toast.success("Logged Out!");
    router.push("/deliverypartner");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Delivery Partner Icon"
              className="h-10 w-10 rounded-full"
            />
            <span className="ml-2 text-xl font-bold text-gray-800">
              FoodApp
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              {deliveryPartnerDetails && deliveryPartnerDetails.name ? (
                <>
                  <li>
                    <span className="text-gray-600 font-medium">
                      {deliveryPartnerDetails.name}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center bg-amber-100 px-4 py-2 rounded-full hover:bg-amber-200 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/deliverypartner"
                    className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                  >
                    Login/SignUp
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/deliverypartner/dashboard"
                  className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DeliveryPartnerHeader;
