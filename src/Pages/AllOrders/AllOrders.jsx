import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

export default function AllOrders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);

  // Get loggedin user orders
  async function getUserOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };

    const { data } = await axios.request(options);

    setOrders(data);

    console.log(data);
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      {!orders ? (
        <Loading />
      ) : (
        orders.map((order) => {
          return (
            <>
              <div className="order mt-4 border border-gray-300 rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-gray-400">Order ID</h2>
                    <h3 className="font-bold">#{order.id}</h3>
                  </div>

                  <div>
                    {order.isDelivered ? (
                      <span className="btn-primary inline-block bg-lime-500 me-2">
                        Delivered
                      </span>
                    ) : (
                      <span className="btn-primary inline-block bg-blue-500 me-2">
                        Processing
                      </span>
                    )}

                    {order.isPaid ? (
                      <span className="btn-primary inline-block bg-lime-500 ">
                        Successfully paid
                      </span>
                    ) : (
                      <span className="btn-primary inline-block bg-red-500 ">
                        Not Paid Yet
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-12 mt-5 gap-3">
                  {order.cartItems.map((item) => {
                    return (
                      <>
                        <div className="product border border-gray-300 rounded p-3 col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2">
                          <img
                            className="w-full h-32 object-contain"
                            src={item.product.imageCover}
                            alt=""
                          />
                          <h3 className="font-semibold my-2">
                            {item.product.title}
                          </h3>
                          <span>{item.price} L.E</span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              ;
            </>
          );
        })
      )}
    </>
  );
}
