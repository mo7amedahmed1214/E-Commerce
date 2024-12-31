import axios from "axios"
import { useFormik } from "formik"
import { useRef, useState } from "react"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { object, ref, string } from "yup"


export default function Signup() {

  const [emailExsistError, setEmailExsistError] = useState(null)
  const navigate = useNavigate()

  const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/


  const validationSchema = object({
    name: string().required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name must not more than 25 characters"),

    email: string().required("Email is required").email("Email is invalid"),

    password: string().required("Password is required")
      .matches(passRegex, "Password must be at leatst 8 characters, at least one upper case English letter, one lower case English letter, one number and one special character"),

    rePassword: string().required("Confirm password is required")
      .oneOf([ref("password")], "Password and Confirm password should be the same"),

    phone: string().required('Phone is requird').matches(phoneRegex, "Sorry!, We Accept Egyption Phone Numbers"),
  })

  async function sendData(values) {
    const loadingToaseId = toast.loading("Waiting...")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values
      }
      let { data } = await axios.request(options)
      console.log(data);

      {
        data.message === "success" && toast.success("User created successfuly"), setTimeout(() => {
          navigate("/login")
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message)
      setEmailExsistError(error.response.data.message);
    } finally {
      toast.dismiss(loadingToaseId)
    }

  }


  const formik = useFormik({
    initialValues: {

      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,

    onSubmit: sendData

  })
  console.log(formik.errors);


  const [IsShowPassword, setShowPassword] = useState(false)
  const passwordRef = useRef(null);
  function toggleEye() {
    setShowPassword(!IsShowPassword);
    if (passwordRef.current) {

      passwordRef.current.type = IsShowPassword ? "password" : "text";
    }
  }
  const [IsShowRePassword, setShowRePassword] = useState(false)
  const rePasswordRef = useRef(null);
  function toggleEye2() {
    setShowRePassword(!IsShowRePassword);
    if (rePasswordRef.current) {

      rePasswordRef.current.type = IsShowRePassword ? "password" : "text";
    }
  }







  return < >
    <Helmet>
      <title>Sign up</title>
      <meta name="description" content="Join us now and continue to log in to our site" />
    </Helmet>
    <h1 className="text-2xl font-semibold  mb-4"><i className="fa-regular fa-circle-user mr-2"></i>Register Now:</h1>
    <form className="space-y-5" onSubmit={formik.handleSubmit}>
      <div className="name ">
        <input type="text" placeholder="Type your name" className="form-control w-full"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        {formik.errors.name && formik.touched.name && <p className="text-red-600 mt-1 text-sm ">*{formik.errors.name}</p>}

      </div>

      <div className="email">
        <input type="email" placeholder="Email Address" className="form-control w-full"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email && <p className="text-red-600 mt-1 text-sm ">*{formik.errors.email}</p>}
        {emailExsistError && <p className="text-red-600 mt-1 text-sm ">*{emailExsistError}</p>}
      </div>


      <div className="password relative ">
        <input type="password" placeholder="Password" className="form-control w-full"
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

      </div>

      <div className="rePassword relative ">
        <input type="password" placeholder="Confirm Password" className="form-control w-full"
          name="rePassword"
          ref={rePasswordRef}
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        <div
          tabIndex={2}
          role="button"
          aria-label="Show or hide password"
          className="absolute top-2 right-2 "
          onClick={toggleEye2}
        >
          <i
            className={
              IsShowRePassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
            }
          />
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && <p className="text-red-600 mt-1 text-sm ">*{formik.errors.rePassword}</p>}

      </div>

      <div className="phone ">
        <input type="tel" placeholder="Phone Number" className="form-control w-full"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} />
        {formik.errors.phone && formik.touched.phone && <p className="text-red-600 mt-1 text-sm ">*{formik.errors.phone}</p>}

      </div>

      <button type="submit" className="btn bg-primary-500 hover:bg-primary-700 w-full text-white font-semibold"> Sign Up</button>
    </form>
  </>
}
