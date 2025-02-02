import Link from "next/link";
import React, { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  const cartStorage = JSON.parse(localStorage.getItem("cartData"));
  const [cartNumber, setCartNumber] = useState(cartStorage?.length || 0);
  const [cartItems, setCartItems] = useState(cartStorage);

  useEffect(() => {
    if (props.cartData) {
      console.log("Props: ", props);
      if (cartNumber) {
        if (cartItems[0].food_id != props.cartData.food_id) {
          localStorage.removeItem("cartData");
          setCartNumber(1);
          setCartItems([props.cartData]);
          localStorage.setItem("cartData", JSON.stringify([props.cartData]));
        } else {
          let localCartItem = cartItems;
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
          setCartItems(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cartData", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItems([props.cartData]);
        localStorage.setItem("cartData", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img style={{ width: "100px" }} src="/logo.png" alt="Logo" />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Login</Link>
        </li>
        <li>
          <Link href="/">SignUp</Link>
        </li>
        <li>
          <Link href="/">Cart({cartNumber})</Link>
        </li>
        <li>
          <Link href="/restaurant">Add Restaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
