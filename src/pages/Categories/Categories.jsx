import axios from "axios";
import Loading from "../../component/Loading/Loading";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";



export default function Categories() {
  
   
    // !get category
        
        async function getCategory() {
            try {
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/categories",
                    method: "GET"
                }
                return axios.request(options)
               
    
            } catch (error) {
                console.log(error);
    
            }
    
        }
    
        let { data,isLoading } = useQuery({
            queryKey: ['category'],
            queryFn: getCategory,
            refetchOnMount: false,
            staleTime: 6 * 60 * 60 * 1000,
        })
        if (isLoading) return <Loading />


    return < >

<Helmet>
      <title>
                Categories
            </title>
            <meta name="description" content="Freshcart categories page explore all categories" />
</Helmet>

        <section className="py-3">
            
         <div
           
         className="grid gap-7  sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
                {data.data.data.map((category) => <div key={category._id} className="cursor-pointer border-2 border-opacity-35 border-gray-300 hover:shadow-xl overflow-hidden shadow-md rounded-md  hover:-translate-y-3 hover:shadow-primary-400  transition-[transform,box-shadow] duration-300 ease-in-out delay-[0s,10ms] ">
                   <Link to={`/ReleatedProdects/${category._id}`}>
                   <header className="h-64 mb-2 w-full " >
                        <img src={category.image} className="w-full h-full object-cover" alt={category.name} />
                    </header>
                    <h3 className="text-gray-600 font-semibold px-2 text-lg w-full text-center ">{category.name}</h3>
                   </Link>
                </div>

                )}

            </div>
        </section>
    </>
}
