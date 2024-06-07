import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import HomeSlider from "./../../Components/HomeSlider/HomeSlider";
import { useQuery } from "@tanstack/react-query";
import UseProducts from "../../Hooks/useProducts/useProducts";
import { Helmet } from "react-helmet";

export default function Home() {
  const { isLoading, data, isFetching, isError, error } = UseProducts();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Welcome to homepage" />
      </Helmet>

      <HomeSlider />
      <CategorySlider />

      <div className="grid grid-cols-12 gap-8">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
