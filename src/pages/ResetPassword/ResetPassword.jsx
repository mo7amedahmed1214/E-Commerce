import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"



export default function ResetPassword() {




    const [incorectEmail, setIncorectEmail] = useState(null)
    const navigate = useNavigate()

    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    const validationSchema = object({

        email: string().required("Email is required").email("Email is invalid"),

        newPassword: string().required("Password is required")
            .matches(passRegex, "Password must be at leatst 8 characters, at least one upper case English letter, one lower case English letter, one number and one special character"),

    })

    async function sendDataLogin(values) {
        const loadingToaseId = toast.loading("Waiting...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                method: "PUT",
                data: values
            }
            let { data } = await axios.request(options)
            console.log(data);
            {
                data.token !== null ? toast.success("Your Password Change Successfully") &&
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                    : ""
            }



        } catch (error) {
            toast.error(`${error.response.data.message} for this email`);
            setIncorectEmail(error.response.data.message)
            console.log(error);


        } finally {
            toast.dismiss(loadingToaseId)
        }

    }


    const formik = useFormik({
        initialValues: {

            email: "",
            newPassword: "",
        },
        validationSchema,

        onSubmit: sendDataLogin

    })



    return < >

<Helmet>
            <title>New password</title>
            <meta name="description" content="Enter a new password" />
        </Helmet>

        <h1 className="text-2xl font-semibold  mb-4"><i className="fa-regular fa-circle-user mr-2"></i>Reset Password:</h1>
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


            <div className="password ">
                <input type="password" placeholder="Password" className="form-control w-full"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.errors.newPassword && formik.touched.newPassword && <p className="text-red-600 mt-1 text-sm ">*{formik.errors.newPassword}</p>}


            </div>



            <button type="submit" className="btn bg-primary-500 hover:bg-primary-700 w-full text-white font-semibold"> Sign Up</button>
        </form>
    </>
}
