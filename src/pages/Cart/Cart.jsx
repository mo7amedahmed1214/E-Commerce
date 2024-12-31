import { useContext, useEffect } from "react"
import { cartContext } from "../../context/Cart.context"
import Loading from "../../component/Loading/Loading"
import CartItem from "../../component/CartItem/CartItem"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Cart() {
    let { getProductToCart, cartInfo, clearCart } = useContext(cartContext)

    useEffect(() => {
        getProductToCart()
    },[])


    return < >

        <Helmet>
            <title>Cart</title>
            <meta name="description" content="Freshcart cart page your pdoructs are ready here" />
        </Helmet>

        {cartInfo === null ? <Loading /> :
            <section>
                <div className="flex gap-8 items-center mb-7">
                    <i className="fa-brands fa-opencart text-xl font-semibold"></i>
                    <h2 className="text-xl font-semibold text-gray-800 relative before:absolute before:w-0.5 before:h-3/4 before:-left-4 before:top-1 before:bg-gray-800">Your Shopping Cart</h2>
                </div>



                {cartInfo.numOfCartItems === 0 ?
                    <div className="py-7 px-4 bg-slate-100 rounded-2xl flex justify-center items-center flex-col gap-4 ">

                        <p className="text-center">OOps! Your cart is empty, Starting shoping now by clicking the button below and find something you love!</p>
                        <Link className="btn bg-primary-500  hover:bg-primary-700 text-white" to="/">Back To Home</Link>
                    </div> :
                    < >
                        <div className="space-y-5    ">
                            {cartInfo.data.products.map((product) => <CartItem key={product._id} productInfo={product} />)}
                        </div>
                        <div className="flex items-baseline justify-between mt-5">
                            <p className="text-[16px] md:text-lg"><i className="fa-solid fa-dollar-sign text-primary-500 text-xl"></i > Your Total Cart Price Is <span className=" font-semibold text-[16px] md:text-lg mr-1 text-primary-500 ">{cartInfo.data.totalCartPrice}</span></p>
                            <button
                                onClick={clearCart}
                                className="btn bg-red-600 text-[16px] md:text-lg  hover:bg-red-700 text-white "><i className="fa-solid fa-trash"></i> Delete Cart</button>
                        </div>
                        <Link
                            className="btn bg-primary-500 hover:bg-primary-700 text-white w-full font-semibold inline-block mt-3 text-center text-lg"
                            to="/checkout"> Next Step (payment)</Link>
                    </>
                }
            </section>}
    </>
}
