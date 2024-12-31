import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../../component/Loading/Loading";
import Card from "../../component/Card/Card";
import { wishListContext } from "../../context/Wishlist.context";
import { Helmet } from "react-helmet";

export default function Products() {
    const [products, setProducts] = useState(null)
    const [newProducts, setNewProducts] = useState(null)
    let { getProductToWishList } = useContext(wishListContext)


    async function getData() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products`,
            method: "GET",
        }
        let { data } = await axios.request(options)
        setProducts(data.data);
        console.log(data);
    }

    useEffect(() => {
        products ? setNewProducts(products) : null
        console.log(newProducts);
    }, [products])



    useEffect(() => {
        getData()
        getProductToWishList()
    },[])


    return < >

        <Helmet>
            <title>
                Products
            </title>
            <meta name="description" content="products page explore products" />
        </Helmet>

        <section className="space-y-12 px-4">
            <div className="flex justify-center w-full mt-6">
                <input

                    onChange={
                        (e) => {
                            setNewProducts(
                                products.filter((product) => {
                                    return product.title.toLowerCase().includes(e.target.value.toLowerCase())

                                }

                                ))
                            console.log(newProducts);


                        }}


                    type="text" className="form-control focus:shadow-lg w-3/4  " placeholder="search..." />
            </div>
            {newProducts === null ? <Loading /> : <div className="grid gap-6 sm:grid-col-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {newProducts.map((product) => <Card key={product.id} productInfo={product} />

                )}
            </div>
            }
        </section>

    </>
}
