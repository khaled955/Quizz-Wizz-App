import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm} from "react-hook-form";
import { ChangePasswordProps} from "../../../../Interfaces/Authentication.interface";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { AUTH } from "../../../../Services/endPoint";
import { axiosInstance } from "../../../../Services/axiosInstance";
import { NEW_PASSWORD_VALIDATION, PASSWORD_VALIDATION } from "../../../../Services/validation";

export default function ChangePassword() {
const[showOldPassword , setShowOldPassword] = useState(false)
const[showNewPassword , setShowNewPassword] = useState(false)
const[errorMessage , setErrorMessage] = useState<string | null>(null)
const navigate = useNavigate()
const{register , handleSubmit , formState:{errors ,isSubmitting},trigger,watch} = useForm<ChangePasswordProps>({"mode":"onChange"})

const handleChangePassword = useCallback(async function(dataInfo:ChangePasswordProps){
const toastId = toast.loading("Waiting...")
    setErrorMessage(null)

   try {

  const options ={
    method: "POST",
    url:AUTH.CHANGE_PASSWORD,
    data:dataInfo,

    
  }
        const {data} = await axiosInstance.request(options)
          if(data.message === "Record updated successfully"){
              
         toast.success(data.message || "Password Changed Successfully")
         setTimeout(()=>{
                navigate("/dashboard")
         },1500)


              }


   } catch (error) {
    console.log(error)
    if(isAxiosError(error)){
      setErrorMessage(error.response?.data.message || "Some Thing Go Wrong!")
      toast.error(error.response?.data.message || "Some Thing Go Wrong!")
    }
   }finally{
    toast.dismiss(toastId)
   }


},[navigate])


// prevent repet same password in new password input
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "password") trigger("password_new");
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);








  return (
    <div className="section  justify-center flex">
      <div className="change-password-parent p-6 w-full md:w-1/2 min-h-[80vh] shadow-2xl bg-emerald-700 mt-4 rounded-2xl">
        <div className="change-password-header">
          <h2 className=" text-3xl font-black mt-5 text-white text-center mb-3">Change Password</h2>
        </div>
      






        {/* form inputs */}
        <div className="form-section">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleChangePassword)}>

          

                  {/*old Password input */}
               <div className="password-input relative flex-1 text-white">
                <label className="block mb-1" htmlFor="oldpassword">OldPassword</label>
                     <div className="relative">
                       <input
                      {...register("password",PASSWORD_VALIDATION)}
                      className="form-control" id="oldpassword" type={showOldPassword?"text":"password"} placeholder="Type Your Old Password" />
                              <i className="fa-solid fa-key absolute top-[30%] left-3 text-lg"></i>
                              <i title={showOldPassword?"Hide Password":"Show Password"} onClick={()=>{setShowOldPassword(current=> !current)}} className={`fa-solid ${!showOldPassword ? "fa-eye-slash":"fa-eye"} absolute top-[30%] right-3 text-lg cursor-pointer`}></i>
                     </div>


{errors.password && <div className="text-red-500">{errors.password.message}</div>}
               </div>


                     {/*new Password input */}
               <div className="password-input relative flex-1 text-white">
                <label className="block mb-1" htmlFor="newpassword">New Password</label>
                     <div className="relative">
                       <input
                      {...register("password_new",NEW_PASSWORD_VALIDATION(watch))}
                      className="form-control" id="newpassword" type={showNewPassword?"text":"password"} placeholder="Type Your New Password" />
                              <i className="fa-solid fa-key absolute top-[30%] left-3 text-lg"></i>
                              <i title={showNewPassword?"Hide Password":"Show Password"} onClick={()=>{setShowNewPassword(current=> !current)}} className={`fa-solid ${!showNewPassword ? "fa-eye-slash":"fa-eye"} absolute top-[30%] right-3 text-lg cursor-pointer`}></i>
                     </div>


{errors.password_new && <div className="text-red-500">{errors.password_new.message}</div>}
               </div>




              {/* backend error */}
{errorMessage && <p className="text-red-600 font-medium text-center">{errorMessage}</p>
}
                  {/* submit btn */}
                  <button disabled={isSubmitting} type="submit" className="auth-btn"> {isSubmitting ? <i className="fa-solid fa-circle-notch fa-spin"></i> :"Change Password"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
