import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function VarifyResetCode() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);

  const verificationCodeRegex = /^[0-9]{1,6}$/;

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("verification code is required")
      .matches(
        verificationCodeRegex,
        "verification code should be 6 digits number only"
      ),
  });

  async function submitVerificationCode(values) {
    let id;

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };

      id = toast.loading("Waiting...");

      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("Email varified successfully");

      setTimeout(() => {
        if (data.status == "Success") {
          navigate("/auth/reset-password");
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
      resetCode: "",
    },

    validationSchema,

    onSubmit: submitVerificationCode,
  });

  return (
    <>
      <section>
        <h2 className="text-2xl text-primary font-bold mb-6">
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>please enter your verification code</span>
        </h2>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              className="form-control w-full"
              placeholder="verification code"
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.resetCode}
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
