"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RestaurantHeader = () => {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    try {
      const data = localStorage.getItem("restaurantUser");
      if (!data && pathName === "/restaurant/dashboard") {
        router.push("/restaurant");
      } else if (data && pathName === "/restaurant") {
        router.push("/restaurant/dashboard");
      } else if (data) {
        setUserDetails(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error parsing restaurant user data:", error);
      // Optionally clear the invalid data:
      localStorage.removeItem("restaurantUser");
    }
  }, [pathName, router]);

  const handleLogout = () => {
    localStorage.removeItem("restaurantUser");
    toast.success("Logged Out!");
    router.push("/restaurant");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
              {"< DevDine />"}
            </span>
          </Link>
          <nav
            className="hidden md:flex"
            role="navigation"
            aria-label="Main Navigation"
          >
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              {userDetails && userDetails.restaurantName ? (
                <>
                  <li>
                    <Link
                      href="/restaurant/dashboard"
                      className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-amber-100 hover:bg-amber-200 text-gray-600 font-medium px-4 py-2 rounded-full transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/restaurant"
                    className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                  >
                    Login/SignUp
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;
