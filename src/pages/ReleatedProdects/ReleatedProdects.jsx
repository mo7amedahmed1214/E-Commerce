import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../component/Loading/Loading";
import Card from "../../component/Card/Card";



export default function ReleatedProdects() {
    const [products, setProducts] = useState(null)
    let { id } = useParams()
    // * API spacific Category
    async function getReleatedProducts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
                method: "GET"
            }
            let { data: { data } } = await axios.request(options)
            console.log(data);
            setProducts(data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getReleatedProducts()
    },[])

    return< >
{products===null?<Loading/>:<section>
    {products.length===0?  <div className="py-7 px-4 bg-slate-100 rounded-2xl flex justify-center items-center flex-col gap-4 ">

<p className="text-center">OOps! No Products Of This Category, Starting shoping now by clicking the button below and find something you love!</p>
<Link className="btn bg-primary-500  hover:bg-primary-700 text-white" to="/">Back To Home</Link>
</div> :<div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
    {
        products.map((product)=><Card key={product.id} productInfo={product}/>)
    }
    </div>}
    
    
    
    
    
    
    
    </section>}


    </>
}
