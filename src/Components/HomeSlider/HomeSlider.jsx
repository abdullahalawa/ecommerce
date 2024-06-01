import slideImage1 from "../../assets/images/slider-image-1.jpeg";
import slideImage2 from "../../assets/images/slider-image-2.jpeg";
import slideImage3 from "../../assets/images/slider-image-3.jpeg";

export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-8 bg-red-500">
          <swiper-container style={{ height: "100%" }} loop={true}>
            <swiper-slide style={{ height: "100%" }}>
              <img
                className="w-full h-full object-cover"
                src={slideImage3}
                alt=""
              />
            </swiper-slide>

            <swiper-slide style={{ height: "100%" }}>
              <img
                className="w-full h-full object-cover"
                src={slideImage1}
                alt=""
              />
            </swiper-slide>

            <swiper-slide style={{ height: "100%" }}>
              <img
                className="w-full h-full object-cover"
                src={slideImage2}
                alt=""
              />
            </swiper-slide>
          </swiper-container>
        </div>
        <div className="col-span-4">
          <div className="h-1/2">
            <img className="w-full h-full" src={slideImage2} alt="" />
          </div>
          <div className="h-1/2">
            <img className="w-full h-full" src={slideImage3} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
