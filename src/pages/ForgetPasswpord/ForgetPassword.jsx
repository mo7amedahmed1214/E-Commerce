import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"



export default function ForgetPassword() {

    const [incorectEmail, setIncorectEmail] = useState(null)
    const navigate = useNavigate()


    const validationSchema = object({

        email: string().required("Email is required").email("Email is invalid"),


    })

    async function sendDataLogin(values) {
        const loadingToaseId = toast.loading("Waiting...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                method: "POST",
                data: values
            }
            let { data } = await axios.request(options)
            console.log(data);
            if (data.statusMsg === "success") {
                toast.success(data.message)
                setTimeout(() => {
                    navigate("/verify")

                }, 2000)
            }


        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);

            setIncorectEmail(error.response.data.message)

        } finally {
            toast.dismiss(loadingToaseId)
        }

    }


    const formik = useFormik({
        initialValues: {

            email: "",

        },
        validationSchema,

        onSubmit: sendDataLogin

    })



    return < >

        <Helmet>
            <title>Forget password</title>
            <meta name="description" content="Forgot password? dont worry" />
        </Helmet>

        <h1 className="text-2xl font-semibold  mb-4 capitalize"><i className="fa-regular fa-circle-user mr-2 "></i>Send your email :</h1>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>


            <div className="email">
                <input type="email" placeholder="Email Address" className="form-control w-full"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />

                {formik.errors.email && formik.touched.email && <p className="text-red-600 mt-1 text-sm ">*{formik.errors.email}</p>}
                {incorectEmail && <p className="text-red-600 mt-1 text-sm ">*{incorectEmail}</p>}
            </div>





            <button type="submit" className="btn bg-primary-500 hover:bg-primary-700 w-full text-white font-semibold">Send</button>
        </form>
    </>
}
