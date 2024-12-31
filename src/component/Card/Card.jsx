import { useContext, useEffect, useState } from "react"
import { cartContext } from "../../context/Cart.context"
import { Link } from "react-router-dom"
import { wishListContext } from "../../context/Wishlist.context"


export default function Card({ productInfo }) {
    const { id, title, description, category, imageCover, ratingsAverage, price, priceAfterDiscount } = productInfo

    let { addProductToCart } = useContext(cartContext)
    let { addWishList, dataOfAdd, deletFromWishList, dataOfWish } = useContext(wishListContext)


    return < >
        <div className="card  group/card overflow-hidden shadow-lg rounded-lg  hover:-translate-y-3 hover:shadow-primary-400  transition-[transform,box-shadow] duration-300 ease-in-out delay-[0s,10ms] ">
            <div className="relative ">
                <img src={imageCover} className="w-full h-full" alt={title} />
                <div className="layer w-full  h-full bg-slate-400 bg-opacity-45 left-0 top-0 gap-4 absolute flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 ">
                    <div
                        onClick={(e) => {
                            console.log(dataOfAdd);
                            
                            if (dataOfAdd?.includes(`${id}`)) {
                                deletFromWishList({ productId: id })
                                e.target.classList.add("!text-white")
                                


                            } else {
                                addWishList({ productId: id })
                                e.target.classList.add("!text-red-600")
                            }
                        }}
                        className="w-8 h-8 heart rounded-full bg-primary-500 flex items-center justify-center text-white cursor-pointer">
                        <i className={`fa-solid fa-heart ${dataOfWish?.includes(`${id}`) ? "!text-red-600" : "text-white"}`}></i>
                    </div>
                    <div
                        onClick={() => {
                            addProductToCart({ productId: id })
                        }}
                        className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white cursor-pointer">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <Link to={`/product/${id}`} className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white cursor-pointer">
                        <i className="fa-solid fa-eye"></i>
                    </Link>

                </div>
            </div>


            <div className="body-card p-4 space-y-3">
                <div className="header">
                    <h3 className="text-lg text-gray-700 font-semibold line-clamp-1">
                        <Link to={`/product/${id}`}>{title}</Link>      </h3>
                    <h4 className="font-semibold text-primary-500">{category.name}</h4>
                </div>
                <p className="line-clamp-2 text-gray-400 text-sm">{description}</p>
                <div className="icon-card flex justify-between items-center">

                    {priceAfterDiscount > 0 ? <div className="flex gap-1 items-baseline ">
                        <del className="text-sm text-gray-400 ">{price}</del>
                        <span className="text-primary-800 font-semibold text-sm  ">{priceAfterDiscount} L.E</span>
                    </div> : <span className="text-primary-800 font-semibold text-sm ">{price} L.E</span>}

                    <p className="text-sm font-semibold"><i className="fa-solid fa-star text-yellow-300 mr-1 "></i>{ratingsAverage}</p>
                </div>
            </div>
        </div >

    </>
}
