import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import ImageGallery from "react-image-gallery";

export default function ProductDetails() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  async function getProductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    setDetails(data.data);
    console.log(details);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  const imageItems = details?.images.map((imageURL) => {
    return {
      original: imageURL,
      thumbnail: imageURL,
    };
  });

  return (
    <>
      {details === null ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <ImageGallery
              items={imageItems}
              showNav={false}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
          <div className="col-span-9 p-8">
            <h2 className="text-2xl font-bold">{details.title}</h2>
            <h3 className="text-primary font-semibold">
              {details.category.name}
            </h3>
            <p className="mt-3">{details.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span>{details.price} L.E</span>
              <span>
                <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                {details.ratingsAverage}
              </span>
            </div>
            <button className="btn-primary w-full mt-4">Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}
