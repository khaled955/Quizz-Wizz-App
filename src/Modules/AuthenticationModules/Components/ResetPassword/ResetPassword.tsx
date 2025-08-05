import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm} from "react-hook-form";
import {ResetPasswordProps } from "../../../../Interfaces/Authentication.interface";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { AUTH } from "../../../../Services/endPoint";
import { axiosInstance } from "../../../../Services/axiosInstance";
import { EMAIL_VALIDATION, OTP_VALIDATION, PASSWORD_VALIDATION } from "../../../../Services/validation";

export default function ResetPassword() {
const[showPassword , setShowPassword] = useState(false)
const[errorMessage , setErrorMessage] = useState<string | null>(null)
const navigate = useNavigate()
const {state:{email}} = useLocation()
const{register , handleSubmit , formState:{errors ,isSubmitting}} = useForm<ResetPasswordProps>({"mode":"onChange" ,defaultValues:{email}})


const handleResetPassword = useCallback(async function(dataInfo:ResetPasswordProps){
const toastId = toast.loading("Waiting...")
    setErrorMessage(null)

   try {

  const options ={
    method: "POST",
    url:AUTH.RESET_PASSWORD,
    data:dataInfo,

    
  }
        const {data} = await axiosInstance.request(options)
         if(data.message === "Record updated successfully"){

            toast.success(data.message || "Password Reset Successfully")
         setTimeout(()=>{
                navigate("/login")
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


},[navigate])



  return (
    <div className="section">
      <div className="reset-parent">
        <div className="reset-header my-6">
          <h2 className=" text-3xl font-black mt-5 text-main-color">Reset Password</h2>
        </div>
       
        {/* form inputs */}
        <div className="form-section">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleResetPassword)}>
         


            {/* Email input */}
               <div className="email-input relative flex-1 text-white">
                <label className="block mb-1" htmlFor="email">Email</label>
                     <div className="relative">
                       <input readOnly
                      {...register("email",EMAIL_VALIDATION)}
                      
                      className="form-control" id="email" type="email" placeholder="Type Your Email" />
                              <i className="fa-solid fa-envelope absolute top-[30%] left-3 text-lg"></i>
                     </div>

{errors.email && <div className="text-red-500">{errors.email.message}</div>}
               </div>


                     {/* Otp input */}
               <div className="otp-input relative flex-1 text-white">
                <label className="block mb-1" htmlFor="otp">OTP</label>
                     <div className="relative">
                       <input
                      {...register("otp" ,OTP_VALIDATION)}
                      
                      className="form-control" id="otp" type="text" placeholder="Type Your OTP" />
                              <i className="fa-solid fa-envelope absolute top-[30%] left-3 text-lg"></i>
                     </div>

{errors.otp && <div className="text-red-500">{errors.otp.message}</div>}
               </div>

              



                  {/* Password input */}
               <div className="password-input relative flex-1 text-white">
                <label className="block mb-1" htmlFor="password">Password</label>
                     <div className="relative">
                       <input
                      {...register("password",PASSWORD_VALIDATION)}
                      className="form-control" id="password" type={showPassword?"text":"password"} placeholder="Type Your Password" />
                              <i className="fa-solid fa-key absolute top-[30%] left-3 text-lg"></i>
                              <i title={showPassword?"Hide Password":"Show Password"} onClick={()=>{setShowPassword(current=> !current)}} className={`fa-solid ${!showPassword ? "fa-eye-slash":"fa-eye"} absolute top-[30%] right-3 text-lg cursor-pointer`}></i>
                     </div>


{errors.password && <div className="text-red-500">{errors.password.message}</div>}
               </div>

              {/* backend error */}
{errorMessage && <p className="text-red-600 font-medium text-center">{errorMessage}</p>
}
                  {/* submit btn */}
                  <button disabled={isSubmitting} type="submit" className="auth-btn"> {isSubmitting ? <i className="fa-solid fa-circle-notch fa-spin"></i> :"Reset Password"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
