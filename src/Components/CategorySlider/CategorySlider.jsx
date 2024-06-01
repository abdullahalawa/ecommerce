import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  const [Categories, setCategories] = useState(null);

  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {Categories ? (
        <section className="pb-8">
          <h2 className="font-semibold text-lg mb-3">
            Shop Pobular Categories
          </h2>
          <swiper-container loop={true} slides-Per-View={6}>
            {Categories.map((category) => (
              <swiper-slide key={category._id}>
                <Link to={`category/${category._id}`}>
                  <img
                    src={category.image}
                    alt=""
                    className="w-full h-72 object-cover"
                  />
                  <h3>{category.name}</h3>
                </Link>
              </swiper-slide>
            ))}
          </swiper-container>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}

{
  /* <swiper-container>
{Categories.map((category) => {
  <swiper-slide>
    <img
      src={category.image}
      alt=""
      className="w-full h-72 object-cover"
    />
    <h3>{category.name}</h3>
  </swiper-slide>;
})}
</swiper-container> */
}
