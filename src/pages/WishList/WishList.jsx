import { useContext, useEffect, useState } from "react"
import { wishListContext } from "../../context/Wishlist.context"
import Loading from "../../component/Loading/Loading"
import { Link } from "react-router-dom"
import WishItem from "../../component/WishItem/WishItem"
import { Helmet } from "react-helmet"


export default function WishList() {

    let { getProductToWishList, products } = useContext(wishListContext)

    useEffect(() => {
        getProductToWishList()
    },[])


    return < >
        <Helmet>
            <title>Wishlist</title>
            <meta name="description" content="Find all your favourite products here" />
        </Helmet>

        {products === null ? <Loading /> :

            <section className=" p-4 rounded-xl space-y-5 bg-slate-100 " >
                <h2 className="text-gray-800 font-bold text-2xl  mb-4 ">My Wish List :</h2>

                {products.length === 0 ?
                    <div className="py-7 px-4 bg-slate-100 rounded-2xl flex justify-center items-center flex-col gap-4 ">

                        <p className="text-center">OOps! Your WishList is empty, Starting shoping now by clicking the button below and find something you love!</p>
                        <Link className="btn bg-primary-500  hover:bg-primary-700 text-white" to="/">Back To Home</Link>
                    </div>


                    :

                    products.map((product) => <WishItem key={product._id} wishInfo={product} />)

                }






            </section>}
    </>
}
