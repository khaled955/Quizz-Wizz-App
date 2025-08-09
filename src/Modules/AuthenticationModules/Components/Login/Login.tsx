import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm} from "react-hook-form";
import { LoginFormDataProps} from "../../../../Interfaces/Authentication.interface";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { AUTH } from "../../../../Services/endPoint";
import { axiosInstance } from "../../../../Services/axiosInstance";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../../Services/validation";
import useAuth from "../../../../Hooks/useAuth";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";






export default function Login() {
const[showPassword , setShowPassword] = useState(false)
const[errorMessage , setErrorMessage] = useState<string | null>(null)
const navigate = useNavigate()
const{register , handleSubmit , formState:{errors ,isSubmitting}} = useForm<LoginFormDataProps>({"mode":"onChange"})
const {setLogedInData}= useAuth()

const handleLogin = useCallback(async function(dataInfo:LoginFormDataProps){
const toastId = toast.loading("Waiting...")
    setErrorMessage(null)

   try {

  const options ={
    method: "POST",
    url:AUTH.LOGIN,
    data:dataInfo,

    
  }
        const {data} = await axiosInstance.request(options)
          if(data.message === "Login Success"){
                
          Cookies.set("LOGEDDATA" , JSON.stringify(data.data),{expires:7})
            setLogedInData(data.data)
         toast.success(data.message || "Login in Successfully")
         setTimeout(()=>{
          if(data.data.profile.role === "Instructor"){
            navigate("/dashboard")
          }else{
            navigate("/learner")
          }
         },1500)


              }


   } catch (error) {
    if(isAxiosError(error)){
      setErrorMessage(error.response?.data.message || "Some Thing Go Wrong!")
      toast.error(error.response?.data.message || "Some Thing Go Wrong!")
    }
   }finally{
    toast.dismiss(toastId)
   }


},[navigate,setLogedInData])



  return (
    <div className="section">
      <div className="register-parent">
        <div className="register-header">
          <p className=" text-3xl font-black mt-5 text-main-color">Continue your learning journey with QuizWiz!</p>
        </div>
        <div className="navigate-btn my-6 flex gap-5 text-xl font-black flex-wrap justify-center md:justify-start">
          {/* login btn */}

       <div className=" bg-[#333] rounded-2xl text-white  border-main-color border-4 flex justify-center items-center p-12 flex-col">
           <span><FaUser/></span>
        <span>Sign in</span>
        </div>



        <Link className=" bg-[#333] rounded-2xl text-white border border-black flex justify-center items-center p-12 flex-col" to="/register">

       <span><FaUserPlus/></span>
        <span>Sign In</span>
        </Link>
        {/* register btn */}
       
        </div>







        {/* form inputs */}
        <div className="form-section">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>

            {/* Email input */}
               <div className="email-input relative flex-1 text-white">
                <label className="block mb-1" htmlFor="email">Email</label>
                     <div className="relative">
                       <input
                      {...register("email",EMAIL_VALIDATION)}
                      
                      className="form-control" id="email" type="email" placeholder="Type Your Email" />
                     <MdOutlineEmail className="absolute top-[50%] left-3 text-2xl -translate-y-[50%]"/>

                     </div>

{errors.email && <div className="text-red-500">{errors.email.message}</div>}
               </div>


                  {/* Password input */}
               <div className="password-input relative flex-1 text-white">
                <label className="block mb-1" htmlFor="password">Password</label>
                     <div className="relative">
                       <input
                      {...register("password",PASSWORD_VALIDATION)}
                      className="form-control" id="password" type={showPassword?"text":"password"} placeholder="Type Your Password" />
                                               <IoKeyOutline className="absolute top-[50%] left-3 text-2xl -translate-y-[50%]"/>
                             
                              {showPassword &&  <FaEye onClick={()=>{setShowPassword(current=> !current)}} title={showPassword?"Hide Password":"Show Password"} className="absolute top-[50%] right-3 text-lg cursor-pointer -translate-y-[50%]"/>
                              }
                                                        
                              {!showPassword &&  <FaEyeSlash onClick={()=>{setShowPassword(current=> !current)}} title={showPassword?"Hide Password":"Show Password"} className="absolute top-[50%] right-3 text-lg cursor-pointer -translate-y-[50%]"/>
                              }




                     </div>


{errors.password && <div className="text-red-500">{errors.password.message}</div>}
               </div>

              {/* backend error */}
{errorMessage && <p className="text-red-600 font-medium text-center">{errorMessage}</p>
}
                  {/* submit btn */}
                  <button disabled={isSubmitting} type="submit" className="auth-btn flex justify-center"> {isSubmitting ? <ImSpinner8 className="animate-spin text-black"/> :"Login"}</button>
          </form>
        </div>
      </div>
      <Link to="/forget-password" className="text-white">forgetPassword?</Link>
    </div>
  )
}
