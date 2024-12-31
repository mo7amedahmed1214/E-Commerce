import { useContext } from "react"
import { wishListContext } from "../../context/Wishlist.context"
import { cartContext } from "../../context/Cart.context"


export default function WishItem({ wishInfo }) {
    let { id, imageCover, title, price } = wishInfo
    let { deletFromWishList } = useContext(wishListContext)
    let { addProductToCart } = useContext(cartContext)

    return <>
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center p-5 md:gap-4  border-2 border-gray-300 rounded-lg shadow-lg border-opacity-35   hover:shadow-primary-400  transition-[transform,box-shadow] duration-300 ease-in-out delay-[0s,10ms] ">
            <img src={imageCover} alt={title}
                className="w-full md:w-52 md:h-52 md:object-cover" />
            <div className="mr-auto spay-3">
                <h2 className="text-gray-800 text-lg font-semibold">{title}</h2>
                <p className="text-md font-semibold text-primary-600"><span>{price}</span> L.E</p>
                <button
                    onClick={() => {
                        
                        deletFromWishList({ productId: id })



                    }}
                    className=" text-red-500 "><i className="fa-solid fa-trash"></i>Remove</button>
            </div>
            <div>
                <button
                    onClick={() => {
                        addProductToCart({ productId: id })
                        deletFromWishList({ productId: id })

                    }}
                    className="btn bg-primary-500 hover:bg-primary-600 text-white p-4 font-semibold">add to cart</button>
            </div>
        </div>
    </>
}
