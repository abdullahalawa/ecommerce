import React, { useContext, useEffect } from "react";
import { favoritContext } from "../../Context/Favorite.context";
import Loading from "../../Components/Loading/Loading";

export default function Wishlist() {
  const {
    favoriteInfo,
    addToFavorite,
    getLoggedInFavorite,
    removeProductFromWhishlist,
  } = useContext(favoritContext);

  useEffect(() => {
    getLoggedInFavorite();
  }, []);

  console.log(favoriteInfo);

  return (
    <>
      {favoriteInfo === null ? (
        <Loading />
      ) : (
        <div className="bg-gray-100 p-8">
          <h1 className="text-2xl font-extrabold pb-8">My wish List</h1>

          {favoriteInfo.data.map((wishListProduct) => {
            return (
              <>
                <div className="flex justify-between items-center p-2 border-b-2 border-slate-200">
                  <div className="flex justify-start items-center">
                    <div>
                      <img
                        className="w-full h-64"
                        src={wishListProduct.imageCover}
                        alt=""
                      />
                    </div>
                    <div className="space-y-2 pl-6">
                      <h3 className="text-xl font-bold">
                        {wishListProduct.title}
                      </h3>
                      <h5 className="text-primary text-sm font-semibold">
                        {wishListProduct.price} EGP
                      </h5>
                      <p className="text-red-500 text-sm font-semibold">
                        <span className="pr-1">
                          <i className="fa fa-trash"></i>
                        </span>
                        <span
                          onClick={() => {
                            removeProductFromWhishlist({
                              id: wishListProduct._id,
                            });
                          }}
                        >
                          Remove
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="btn-primary bg-white border border-primary text-black">
                      add to Cart
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
