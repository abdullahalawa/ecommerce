import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../../Components/Loading/Loading";

export default function Brands() {
  async function getBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };

    return axios.request(options);
  }

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return <h2>Error</h2>;
  }
  console.log(data.data.data);
  return (
    <>
      <div>
        <h2 className="text-3xl text-primary font-bold text-center py-4">
          All Brands
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {data.data.data.map((category) => (
          <>
            <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 w-full border border-gray-300 transition-all duration-300  hover:shadow-md hover:shadow-lime-400 rounded-lg overflow-hidden">
              <div>
                <img
                  className="w-full object-cover"
                  src={category.image}
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-1xl text-center font-bold py-4">
                  {category.name}
                </h1>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
