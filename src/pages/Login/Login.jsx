import axios from "axios"
import { useFormik } from "formik"
import { useContext, useRef } from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { object, string } from "yup"
import { userContext } from "../../context/User.context"
import { Helmet } from "react-helmet"


export default function Login() {


  let { token, setToken } = useContext(userContext)

  const [incorectPassOrEmail, setIncorectPassOrEmail] = useState(null)
  const navigate = useNavigate()

  const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

  const validationSchema = object({

    email: string().required("Email is required").email("Email is invalid"),

    password: string().required("Password is required")
      .matches(passRegex, "Password must be at leatst 8 characters, at least one upper case English letter, one lower case English letter, one number and one special character"),

  })

  async function sendDataLogin(values) {
    const loadingToaseId = toast.loading("Waiting...")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values
      }
      let { data } = await axios.request(options)
      console.log(data);
      {
        data.message === "success" && toast.success("User Logged Successfully"),
          setTimeout(() => {
            navigate("/")
          }, 2000),
          setToken(data.token),
          localStorage.setItem("token", data.token)



      }

    } catch (error) {
      toast.error(error.response.data.message);
      setIncorectPassOrEmail(error.response.data.message)

    } finally {
      toast.dismiss(loadingToaseId)
    }

  }


  const formik = useFormik({
    initialValues: {

      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: sendDataLogin

  })
  const [IsShowPassword, setShowPassword] = useState(false)
  
  const passwordRef = useRef(null);
  function toggleEye() {
    setShowPassword(!IsShowPassword);
    if (passwordRef.current) {

      passwordRef.current.type = IsShowPassword ? "password" : "text";
    }
  }


  return < >

    <Helmet>
      <title>Login </title>
      <meta name="description" content="Freshcart login" />
    </Helmet>

    <h1 className="text-2xl font-semibold  mb-4"><i className="fa-regular fa-circle-user mr-2"></i>Login:</h1>
    <form className="space-y-5" onSubmit={formik.handleSubmit}>


      <div className="email">
        <input type="email" placeholder="Email Address" className="form-control w-full"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email && <p className="text-red-600 mt-1 text-sm ">*{formik.errors.email}</p>}

      </div>


      <div className="password relative ">
        <input tabIndex={2} type="password" placeholder="Password" className="form-control w-full"
          name="password"
          ref={passwordRef}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        <div
          tabIndex={2}
          role="button"
          aria-label="Show or hide password"
          className="absolute top-2 right-2 "
          onClick={toggleEye}
        >
          <i
            className={
              IsShowPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
            }
          />
        </div>
        {formik.errors.password && formik.touched.password && <p className="text-red-600 mt-1 text-sm ">*{formik.errors.password}</p>}
        {incorectPassOrEmail && <p className="text-red-600 mt-1 text-sm ">*{incorectPassOrEmail}</p>}

      </div>


      <Link to='/forgetpassword' className="text-blue-500 underline text-sm  float-end  "> Forget Password</Link>




      <button type="submit" className="btn bg-primary-500 hover:bg-primary-700 w-full text-white font-semibold"> Sign In</button>
    </form>
  </>
}
