"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocations, setShowLocations] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + encodeURIComponent(params.location);
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + encodeURIComponent(params.restaurant);
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocations(false);
    loadRestaurants({ location: item });
  };

  return (
    <div>
      <CustomerHeader />
      {/* Main Banner for Search */}
      <div className="main-page-banner">
        <h1>Food App</h1>
        <div className="input-wrapper">
          <input
            className="select-input"
            type="text"
            placeholder="Select Place"
            value={selectedLocation}
            onClick={() => setShowLocations(true)}
            readOnly
          />
          <ul className="location-list">
            {showLocations &&
              locations.map((item) => (
                <li key={item} onClick={() => handleListItem(item)}>
                  {item}
                </li>
              ))}
          </ul>
          <input
            className="search-input"
            type="text"
            placeholder="Enter Food or Restaurant"
            onChange={(e) => loadRestaurants({ restaurant: e.target.value })}
          />
        </div>
      </div>

      {/* Restaurants */}
      <div className="restaurant-list-container">
        {restaurants.map((item) => (
          <div
            onClick={() =>
              router.push(`explore/${item.restaurantName}?id=${item._id}`)
            }
            className="restaurant-wrapper"
            key={item._id}
          >
            <div className="heading-wrapper">
              <h3>{item.restaurantName}</h3>
              <h5>Contact: {item.contact}</h5>
            </div>
            <div className="address-wrapper">
              <div>{item.city},</div>
              <div className="address">
                {item.address}, Email: {item.email}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
