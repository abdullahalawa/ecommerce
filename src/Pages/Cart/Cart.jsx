import React from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <>
      <section className="bg-slate-100 p-5">
        <h2 className="text-2xl font-bold mb-2">
          <span> Shop Cart</span>
          <i className="fa-solid fa-cart-shopping ml-2"></i>
        </h2>

        <div className="py-16 flex flex-col justify-center items-center">
          <h3 className="text-lg">there are no items yet</h3>
          <Link to={"/"} className="btn-primary text-sm mt-2">
            ADD YOUR FIRST PRODUCT TO CART
          </Link>
        </div>
      </section>
    </>
  );
}
