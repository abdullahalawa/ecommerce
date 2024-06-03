import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";

export default function ProductDetails() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  async function getProductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );

    setDetails(data.data);
    console.log(details);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      {details === null ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12">
          <div className="cols-span-4"></div>
          <div className="cols-span-8"></div>
        </div>
      )}
    </>
  );
}
