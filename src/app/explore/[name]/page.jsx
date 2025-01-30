import CustomerHeader from "@/app/_components/CustomerHeader";
import React from "react";

const Details = (props) => {
  const restaurantName = props.params.name;
  return (
    <div>
      <CustomerHeader />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(restaurantName)}</h1>
      </div>
    </div>
  );
};

export default Details;
