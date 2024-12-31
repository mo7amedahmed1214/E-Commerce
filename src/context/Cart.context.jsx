import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export let cartContext = createContext(null)

export default function CartProvider({ children }) {
    let { token } = useContext(userContext)
    let [cartInfo, setCartInfo] = useState(null)



    // ^add Product
    async function addProductToCart({ productId }) {
        let toastId = toast.loading("adding product...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    productId,
                }

            }

            let { data } = await axios.request(options)
            if (data.status === "success") {
                toast.success(data.message)
                getProductToCart()
            }
            console.log(data);
        } catch (error) {
            console.log(error);

        } finally {
            toast.dismiss(toastId)
        }



    }

    //^ get product
    async function getProductToCart() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token,
                }
            }
            let { data } = await axios.request(options)
            console.log(data);

            setCartInfo(data)

        } catch (error) {
            console.log(error);


        }

    }

    // ! delete product
    async function deleteProductFromCart({ productId }) {
        let toastId = toast.loading("Deleting Product...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "DELETE",
                headers: {
                    token,
                }
            }
            let { data } = await axios.request(options)
           if (data.status === "success") {
            toast.success("Prodct has been deleted")
             setCartInfo(data)
             console.log(data);
           } 
           


        } catch (error) {
            console.log(error);


        } finally {
            toast.dismiss(toastId)
        }

    }

    // !cleared cart
    async function clearCart() {
        let toastId = toast.loading("Clearing Cart...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart`,
                method: "DELETE",
                headers: {
                    token,
                }
            }
            let { data } = await axios.request(options)
            data.message === "success" && toast.success("Cart has been cleared"),
                setCartInfo({ numOfCartItems: 0 })
            console.log(data);


        } catch (error) {
            console.log(error);


        } finally {
            toast.dismiss(toastId)
        }

    }

    //* Update count
    async function updateCount({ productId, count }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "PUT",
                headers: {
                    token,
                },
                data: {
                    count,
                }
            }
            let { data } = await axios.request(options)
            data.status === "success" && setCartInfo(data)
            console.log(data);

        } catch (error) {
            console.log(error);


        }

    }



    return <cartContext.Provider
        value={{ addProductToCart, getProductToCart, cartInfo, setCartInfo, deleteProductFromCart, clearCart, updateCount }} >
        {children}
    </cartContext.Provider>
}