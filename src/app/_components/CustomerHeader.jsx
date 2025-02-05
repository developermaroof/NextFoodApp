import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  // for cart
  const cartStorage = JSON.parse(localStorage.getItem("cartData"));
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItems, setCartItems] = useState(cartStorage);
  // for user
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userStorage ? userStorage : undefined);
  console.log(userStorage);

  const router = useRouter();

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

  useEffect(() => {
    if (props.removeCartData) {
      let localCartItem = cartItems.filter((item) => {
        return item._id != props.removeCartData;
      });
      setCartItems(localCartItem);
      setCartNumber(cartNumber - 1);
      localStorage.setItem("cartData", JSON.stringify(localCartItem));
      if (localCartItem.length == 0) {
        localStorage.removeItem("cartData");
      }
    }
  }, [props.removeCartData]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
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
              <Link href="/#">{user?.name}</Link>
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
          <Link href={cartNumber ? "/cart" : "#"}>
            Cart({cartNumber ? cartNumber : 0})
          </Link>
        </li>
        <li>
          <Link href="/restaurant">Add Restaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
