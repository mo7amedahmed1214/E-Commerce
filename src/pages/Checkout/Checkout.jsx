import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import { cartContext } from "../../context/Cart.context"
import { userContext } from "../../context/User.context"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Helmet } from "react-helmet"
import { object, string } from "yup"

export default function Checkout() {

    let { cartInfo } = useContext(cartContext)
    let { token } = useContext(userContext)
    let [paymentMethod, setPaymentMethod] = useState(null)
    let navigate = useNavigate()



    const phoneRegex = /^(02)?01[0125][0-9]{8}$/


    const validationSchema = object({
        
        shippingAddress: object({
            city: string().required("Your City is required")
                .min(3, "Your City must be at least 3 characters")
                .max(25, "Your City must not more than 25 characters"),
            phone: string().required('Phone is required')
                .matches(phoneRegex, "Sorry! We Accept Egyptian Phone Numbers"),
            details: string().required('Details are required')
                .min(3, "Details must be at least 3 characters")
                .max(25, "Details must not more than 25 characters"),
        })

    })


    // !cash order
    async function creatCashOrder(values) {
        let toastId = toast.loading("We Are Creating Your Order...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method: "POST",
                headers: {
                    token,
                },
                data: values
            }
            let { data } = await axios.request(options)
            if (data.status === "success") {
                toast.success("Your order has been created")
                setTimeout(() => {
                    navigate("/allorders")
                }, 2000)
            }
            console.log(data);
        } catch (error) {
            console.log(error);


        } finally {
            toast.dismiss(toastId)
        }

    }

    // ^ online order
    async function creatOnlineOrder(values) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method: "POST",
                headers: {
                    token,
                },
                data: values
            }
            let { data } = await axios.request(options)
            data.status === "success" && setTimeout(() => {
                location.href = data.session.url
            }, 2000), toast.loading("We redirecting you to stripe")
            console.log(data);
        } catch (error) {
            console.log(error);

        }

    }


    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: ""
            }
        },
        onSubmit: (values) => {
            if (paymentMethod === "cash") creatCashOrder(values)
            if (paymentMethod === "online") creatOnlineOrder(values)

        },
        validationSchema,
    })

    console.log(formik);
    return < >
        <Helmet>
            <title>Checkout</title>
            <meta name="description" content="Freshcart checkout page pay your products cash or credit" />
        </Helmet>


        <section>
            <h2 className="text-gray-800 text-xl font-semibold mb-3">Shipping Address</h2>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>


                <div className="city">
                    <input type="text"
                        placeholder="City"
                        className="form-control w-full"
                        value={formik.values.shippingAddress.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="shippingAddress.city" />
                    {formik.errors.shippingAddress?.city && formik.touched.shippingAddress?.city && <p className="text-red-600 font-semibold text-sm ">*{formik.errors.shippingAddress?.city}</p>}
                </div>


                <div className="phone">
                    <input type="tel"
                        placeholder="Phone"
                        className="form-control w-full"
                        value={formik.values.shippingAddress.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="shippingAddress.phone" />
                    {formik.errors.shippingAddress?.phone && formik.touched.shippingAddress?.phone && <p className="text-red-600 font-semibold text-sm ">*{formik.errors.shippingAddress?.phone}</p>}
                </div>

                <div className="details">
                    <textarea
                        placeholder="Details"
                        className="form-control w-full"
                        value={formik.values.shippingAddress.details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="shippingAddress.details" ></textarea>
                    {formik.errors.shippingAddress?.details && formik.touched.shippingAddress?.details && <p className="text-red-600 font-semibold text-sm ">*{formik.errors.shippingAddress?.details}</p>}
                </div>

                <button
                    onClick={() => {
                        setPaymentMethod("cash")
                    }}
                    type="submit" className="btn  font-semibold mr-2 bg-blue-500 hover:bg-blue-700 text-white">Cash Order</button>
                <button
                    onClick={() => {
                        setPaymentMethod("online")
                    }}
                    type="submit" className="btn font-semibold bg-lime-500 hover:bg-lime-700 text-white ">Online payment</button>
            </form>
        </section>


    </>
}
