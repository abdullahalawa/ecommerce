export default function ProductCard({ productInfo }) {
  const { images, title, price, category, ratingAverage } = productInfo;

  return (
    <>
      <div className="card col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-md overflow-hidden">
        <div className="relative">
          <img className="w-full" src={images[0]} alt="" />

          <div className="layer opacity-0 hover:opacity-100 transition-opacity duration-300 absolute w-full h-full left-0 top-0 bg-black bg-opacity-15 flex gap-2 items-center justify-center">
            <div className="icon cursor-pointer hover:scale-110 transition-transform duration-300 hover:rotate-6 w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center">
              <i className="fa-solid fa-heart"></i>
            </div>

            <div className="icon cursor-pointer hover:scale-110 transition-transform duration-300 hover:rotate-6 w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>

            <div className="icon cursor-pointer hover:scale-110 transition-transform duration-300 hover:rotate-6 w-10 h-10 rounded-full bg-primary text-sm text-white flex justify-center items-center">
              <i className="fa-solid fa-eye"></i>
            </div>
          </div>
        </div>
        <div className="info p-3">
          <h3 className="text-primary">{category.name}</h3>
          <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
          <div className="flex justify-between items-center mt-4">
            <span>{price} EGP</span>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span>{ratingAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
