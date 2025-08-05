import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm} from "react-hook-form";
import { RegisterFormDataProps } from "../../../../Interfaces/Authentication.interface";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { AUTH } from "../../../../Services/endPoint";
import { axiosInstance } from "../../../../Services/axiosInstance";
import { EMAIL_VALIDATION, FIRST_NAME_VALIDATION, LAST_NAME_VALIDATION, PASSWORD_VALIDATION, ROLE_VALIDATION } from "../../../../Services/validation";

export default function Register() {
const[showPassword , setShowPassword] = useState(false)
const[errorMessage , setErrorMessage] = useState<string | null>(null)
const navigate = useNavigate()
const{register , handleSubmit , formState:{errors ,isSubmitting}} = useForm<RegisterFormDataProps>({"mode":"onChange"})


const handleRegister = useCallback(async function(dataInfo:RegisterFormDataProps){
const toastId = toast.loading("Waiting...")
    setErrorMessage(null)

   try {

  const options ={
    method: "POST",
    url:AUTH.REGISTER,
    data:dataInfo,

    
  }
        const {data} = await axiosInstance.request(options)
         console.log(data)
         toast.success(data.message || "Account Created Successfully")
         setTimeout(()=>{
                navigate("/login")
         },1500)
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
      <div className="register-parent">
        <div className="register-header">
          <p className=" text-3xl font-black mt-5 text-main-color">Create your account and start using QuizWiz!</p>
        </div>
        <div className="navigate-btn my-6 flex gap-5 text-xl font-black flex-wrap justify-center md:justify-start">
          {/* login btn */}
        <Link className=" bg-[#333] rounded-2xl text-white border border-black flex justify-center items-center p-12 flex-col" to="/login">
        <i className="fa-solid fa-user"></i>
        <span>Sign In</span>
        </Link>
        {/* register btn */}
        <div className=" bg-[#333] rounded-2xl text-white  border-main-color border-4 flex justify-center items-center p-12 flex-col">
        <i className="fa-solid fa-user-plus"></i>
        <span>Sign Up</span>
        </div>
        </div>
        {/* form inputs */}
        <div className="form-section">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
            {/* first name and last name container */}
            <div className="first-last-name-box flex gap-3 text-white flex-wrap">



              {/* first name input */}
               <div className="first-name-input relative flex-1">
                <label className="block mb-1" htmlFor="firstName">Your First Name</label>
                     <div className="relative">
                       <input
                      {...register("first_name",FIRST_NAME_VALIDATION)}
                      className="form-control" id="firstName" type="text" placeholder="Type Your First Name" />
                              <i className="fa-solid fa-user absolute top-[30%] left-3 text-lg"></i>
                     </div>
                   {errors.first_name && <div className="text-red-500">{errors.first_name.message}</div>}
               </div>



               {/* last name */}
               <div className="last-name-input relative flex-1">
                <label className="block mb-1" htmlFor="lastName">Your Last Name</label>
                     <div className="relative">
                       <input
                      {...register("last_name" ,LAST_NAME_VALIDATION)}
                      className="form-control" id="lastName" type="text" placeholder="Type Your Last Name" />
                              <i className="fa-solid fa-user absolute top-[30%] left-3 text-lg"></i>
                     </div>
                    {errors.last_name && <div className="text-red-500">{errors.last_name.message}</div>}
               </div>
            </div>


            {/* Email input */}
               <div className="email-input relative flex-1 text-white">
                <label className="block mb-1" htmlFor="email">Email</label>
                     <div className="relative">
                       <input
                      {...register("email",EMAIL_VALIDATION)}
                      
                      className="form-control" id="email" type="email" placeholder="Type Your Email" />
                              <i className="fa-solid fa-envelope absolute top-[30%] left-3 text-lg"></i>
                     </div>

{errors.email && <div className="text-red-500">{errors.email.message}</div>}
               </div>



                  {/*Role input */}
               <div className="role-input relative flex-1 text-white">
                <label className="block mb-1" htmlFor="role">Role</label>
                <div className="relative">
                    <select
                  {...register("role",ROLE_VALIDATION)}
                  
                  id="role" defaultValue="" className="form-control bg-black">
                    <option value="" disabled>Select Your Role</option>
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                  </select>
                              <i className="fa-solid fa-user-tag absolute top-[30%] left-3 text-lg"></i>
                </div>

{errors.role && <div className="text-red-500">{errors.role.message}</div>}
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
                  <button disabled={isSubmitting} type="submit" className="auth-btn"> {isSubmitting ? <i className="fa-solid fa-circle-notch fa-spin"></i> :"Register"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
