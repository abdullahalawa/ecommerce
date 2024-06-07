import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return axios.request(options);
  }

  const { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="pb-8">
        <h2 className="font-semibold text-lg mb-3">Shop Pobular Categories</h2>
        <swiper-container loop={true} slides-Per-View={6}>
          {data.data.data.map((category) => (
            <swiper-slide key={category._id}>
              <Link to={`category/${category._id}`}>
                <img
                  src={category.image}
                  alt=""
                  className="w-full h-72 object-cover"
                />
                <h3>{category.name}</h3>
              </Link>
            </swiper-slide>
          ))}
        </swiper-container>
      </section>
    </>
  );
}

{
  /* <swiper-container>
{Categories.map((category) => {
  <swiper-slide>
    <img
      src={category.image}
      alt=""
      className="w-full h-72 object-cover"
    />
    <h3>{category.name}</h3>
  </swiper-slide>;
})}
</swiper-container> */
}
