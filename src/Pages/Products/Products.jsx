import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import UseOnlineStatus from "../../Hooks/useOnlineStatus/useOnlineStatus";
import UseProducts from "../../Hooks/useProducts/useProducts";
import { favoritContext } from "../../Context/Favorite.context";

export default function Products() {
  const { isLoading, data, isFetching, isError, error } = UseProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>Error</h2>;
  }

  console.log();

  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
