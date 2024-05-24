import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";

export default function Home() {
  const [products, setProducts] = useState(null);

  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };

    const { data } = await axios.request(options);
    setProducts(data.data);
  }

  useEffect(() => {
    getProducts();

    return () => {};
  }, []);

  return (
    <>
      {products ? (
        <div className="grid grid-cols-12 gap-8">
          {products.map((product) => (
            <ProductCard productInfo={product} key={product._id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
