import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/Cart.context";
import { userContext } from "../../Context/User.context";
import axios from "axios";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cartInfo, setCartInfo } = useContext(cartContext);
  const { token } = useContext(userContext);
  const [orderType, setOrderType] = useState(null);

  // handle Cach Order
  async function createCashOrder(values) {
    console.log("######## Cash######");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };

    let { data } = await axios.request(options);

    console.log(data);

    setCartInfo([]);
  }

  // handle online Order
  async function createOnlineOrder(values) {
    console.log("######## Online ######");
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        values,
      },
    };

    let { data } = await axios.request(options);

    console.log(data);

    toast.loading("redirect to payment gateway...");

    if (data.status === "success") {
      window.location.href = data.session.url;
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },

    onSubmit: (values) => {
      if (orderType === "cash") {
        createCashOrder(values);
      } else {
        createOnlineOrder(values);
      }
    },
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Shipping Address</h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          className="form-control w-full mb-3"
          placeholder="City"
          name="shippingAddress.city"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
        />
        <input
          type="tel"
          className="form-control w-full mb-3"
          placeholder="Phone"
          name="shippingAddress.phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
        />
        <textarea
          placeholder="details"
          name="shippingAddress.details"
          className="form-control w-full"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
        ></textarea>
        <button
          onClick={() => {
            setOrderType("cash");
          }}
          type="submit"
          className="btn-primary bg-blue-500 mr-4"
        >
          Cash Order
        </button>
        <button
          onClick={() => {
            setOrderType("online");
          }}
          type="submit"
          className="btn-primary"
        >
          Online Order
        </button>
      </form>
    </>
  );
}
