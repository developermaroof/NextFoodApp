"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

export default function Home() {
  const [locations, setLocations] = useState([]);
  // Initialize restaurants as null to indicate "not fetched yet"
  const [restaurants, setRestaurants] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      loadLocations();
      loadRestaurants();
    }, 300); // 300ms delay
    return () => clearTimeout(timer);
  }, []);

  const loadLocations = async () => {
    let response = await fetch("/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };

  const loadRestaurants = async (params) => {
    setLoading(true);
    try {
      let url = "/api/customer";
      if (params?.location) {
        url += "?location=" + encodeURIComponent(params.location);
      } else if (params?.restaurant) {
        url += "?restaurant=" + encodeURIComponent(params.restaurant);
      }
      const res = await fetch(url);
      if (!res.ok) {
        console.error("API route not available, status:", res.status);
        // Ensure restaurants is set to empty array if there's an error
        setRestaurants([]);
        return;
      }
      const response = await res.json();
      if (response.success) {
        setRestaurants(response.result);
      } else {
        console.error("Fetch error:", response);
        setRestaurants([]);
      }
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocations(false);
    loadRestaurants({ location: item });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />
      {/* Main Banner */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Discover the Best Food in Your City
          </h1>

          {/* Search Container */}
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Location Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Select Location"
                  value={selectedLocation}
                  onClick={() => setShowLocations(true)}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 cursor-pointer"
                />
                {showLocations && (
                  <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {locations.map((item) => (
                      <li
                        key={item}
                        onClick={() => handleListItem(item)}
                        className="px-4 py-3 hover:bg-amber-50 cursor-pointer transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Restaurant Search */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search restaurants or cuisines"
                  onChange={(e) =>
                    loadRestaurants({ restaurant: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <main className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading || restaurants === null ? (
            <SkeletonTheme baseColor="#f5f5f5" highlightColor="#db9721">
              <Skeleton height={36} width={300} className="mb-8" />
            </SkeletonTheme>
          ) : (
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {restaurants.length
                ? "Popular Restaurants"
                : "No Restaurants Found"}
            </h2>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading || restaurants === null
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden p-6"
                  >
                    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#db9721">
                      <Skeleton height={24} width="60%" className="mb-2" />
                      <div className="flex gap-2 mb-2">
                        <Skeleton height={20} width={50} />
                        <Skeleton height={20} width={80} />
                      </div>
                      <Skeleton count={2} />
                    </SkeletonTheme>
                  </div>
                ))
              : restaurants.map((item) => (
                  <div
                    onClick={() =>
                      router.push(
                        `explore/${item.restaurantName}?id=${item._id}`
                      )
                    }
                    key={item._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  >
                    <div className="p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {item.restaurantName}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-amber-100 text-amber-800 text-sm px-2 py-1 rounded">
                              {item.city}
                            </span>
                            <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded">
                              {item.cuisineType || "Multi-cuisine"}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">
                            <span className="font-medium">Address:</span>{" "}
                            {item.address}
                          </p>
                          <div className="flex items-center gap-4 text-gray-600">
                            <span className="flex items-center gap-1">
                              📞 {item.contact}
                            </span>
                            <span className="flex items-center gap-1">
                              📧 {item.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
