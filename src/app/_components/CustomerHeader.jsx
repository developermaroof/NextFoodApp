"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  const router = useRouter();

  // Initialize state with safe defaults
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(undefined);

  // Load initial values from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartData");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartNumber(parsedCart.length);
        setCartItems(parsedCart);
      }
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Update cart when props.cartData changes.
  // Use a functional update to access the current cartItems without adding it as a dependency.
  useEffect(() => {
    if (props.cartData && typeof window !== "undefined") {
      setCartItems((prevCartItems) => {
        let newCart;
        if (prevCartItems.length > 0) {
          // If the first item's food_id is different, reset the cart
          if (prevCartItems[0].food_id !== props.cartData.food_id) {
            newCart = [props.cartData];
          } else {
            // Otherwise, add the new item
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

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img style={{ width: "100px" }} src="/logo.png" alt="Logo" />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/myprofile">{user?.name}</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>LogOut</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/user-auth">Login</Link>
            </li>
            <li>
              <Link href="/user-auth">SignUp</Link>
            </li>
          </>
        )}
        <li>
          <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber})</Link>
        </li>
        <li>
          <Link href="/deliverypartner">Delivery Partner</Link>
        </li>
        <li>
          <Link href="/restaurant">Add Restaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
