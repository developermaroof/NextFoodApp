"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  // Initialize state with safe defaults
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(undefined);
  const [isCartLoading, setIsCartLoading] = useState(false);

  // Load initial values from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("cartData");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartNumber(parsedCart.length);
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Update cart when props.cartData changes.
  useEffect(() => {
    if (props.cartData && typeof window !== "undefined") {
      setCartItems((prevCartItems) => {
        let newCart;
        if (prevCartItems.length > 0) {
          if (prevCartItems[0].food_id !== props.cartData.food_id) {
            newCart = [props.cartData];
          } else {
            newCart = [...prevCartItems, props.cartData];
          }
        } else {
          newCart = [props.cartData];
        }
        setCartNumber(newCart.length);
        localStorage.setItem("cartData", JSON.stringify(newCart));
        return newCart;
      });
    }
  }, [props.cartData]);

  // Update cart when props.removeCartData changes
  useEffect(() => {
    if (props.removeCartData && typeof window !== "undefined") {
      setCartItems((prevCartItems) => {
        const newCart = prevCartItems.filter(
          (item) => item._id !== props.removeCartData
        );
        setCartNumber(newCart.length);
        if (newCart.length > 0) {
          localStorage.setItem("cartData", JSON.stringify(newCart));
        } else {
          localStorage.removeItem("cartData");
        }
        return newCart;
      });
    }
  }, [props.removeCartData]);

  const handleLogOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    setUser(undefined);
    router.push("/user-auth");
  };

  const handleCartClick = () => {
    if (cartNumber) {
      // If already on the cart page, do nothing.
      if (pathname === "/cart") {
        return;
      }
      setIsCartLoading(true);
      router.push("/cart");
    }
  };

  // Reset the loading spinner when the pathname changes to "/cart"
  useEffect(() => {
    if (pathname === "/cart") {
      setIsCartLoading(false);
    }
  }, [pathname]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Food Delivery Icon"
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
              {user ? (
                <>
                  <li>
                    <Link
                      href="/myprofile"
                      className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                    >
                      {user?.name}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center bg-amber-100 px-4 py-2 rounded-full hover:bg-amber-200 transition-colors"
                    >
                      LogOut
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/user-auth"
                      className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/user-auth"
                      className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                    >
                      SignUp
                    </Link>
                  </li>
                </>
              )}
              <li>
                {cartNumber ? (
                  <button
                    onClick={handleCartClick}
                    className="flex items-center bg-amber-100 px-4 py-2 rounded-full hover:bg-amber-200 transition-colors"
                  >
                    {isCartLoading ? (
                      <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>🛒 Cart ({cartNumber})</>
                    )}
                  </button>
                ) : (
                  <span className="flex items-center bg-amber-100 px-4 py-2 rounded-full transition-colors">
                    🛒 Cart ({cartNumber})
                  </span>
                )}
              </li>
              <li>
                <Link
                  href="/deliverypartner"
                  className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                >
                  Delivery Partner
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurant"
                  className="text-gray-600 hover:text-amber-600 transition-colors font-medium"
                >
                  Add Restaurant
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
