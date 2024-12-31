import axios from "axios";
import Card from "../../component/Card/Card";
import Loading from "../../component/Loading/Loading";
import { useContext, useEffect} from "react";
import HomeSlider from "../../component/HomeSlider/HomeSlider";
import CategorySlider from "../../component/CategorySlider/CategorySlider";


import { wishListContext } from "../../context/Wishlist.context";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  let { getProductToWishList } = useContext(wishListContext)

  async function getData() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    }
    return axios.request(options)



  }

  useEffect(() => {
    getProductToWishList()

  }, [])

  let { isFetched, isLoading, isFetching, data } = useQuery({
    queryKey: ["products"],
    queryFn: getData,
    refetchOnMount: false,
    staleTime: 6 * 60 * 60 * 1000,
  })

console.log(data);

  if (isLoading) return <Loading />
  return < >
    <Helmet>
      <title>Home Page</title>
      <meta name="description" content="Freshcart home page" />
    </Helmet>

    <HomeSlider />
    <CategorySlider />
    <section>
      <h2 className="font-semibold mb-3">Shop Popular Productes</h2>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.data.data.map((product) => <Card key={product.id} productInfo={product} />
        )}

      </div>
    </section>


  </>
}
