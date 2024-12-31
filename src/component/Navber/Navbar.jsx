import { Link, NavLink } from "react-router-dom"
import freshCartLogo from "../../assets/images/freshcart-logo.svg"
import { useContext, useEffect } from "react"
import { userContext } from "../../context/User.context"
import { cartContext } from "../../context/Cart.context"
export default function Navbar() {
    let { token, clearToken } = useContext(userContext)
    let { cartInfo, getProductToCart } = useContext(cartContext)
    useEffect(() => {
        getProductToCart()
    }, [])

    // ^link of pages
    const togelPages = document.querySelector('.togelPages')

    const linkPages = document.querySelector('.linkPages')
    let state = "hidden"

    togelPages?.addEventListener('click', function () {
        console.log('hello');
        if (state === "hidden") {
            linkPages.classList.replace('h-0', 'h-[230px]')
            state = "visible"
        } else {
            linkPages.classList.replace( 'h-[230px]','h-0')
            state = "hidden"
        }



    })



    return < >
        <nav className="bg-slate-100 nav  shadow-sm py-3 fixed   top-0 left-0 right-0 z-30">
            <div className="container  flex items-start gap-8 md:gap-9  lg:items-center lg:gap-12">
                <Link to="/">
                    <img src={freshCartLogo} alt="FreshCart Logo" className=" min-w-12 sm:min-w-16  md:min-w-40 min-h-8 object-fill ml-3" />
                </Link>


                {token &&
                    < >



                        <ul
                            className=" fixed w-full lg:w-fit top-[55px] h-0 lg:h-0 lg:bg-transparent transition-[height] duration-300  overflow-hidden lg:overflow-visible  bg-white text-black flex linkPages lg:relative lg:top-[0px] lg:align-baseline gap-3 py-1 lg:py-3 lg:flex flex-col lg:flex-row lg:gap-5 items-center ">
                            <li className="text-center">
                                <NavLink className={({ isActive }) => {
                                    return `relative text-[15px] lg:text-[16px] before:absolute before:h-0.5 before:w-0   before:bg-primary-500 before:-bottom-1 before:left-0  before:hover:w-full before:transition-[width] before:duration-300  ${isActive && "w-!full font-semibold"} `

                                }} to="/">Home</NavLink>
                            </li>

                            <li className="text-center">
                                <NavLink className={({ isActive }) => {
                                    return `relative text-[15px] lg:text-[16px] before:absolute before:h-0.5 before:w-0   before:bg-primary-500 before:-bottom-1 before:left-0  before:hover:w-full before:transition-[width] before:duration-300  ${isActive && "w-!full font-semibold"} `

                                }} to="/products">Products</NavLink>
                            </li>

                            <li className="text-center">
                                <NavLink className={({ isActive }) => {
                                    return `relative text-[15px] lg:text-[16px] before:absolute before:h-0.5 before:w-0   before:bg-primary-500 before:-bottom-1 before:left-0  before:hover:w-full before:transition-[width] before:duration-300  ${isActive && "w-!full font-semibold"} `

                                }} to="/categories">Categories</NavLink>
                            </li>

                            <li className="text-center">
                                <NavLink className={({ isActive }) => {
                                    return `relative text-[15px] lg:text-[16px] before:absolute before:h-0.5 before:w-0   before:bg-primary-500 before:-bottom-1 before:left-0  before:hover:w-full before:transition-[width] before:duration-300  ${isActive && "w-!full font-semibold"} `

                                }} to="/wishlist">Wish List</NavLink>
                            </li>

                            <li className="text-center">
                                <NavLink className={({ isActive }) => {
                                    return `relative text-[15px] lg:text-[16px] before:absolute before:h-0.5 before:w-0   before:bg-primary-500 before:-bottom-1 before:left-0  before:hover:w-full before:transition-[width] before:duration-300  ${isActive && "w-!full font-semibold"} `

                                }} to="/brands">Brandes</NavLink>
                            </li>


                            <li className="text-center">
                                <NavLink className={({ isActive }) => {
                                    return `relative text-[15px] lg:text-[16px] before:absolute before:h-0.5 before:w-0   before:bg-primary-500 before:-bottom-1 before:left-0  before:hover:w-full before:transition-[width] before:duration-300  ${isActive && "w-!full font-semibold"} `

                                }} to="/allorders">Orders</NavLink>
                            </li>
                        </ul>


                        <Link to="/cart" className="cart ml-auto text-lg cursor-pointer relative ">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <div className="cart-count text-white flex items-center justify-center  text-sm h-5 w-5 rounded-full absolute bg-primary-400 left-0 top-0 translate-x-1/2 -translate-y-1/2">
                                {cartInfo === null ? <i className="fa-solid fa-spinner text-sm fa-spin "></i> : cartInfo.numOfCartItems}
                            </div>
                        </Link>

                        <button className=" togelPages  text-2xl    lg:hidden">
                            <i className="fa-solid fa-bars"></i>
                        </button>

                    </>}

                

                <ul className={`flex items-center gap-5 ${!token && " ml-auto"}`}>
                    {!token &&
                        < >
                            <li>
                                <NavLink className={({ isActive }) => {
                                    return `relative before:absolute before:h-0.5 before:w-0   before:bg-primary-500 before:-bottom-1 before:left-0  before:hover:w-full before:transition-[width] before:duration-300  ${isActive && "w-!full font-semibold"} `

                                }} to="/signup">Signup</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => {
                                    return `relative before:absolute before:h-0.5 before:w-0  mr-3 before:bg-primary-500 before:-bottom-1 before:left-0  before:hover:w-full before:transition-[width] before:duration-300  ${isActive && "w-!full font-semibold"} `

                                }} to="/login">Login</NavLink>
                            </li>
                        </>}
                    {token &&
                        <li className="mr-3">
                            <NavLink to="">
                                <i className="fa-solid fa-right-from-bracket  text-lg" onClick={clearToken}></i>
                            </NavLink>
                        </li>

                    }
                </ul>

            </div>
        </nav>
    </>
}
