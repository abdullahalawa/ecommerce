import React, { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const favoritContext = createContext(null);

export default function FavoriteProvider({ children }) {
  const [favoriteInfo, setFavoriteInfo] = useState(null);
  const { token } = useContext(userContext);

  async function addToFavorite({ id }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };

      const { data } = await axios.request(options);

      setFavoriteInfo(data);

      toast.success("Product Added to wishlist");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getLoggedInFavorite() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
      };

      const { data } = await axios.request(options);

      setFavoriteInfo(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <favoritContext.Provider
      value={{ favoriteInfo, addToFavorite, getLoggedInFavorite }}
    >
      {children}
    </favoritContext.Provider>
  );
}
