import axios from "axios"
import { useFormik } from "formik"
import { useContext } from "react"
import { useState } from "react"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"



export default function VerifyCode() {




    const [code, setCode] = useState(null)
    const navigate = useNavigate()



    const validationSchema = object({

        resetCode: string().required("code is required")


    })

    async function sendDataLogin(values) {
        const loadingToaseId = toast.loading("Waiting...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                method: "POST",
                data: values
            }
            let { data } = await axios.request(options)
            console.log(data);
            if (data.status === "Success") {
                toast.success(data.status)
                setTimeout(() => {
                    navigate('/reset')

                }, 2000)

            }

        } catch (error) {
            toast.error(error.response.data.message);
            setCode(error.response.data.message)

        } finally {
            toast.dismiss(loadingToaseId)
        }

    }


    const formik = useFormik({
        initialValues: {

            resetCode: "",

        },
        validationSchema,

        onSubmit: sendDataLogin

    })



    return < >
        <Helmet>
            <title>Ververify code</title>
            <meta name="description" content="Enter Ververify code to access to change your password" />
        </Helmet>

        <h1 className="text-2xl font-semibold  mb-4"><i className="fa-regular fa-circle-user mr-2"></i>Verify Code :</h1>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>


            <div className="code">
                <input type="text" placeholder="Code..." className="form-control w-full"
                    name="resetCode"
                    value={formik.values.resetCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.errors.resetCode && formik.touched.resetCode && <p className="text-red-600 mt-1 text-sm ">*{formik.errors.resetCode}</p>}

            </div>

            <button type="submit" className="btn bg-primary-500 hover:bg-primary-700 w-full text-white font-semibold">Submit</button>
        </form>
    </>
}
