import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/User.context";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(userContext);
  const [errorMsg, setErrorMsg] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),

    newPassword: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][0-9a-zA-Z]{5,25}$/,
        "password should start with uppercase followed by a combination of letters and numbers from 5 to 25 "
      ),
  });

  async function resetPassword(values) {
    let id;

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };

      id = toast.loading("Waiting...");

      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(id);
      toast.success("Your Password reset successfully");

      setTimeout(() => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
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
      newPassword: "",
    },

    validationSchema,

    onSubmit: resetPassword,
  });

  return (
    <>
      <section>
        <h2 className="text-2xl text-primary font-bold mb-6">
          <i className="fa-regular fa-circle-user me-3"></i>
          <span>Reset your password now!</span>
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

          <div>
            <input
              type="password"
              className="form-control w-full"
              placeholder="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div className="text-red-600 font-semibold mt-2">
                * {formik.errors.newPassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className="btn-primary">
            Reset
          </button>
        </form>
      </section>
    </>
  );
}
