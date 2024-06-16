import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),
  });

  async function resetPassword(values) {
    let id;

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };

      id = toast.loading("Waiting...");

      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("A varefication code has been sent to your email");

      setTimeout(() => {
        if (data.statusMsg === "success") {
          navigate("/auth/verify-code");
        }
      }, 2000);
    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema,

    onSubmit: resetPassword,
  });

  return (
    <>
      <section>
        <h2 className="text-2xl text-primary font-bold mb-6">
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>please enter your Email to receive your verification code</span>
        </h2>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="email"
              className="form-control w-full"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.email}
              </div>
            ) : (
              ""
            )}

            {errorMsg ? (
              <div className="text-red-600 font-semibold mt-2">
                * {errorMsg}
              </div>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className="btn-primary">
            Verify
          </button>
        </form>
      </section>
    </>
  );
}
