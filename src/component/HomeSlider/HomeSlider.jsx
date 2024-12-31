import sliderimage1 from "../../assets/images/slider-image-1.jpeg"
import sliderimage2 from "../../assets/images/slider-image-2.jpeg"
import sliderimage3 from "../../assets/images/slider-image-3.jpeg"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from "swiper/modules";

export default function HomeSlider() {
    return < >

        <section className="grid grid-cols-12 mb-8 gap-1">
            <div className="col-span-12 md:col-span-8">
               
                <Swiper loop={true} className="h-full" modules={[Autoplay]} autoplay={{delay:2000}} >
                    <SwiperSlide>
                    <img src={sliderimage1}  className="w-full h-full" alt="slider-image-1" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={sliderimage2}  className="w-full h-full" alt="slider-image-2" />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={sliderimage3}  className="w-full h-full" alt="slider-image-3" />
                    </SwiperSlide>
                    </Swiper>
            </div>
            <div className=" flex col-span-12 gap-1 md:inline-block md:col-span-4 ">
               <div className="h-full md:h-1/2 ">
               <img className="w-full h-full" src={sliderimage1} alt="slider-image-1" />
               </div>
                <div className="h-full md:h-1/2 md:pt-1 ">
                <img className="w-full h-full" src={sliderimage2} alt="slider-image-2" />
                </div>
            </div>
        </section>

    </>
}
