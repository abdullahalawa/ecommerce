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

      let { data } = await axios.request(options);
      setFavoriteInfo(data);
      toast.success("Product Added to wishlist");
    } catch (error) {
      console.log(error);
    }
  }

  async function getLoggedInFavorite() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);

      setFavoriteInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromWhishlist({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);

      if (data.length === 0) {
        setFavoriteInfo([]);
      } else {
        getLoggedInFavorite();
      }

      console.log(data);
      toast.success("Product Deleted from Whishlist Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <favoritContext.Provider
      value={{
        favoriteInfo,
        addToFavorite,
        getLoggedInFavorite,
        removeProductFromWhishlist,
      }}
    >
      {children}
    </favoritContext.Provider>
  );
}
