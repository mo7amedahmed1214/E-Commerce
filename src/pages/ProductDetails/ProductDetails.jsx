import axios from "axios"
import { useContext, useEffect, useState } from "react";
import Loading from "../../component/Loading/Loading";
import Card from "../../component/Card/Card";
import { useParams } from "react-router-dom";
import { cartContext } from "../../context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import { wishListContext } from "../../context/Wishlist.context";
import { Helmet } from "react-helmet";
import { Autoplay } from "swiper/modules";


export default function ProductDetails() {

    let [productDetails, setproductDetails] = useState(null)
    let [relaatedProduct, setRoeleatedProduct] = useState(null)
    let { addProductToCart } = useContext(cartContext)
    let { getProductToWishList } = useContext(wishListContext)
    let { id } = useParams()
    useEffect(() => {
        getProductDetails()
        getProductToWishList()
    }, [id])
    useEffect(() => {
        if (productDetails === null) return;
        getReleatedProducts()
    }, [productDetails])





    // *API method
    async function getProductDetails() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method: "GET",

            }
            let { data: { data } } = await axios.request(options)
            console.log(data);
            setproductDetails(data)
        } catch (error) {
            console.log(error);

        }

    }

    // * API spacific Category
    async function getReleatedProducts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                method: "GET"
            }
            let { data: { data } } = await axios.request(options)
            console.log(data);
            setRoeleatedProduct(data)
        } catch (error) {
            console.log(error);

        }


    }
    return < >
        <Helmet>
            <title>Product Details</title>
            <meta name="description" content="Find out the details of the products you clicked on" />
        </Helmet>

        {productDetails ?
            < >
                <Helmet>
                    <title>{productDetails.title}</title>
                </Helmet>

                <section className="grid grid-cols-12  gap-7 shadow-lg p-2 rounded-lg overflow-hidden">
                    <div className="col-span-12 md:col-span-3">
                        <ReactImageGallery
                            showFullscreenButton={false}
                            showNav={false}
                            showPlayButton={false}
                            items={productDetails.images.map((image) => {
                                return {
                                    original: image,
                                    thumbnail: image,
                                }
                            })

                            } />
                    </div>
                    <div className="col-span-12 md:col-span-9 space-y-4">
                        <div>
                            <h2 className="text-2xl text-gray-800 font-semibold">{productDetails.title} </h2>
                            <h2 className="text-primary-600 font-semibold">{productDetails.category.name}  </h2>
                        </div>
                        <p className="text-black font-semibold text-lg ">Brand:<span className="text-sm ml-1">{productDetails.brand.name}</span></p>
                        <p className="text-gray-400 "><p className="text-black font-semibold text-lg ">Description:</p>{productDetails.description}</p>
                        <div className="flex items-center justify-between">
                           
                        {productDetails.priceAfterDiscount > 0 ? <div className="flex gap-1 items-baseline ">
                        <del className="text-sm text-gray-400 ">{productDetails.price}</del>
                        <span className="text-primary-800 font-semibold text-sm  ">{productDetails.priceAfterDiscount} L.E</span>
                    </div> : <span className="text-primary-800 font-semibold text-sm ">{productDetails.price} L.E</span>}

                            <p>{productDetails.ratingsAverage} <i className="fa-solid fa-star text-orange-300"></i></p>
                        </div>
                        <button
                            onClick={() => {
                                addProductToCart({ productId: id })
                            }}
                            className="brn bg-primary-500 hover:bg-primary-700  text-white w-full rounded-lg font-semibold "> Add To Cart</button>
                    </div>



                </section>

                <section className="mt-12">
                    <h2 className="text-gray-800 text-xl  mb-2 font-semibold">Releated Product:</h2>

                    {relaatedProduct ? <Swiper loop={true} 
                      breakpoints={{
                        400: {
                          slidesPerView: 2, 
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 3, 
                          spaceBetween: 30,
                        },
                        1024: {
                          slidesPerView: 6, 
                          spaceBetween: 15,
                        },
                      }}
                modules={[Autoplay]} autoplay={{delay:3000}}
                    >
                        {relaatedProduct.map((product) => <SwiperSlide key={product.id}>
                            <Card productInfo={product} />

                        </SwiperSlide>
                        )}
                    </Swiper> : <Loading />}

                </section>

            </>

            : <Loading />}

    </>
}
