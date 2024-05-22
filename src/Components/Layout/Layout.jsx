import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "./../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="container pb-[240px] pt-[80px]">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
