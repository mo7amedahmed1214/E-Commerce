import { jwtDecode } from "jwt-decode"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../../context/User.context"
import axios from "axios"
import Loading from "../../component/Loading/Loading"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Orders() {
    let [orders, setOrders] = useState(null)
    let { token } = useContext(userContext)
    let { id } = jwtDecode(token)

    async function getUserOrder() {
        try {
            const option = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET",
            }
            let { data } = await axios.request(option)
            console.log(data);
            setOrders(data);


        } catch (error) {
            console.log(error);


        }
    }
    useEffect(() => {
        getUserOrder()
    },[])


    return < >
        <Helmet>
            <title>All Orders</title>
            <meta name="description" content="Freshcart orders page explore your order now!." />
        </Helmet>

        {orders ? <section className="space-y-4">
            {orders.map((order) =>
                <div key={order.id} className="order border-2 p-2 space-y-6 rounded-md ">
                    <header className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500">Order ID</p>
                            <p className="text-gray-800 font-semibold">#{order.id}</p>
                        </div>
                        <div className="flex space-x-2">
                            {order.isPaid ?
                                <p className="text-white font-cairo bg-lime-500 px-3 py-1 rounded-full border-2 border-opacity-35 border-white font-semibold"> تم الدفع</p>
                                : <p className="text-white font-cairo bg-red-500 px-3 py-1 rounded-full border-2 border-opacity-35 border-white font-semibold">غير مدفوع</p>}
                            {order.isDelivered ?
                                <p className="text-white font-cairo bg-lime-500 px-3 py-1 rounded-full border-2 border-opacity-35 border-white font-semibold">تم الاستلام</p>
                                :
                                <p className="text-white font-cairo bg-blue-500 px-3 py-1 rounded-full border-2 border-opacity-35 border-white font-semibold">قيد التوصيل</p>
                            }
                        </div>
                    </header>
                    <div className="order-body   grid gap-5 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {order.cartItems.map((item) => <div key={item._id} className="product_item space-y-4 overflow-hidden   shadow-lg  rounded-md border-2 border-opacity-25 border-gray-400    hover:shadow-primary-400  transition-shadow duration-300 ease-in-out delay-[0s,10ms] ">
                            <img src={item.product.imageCover}
                                className="w-full"
                                alt={item.product.title} />
                            <div className="space-y-2 p-4 ">
                                <h1 className="text-gray-700 text-lg font-semibold line-clamp-2">
                                    <Link to={`/product/${item.product.id}`}>{item.product.title}</Link>
                                </h1>
                                <div className="flex justify-between items-center">
                                    <p><span className="font-semibold text-gray-600 underline">count:</span>{item.count}</p>
                                    <p>
                                        <span className="text-primary-500 mr-1 font-semibold"> {item.price}</span>L.E
                                    </p>
                                </div>
                            </div>

                        </div>)}
                    </div>
                    <p className="text-lg  mt-2">Total Price Of Order Is <span className="text-primary-500 font-semibold mx-0.5">{order.totalOrderPrice}</span> L.E</p>
                </div>

            )}

        </section> : <Loading />}




    </>
}
