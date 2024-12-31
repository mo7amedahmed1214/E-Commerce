import amazonPay from "../../assets/images/amazon-pay.png"
import americanExpress from "../../assets/images/American-Express-Color.png"
import masterCard from "../../assets/images/mastercard.webp"
import payPal from "../../assets/images/paypal.png"

import appleSore from "../../assets/images/get-apple-store.png"
import googlePlay from "../../assets/images/get-google-play.png"

export default function Footer() {
  return < >

    <footer className=" bg-slate-100 px-4 md:px-0 py-8">
      <div className="container space-y-4">
        <header>
          <h2 className="text-xl font-semibold line-clamp-3 text-slate-900">Get The FreshCart App</h2>
          <p className="text-slate-500 line-clamp-5">We will send you a link, open it on your phone to download the app</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Email..."  className="form-control grow"/>
          <button className="btn text-white bg-primary-500 hover:bg-primary-700 text-sm font-semibold uppercase">Share App Link</button>
        </div>

        <div className="flex :flex-row flex-wrap md:flex-nowrap justify-between gap-6 md:gap-2  items-center py-6 border-y-2 border-slate-300 border-opacity-50">
          <div className="pyment   mx-auto  md:mx-0 flex flex-row  flex-wrap md:flex-nowrap  items-center gap-3">
            <h3 className="font-semibold mx-auto">Payment partners</h3>
           <div className="flex items-center  justify-around grow gap-3 flex-wrap w-3/4 md:w-fit">
           <img className="w-12 sm:w-16 md:w-24" src={amazonPay} alt="amazon-pay logo" />
            <img className=" w-12 sm:w-16 md:w-24" src={americanExpress} alt="American-Express-Color logo" />
            <img className="w-12 sm:w-16 md:w-20" src={masterCard} alt="mastercard logo" />
            <img className="w-12 sm:w-16 md:w-24" src={payPal} alt="paypal logo" />
           </div>
          </div>

          <div className="download flex flex-row justify-between w-full md:w-fit items-center gap-2">
            <h3 className="line-clamp-2 font-semibold ">Get deliverise with FreshCart</h3>
          <div className="flex items-center justify-around  grow flex-row flex-wrap" >
          <img className="w-16 md:w-24 " src={appleSore} alt="get-apple-store logo" />
          <img className="w-16 md:w-[105px]" src={googlePlay} alt="google play logo" />
          </div>
          </div>
        </div>


      </div>
    </footer>

  </>
}
 