import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import { Toaster } from "react-hot-toast";
import { register } from "swiper/element/bundle";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import UserProvider from "./Context/User.context";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import CartProvider from "./Context/Cart.context";

register();

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),

      children: [
        { index: true, element: <Home /> },
        { path: "category/:id", element: <h2>Category</h2> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "*", element: <NotFound /> },
      ],
    },

    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Register /> },
      ],
    },
  ]);

  return (
    <>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={routes}></RouterProvider>
          <Toaster />
        </CartProvider>
      </UserProvider>
    </>
  );
}

export default App;
