import React, { useContext, useEffect } from "react";
import { favoritContext } from "../../Context/Favorite.context";
import Loading from "../../Components/Loading/Loading";
import { cartContext } from "../../Context/Cart.context";

export default function Wishlist() {
  const {
    favoriteInfo,
    addToFavorite,
    getLoggedInFavorite,
    removeProductFromWhishlist,
  } = useContext(favoritContext);

  const { addProductToCart } = useContext(cartContext);

  useEffect(() => {
    getLoggedInFavorite();
  }, []);

  return (
    <>
      {favoriteInfo === null ? (
        <Loading />
      ) : (
        <div className="bg-gray-100 p-8">
          <h1 className="text-2xl font-extrabold pb-8">My wish List</h1>

          {favoriteInfo.data.length === 0 ? (
            <div className="flex justify-center items-center py-16">
              Your Wishlist is empty{" "}
            </div>
          ) : (
            <>
              {favoriteInfo.data.map((wishListProduct, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-2 border-b-2 border-slate-200"
                >
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
                        <button
                          onClick={() => {
                            removeProductFromWhishlist({
                              id: wishListProduct._id,
                            });
                          }}
                        >
                          Remove
                        </button>
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        addProductToCart({ id: wishListProduct._id });
                        removeProductFromWhishlist({ id: wishListProduct._id });
                      }}
                      className="btn-primary bg-white border border-primary text-black"
                    >
                      add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
