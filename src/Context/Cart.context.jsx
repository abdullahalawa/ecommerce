import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);
  const { token } = useContext(userContext);

  // add product to cart
  async function addProductToCart({ id }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };

      let { data } = await axios.request(options);
      toast.success("Product added to cart");
      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  // get all cart info
  async function getCartInfo() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      setCartInfo(data);
    } catch (error) {
      if (error.response.data.message.includes("No cart")) {
        setCartInfo([]);
      }
    }
  }

  // remove product from cart
  async function removeProductFromCart({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);

      if (data.numOfCartItems === 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }

      toast.success("Product removed successfuly");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // update product count in cart
  async function updateProductCount({ id, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      const { data } = await axios.request(options);

      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Clear cart
  async function clearCart() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);

      if (data.message === "success") {
        setCartInfo([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        cartInfo,
        getCartInfo,
        removeProductFromCart,
        updateProductCount,
        clearCart,
        setCartInfo,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
