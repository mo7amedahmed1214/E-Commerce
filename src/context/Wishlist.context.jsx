import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userContext } from "./User.context";
import axios from "axios"

// & creat context
export let wishListContext = createContext(null)

// ^ creat component provider
export default function WishListProvider({ children }) {

    let { token } = useContext(userContext)
    let [products, setProducts] = useState(null)
    let [dataOfWish, setDataOfWish] = useState(null)
    let [dataOfAdd, setDataOfAdd] = useState(null)

    //  *get function
    async function getProductToWishList() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "GET",
                headers: {
                    token,
                }

            }
            let { data } = await axios.request(options)

            console.log(data);
            setProducts(data.data)
        } catch (error) {
            console.log(error);


        }
    }

    useEffect(() => {
        products ? setDataOfWish(products?.map((product) => {
            return product.id
        })) : null

    }, [products])



    //* add function 
    async function addWishList({ productId }) {

        const toastId = toast.loading('waiting...')
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    productId,
                }

            }
            let { data } = await axios.request(options)

            console.log(data.data);
            setDataOfAdd(data.data)
            getProductToWishList()
            toast.success(data.message)



        } catch (error) {
            console.log(error);
        } finally {
            toast.dismiss(toastId)

        }
    }

    // ! delete
    async function deletFromWishList({ productId }) {
        // let toastId = toast.loading('Deleting Product...')
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                method: 'DELETE',
                headers: {
                    token,
                }
            }
            let { data } = await axios.request(options)
            toast.success(data.message)

            console.log(data);
            getProductToWishList()
            setDataOfWish(data.data)
            setDataOfAdd(data.data)

        } catch (error) {
            console.log(error);


        } finally {
            // toast.dismiss(toastId)
        }

    }

    return <wishListContext.Provider value={{ addWishList, getProductToWishList, products, deletFromWishList,dataOfAdd, dataOfWish }}>
        {children}
    </wishListContext.Provider>
}