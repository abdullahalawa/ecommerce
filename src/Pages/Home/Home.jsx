import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import HomeSlider from "./../../Components/HomeSlider/HomeSlider";
import { useQuery } from "@tanstack/react-query";
import UseProducts from "../../Hooks/useProducts/useProducts";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { favoritContext } from "../../Context/Favorite.context";

export default function Home() {
  const [isFavorite, setIsFavorite] = useState([]);
  const { isLoading, data, isFetching, isError, error } = UseProducts();
  const { addToFavorite, getLoggedInFavorite, favoriteInfo } =
    useContext(favoritContext);

  useEffect(() => {
    getLoggedInFavorite();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Welcome to homepage" />
        </Helmet>
      </HelmetProvider>

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
