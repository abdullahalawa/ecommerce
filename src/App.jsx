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
import Checkout from "./Pages/Checkout/Checkout";
import AllOrders from "./Pages/AllOrders/AllOrders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import Products from "./Pages/Products/Products";
import { Offline, Online } from "react-detect-offline";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import FavoriteProvider from "./Context/Favorite.context";
import Wishlist from "./Pages/Wishlist/Wishlist";

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
        { path: "/products", element: <Products /> },
        { path: "/categories", element: <Categories /> },
        { path: "/brands", element: <Brands /> },
        { path: "/category/:id", element: <h2>Category</h2> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "/checkout", element: <Checkout /> },
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

  const myClient = new QueryClient();

  return (
    <>
      <Online>
        <QueryClientProvider client={myClient}>
          <UserProvider>
            <CartProvider>
              <FavoriteProvider>
                <RouterProvider router={routes}></RouterProvider>
                <ReactQueryDevtools></ReactQueryDevtools>
                <Toaster />
              </FavoriteProvider>
            </CartProvider>
          </UserProvider>
        </QueryClientProvider>
      </Online>
      <Offline>User is offline</Offline>
    </>
  );
}

export default App;
