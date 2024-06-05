import { useFormik } from "formik";
import React from "react";
import { cartContext } from "../../Context/Cart.context";

export default function Checkout() {

    const {cartInfo} = useContext(cartContext)


    function createCashOrder(){
        

        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/orders/${}`,
            method: ""
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
      console.log(values);
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
        <button type="submit" className="btn-primary bg-blue-500 mr-4">
          Cash Order
        </button>
        <button type="submit" className="btn-primary">
          Online Order
        </button>
      </form>
    </>
  );
}
