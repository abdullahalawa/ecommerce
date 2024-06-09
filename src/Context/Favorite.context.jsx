import React, { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";

export const favoritContext = createContext(null);

export default function FavoriteProvider({ children }) {
  const [favoriteInfo, setFavoriteInfo] = useState(null);
  const { token } = useContext(userContext);

  async function addToFavorite({ id }) {
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

    console.log(data);
  }

  return (
    <favoritContext.Provider value={{ favoriteInfo }}>
      {children}
    </favoritContext.Provider>
  );
}
