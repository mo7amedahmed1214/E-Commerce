import axios from "axios";
import Loading from "../../component/Loading/Loading";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";




export default function Brands() {


    // !get brands






    async function getBrands() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/brands",
                method: "GET"
            }
            return axios.request(options)


        } catch (error) {
            console.log(error);

        }

    }


    let { isLoading, data } = useQuery({
        queryKey: ['brands'],
        queryFn: getBrands,
        refetchOnMount: false,
        staleTime: 6 * 60 * 60 * 1000,
    })
    if (isLoading) return <Loading />

    return < >

        <Helmet>
            <title>
                Brands
            </title>
            <meta name="description" content="Freshcart brands page explore all brands" />
        </Helmet>

        <section className="py-3">

            <div

                className="grid gap-7  sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
                {data.data.data.map((brand) => <div key={brand._id} className="cursor-pointer border-2 border-opacity-35 border-gray-300 hover:shadow-xl overflow-hidden shadow-md rounded-md hover:-translate-y-3 hover:shadow-primary-400  transition-[transform,box-shadow] duration-300 ease-in-out delay-[0s,10ms] ">
                    <div className="p-3">
                        <header className="h-64  w-full " >
                            <img src={brand.image} className="w-full h-full object-contain" alt={brand.name} />
                        </header>
                        <h3 className="text-gray-600  px-2 text-lg w-full text-center ">{brand.name}</h3>
                    </div>
                </div>

                )}

            </div>
        </section>
    </>
}
