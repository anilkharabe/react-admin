import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRestaurants } from "../services/restaurantService";
import Button from "../common/Button";

const MyRestaurant = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myRestaurant"],
    queryFn: getRestaurants,
  });

  if (isLoading) {
    return <h2>Loading ....</h2>;
  }

  if (isError) {
    return <h2>Something went wrong</h2>;
  }
  console.log("data", data);
  return (
    <div className="p-5">
      {data.length === 0 ? (
        <h1>No Restaurant Found. Add new Restaurant</h1>
      ) : (
        <div className="text-center   py-5 bg-gray-300">
          <div>
            <h2 className="text-5xl">Restaurant Details</h2>
          </div>
          <div className="flex justify-center my-5 p-5">
            {data.map((res) => (
              <div key={res._id} >
                <h2 className="text-4xl">{res.name}</h2>
                <h2 className="text-xl">{res.cuisine}</h2>
                <h2 className="text-3xl">{res.address}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRestaurant;
