import axios from "axios"
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";



export default function CategorySlider() {


    async function getCategory() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET"
        }
        return axios.request(options)



    }



    let { isLoading, data } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategory,
        refetchOnMount: false,
        staleTime: 6 * 60 * 60 * 1000,

    })
    
    if (isLoading) return <Loading />

    return < >

        <section className="mt-8 mb-12">
            <h2 className="font-semibold mb-3">Shop Popular Categories</h2>


            <Swiper
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
                        spaceBetween: 0,
                    },
                }}
                modules={[Autoplay]} autoplay={{ delay: 2000 }}
                loop={true}>
                {data.data.data.map((category) => {
                    return <SwiperSlide key={category._id}>
                        <Link to={`/ReleatedProdects/${category._id}`} className="cursor-pointer">
                            <div className="h-64 mb-2 " >
                                <img src={category.image} className="w-full h-full sm:object-fill md:object-cover" alt={category.name} />
                            </div>
                            <h3>{category.name}</h3>
                        </Link>

                    </SwiperSlide>
                })}

            </Swiper>



        </section>

    </>
}
