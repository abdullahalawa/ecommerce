import logo from "../../assets/images/freshcart-logo.svg";

export default function Navbar() {
  return (
    <>
      <nav className="bg-slate-100 p-3">
        <div className="container  flex gap-8">
          <h1>
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </h1>

          <ul className="flex gap-6 items-center">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Products</a>
            </li>
            <li>
              <a href="/">Categories</a>
            </li>
            <li>
              <a href="/">Brands</a>
            </li>
          </ul>

          <ul className="flex gap-6 items-center ms-auto">
            <li>
              <a href="https://www.facebook.com">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>

            <li>
              <a href="https://www.twitter.com">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>

            <li>
              <a href="https://www.tiktok.com">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>

            <li>
              <a href="https://www.youtube.com">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>

            <li>
              <a href="https://www.instagram.com">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>

          <ul className="flex gap-6 items-center">
            <li>
              <a href="/login">Login</a>
            </li>

            <li>
              <a href="/signup">Sign up</a>
            </li>

            <li>
              <a href="">
                <i className="fa-solid fa-right-from-bracket text-2xl"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
