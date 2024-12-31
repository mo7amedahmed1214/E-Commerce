import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./component/Layout/Layout"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Signup from "./pages/Signup/Signup"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute"
import GuestRoute from "./component/GuestRoute/GuestRoute"
import UserProvider from "./context/User.context"
import CartProvider from "./context/Cart.context"
import Cart from "./pages/Cart/Cart"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import Checkout from "./pages/Checkout/Checkout"
import Orders from "./pages/Orders/Orders"
import Offline from "./component/Offline/Offline"
import ForgetPassword from "./pages/ForgetPasswpord/ForgetPassword"
import VerifyCode from "./pages/VerifyCode/VerifyCode"
import ResetPassword from "./pages/ResetPassword/ResetPassword"
import WishList from "./pages/WishList/WishList"
import WishListProvider from "./context/Wishlist.context"
import Products from "./pages/Proucts/Products"
import Categories from "./pages/Categories/Categories"
import Brands from "./pages/Brands/Brands"
import ReleatedProdects from "./pages/ReleatedProdects/ReleatedProdects"
import NotFound from "./pages/NotFound/NotFound"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"




function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <ProtectedRoute>
        <Layout />
      </ProtectedRoute>,
      children: [
        { index: true, path: "E-Commerce", element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "wishlist", element: <WishList /> },
        { path: "products", element: <Products /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "ReleatedProdects/:id", element: <ReleatedProdects /> },
        { path: "*", element: <NotFound /> },

      ]

    },


    {
      path: "/", element: <GuestRoute>
        <Layout />
      </GuestRoute>, children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verify", element: <VerifyCode /> },
        { path: "reset", element: <ResetPassword /> },
      ]
    }



  ])

  const myClient = new QueryClient()
  return < >



    <QueryClientProvider client={myClient}>

      <UserProvider>
        <WishListProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </WishListProvider>
      </UserProvider>
      <Toaster toastOptions={{
        style: {
          fontWeight: "600", fontSize: "14px", fontFamily: "sans-serif"
        }
      }} />

      <Offline>
        <div className="p-2 rounded-md font-semibold bg-gray-200  fixed bottom-6 right-6 z-50">
          <i className="fa-solid fa-wifi  "></i>
          <span> Check Your Internet Connection</span>
        </div>
      </Offline>

    </QueryClientProvider>

  </>

}

export default App
