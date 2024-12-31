import { Outlet } from "react-router-dom";
import Navbar from "../Navber/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return< >
  <Navbar/>
  <div className="container min-h-[60vh] pb-10 mb-1 pt-20 px-6 sm:px-3">
  <Outlet/>
  </div>
  <Footer/>
  
  </>
}
