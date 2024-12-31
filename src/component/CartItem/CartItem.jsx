import { useContext } from "react"
import { cartContext } from "../../context/Cart.context"
import { Link } from "react-router-dom"


export default function CartItem({ productInfo }) {
  const { count, price, product } = productInfo
  const { title, imageCover, id, category } = product
  let { deleteProductFromCart, updateCount } = useContext(cartContext)
  return < >

    <div className="flex gap-5  ">
      <div className="cart-item grow  flex flex-col gap-6  justify-center md:grid md:grid-cols-12 bg-slate-100 items-center   py-4 px-5 rounded-lg">
        <img src={imageCover} className="w-24 h-24  md:col-span-2 object-cover rounded-full border-4 border-white" alt={title} />
        <h2 className="  md:col-span-4 font-semibold text-lg text-gray-700 text-center">
          <Link to={`/product/${id}`}>{title}</Link>
        </h2>
        <h4 className=" md:col-span-2 text-lg text-gray-500 text-center">{category.name}</h4>
        <div className=" md:col-span-3 count flex items-center mx-auto gap-4">
          <span className="text-gray-800 text-lg font-semibold">{count}</span>
          <div className="icons flex flex-col gap-3">
            <div
              onClick={() => {
                updateCount({
                  productId: id,
                  count: count + 1
                })
              }}
              className=" h-6 w-6 bg-gray-800 text-white flex justify-center cursor-pointer items-center rounded-full plus">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div
              onClick={() => {
                updateCount({
                  productId: id,
                  count: count - 1
                })
              }}
              className=" h-6 w-6 bg-gray-800 text-white flex justify-center cursor-pointer items-center rounded-full minus">
              <i className="fa-solid fa-minus"></i>
            </div>
          </div>
        </div>
        <span className="text-gray-950 text-lg md:col-span-1">{price * count} L.E</span>
      </div>
      <button
        onClick={() => {
          deleteProductFromCart({ productId: id })
        }}
        className="bg-slate-100 px-3 rounded-lg hover:bg-slate-200 transition-colors duration-300 flex justify-center items-center"> <i className="fa-solid fa-xmark "></i></button>

    </div>



  </>
}
