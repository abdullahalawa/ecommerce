import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function UseProducts() {
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };

    return axios.request(options);
  }

  const response = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return response;
}
