import Link from "next/link";
import React from "react";

const CustomerHeader = () => {
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
          <Link href="/">Cart(0)</Link>
        </li>
        <li>
          <Link href="/restaurant">Add Restaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
