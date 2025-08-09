import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm} from "react-hook-form";
import { ForgetPasswordProps} from "../../../../Interfaces/Authentication.interface";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { axiosInstance } from "../../../../Services/axiosInstance";
import { EMAIL_VALIDATION } from "../../../../Services/validation";
import { AUTH } from "../../../../Services/endPoint";
import { FaEnvelope } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

export default function ForgetPassword() {
const[errorMessage , setErrorMessage] = useState<string | null>(null)
const navigate = useNavigate()
const{register , handleSubmit , formState:{errors ,isSubmitting}} = useForm<ForgetPasswordProps>({"mode":"onChange"})

const handleForgetPassword = useCallback(async function(dataInfo:ForgetPasswordProps){
const toastId = toast.loading("Waiting...")
    setErrorMessage(null)

   try {

  const options ={
    method: "POST",
    url:AUTH.FORGOT_PASSWORD,
    data:dataInfo,

    
  }
        const {data} = await axiosInstance.request(options)

        console.log(data)
          if(data.message === "Reset password email sent"){
                
         toast.success(data.message || "Reset password email sent")
         setTimeout(()=>{
                navigate("/reset-password" , {state:{email:dataInfo.email}})
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
      <div className="forget-parent">
        <div className="forget-header mb-6">
          <h2 className=" text-3xl font-black mt-5 text-main-color">Forget Password</h2>
        </div>
       

        {/* form inputs */}
        <div className="form-section">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleForgetPassword)}>

            {/* Email input */}
               <div className="email-input relative flex-1 text-white">
                <label className="block mb-1" htmlFor="email">Email</label>
                     <div className="relative">
                       <input
                      {...register("email",EMAIL_VALIDATION)}
                      
                      className="form-control" id="email" type="email" placeholder="Type Your Email" />

                                                                         <FaEnvelope className="absolute top-[50%] left-3 text-2xl -translate-y-[50%]"/>
                               
                     </div>

{errors.email && <div className="text-red-500">{errors.email.message}</div>}
               </div>


              
              {/* backend error */}
{errorMessage && <p className="text-red-600 font-medium text-center">{errorMessage}</p>
}
                  {/* submit btn */}
                  <button disabled={isSubmitting} type="submit" className="auth-btn flex justify-center"> {isSubmitting ? <ImSpinner8 className="animate-spin text-black"/> :"Send"}</button>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center sm:items-start">
      <Link className="text-white" to="/">Login ?</Link>

      <Link className="text-white" to="/register">Create Account ?</Link>
      </div>
    </div>
  )
}
