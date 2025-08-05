import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { useState } from "react";
import { LEARNER } from "../../../../../Services/endPoint";
import { axiosInstance } from "../../../../../Services/axiosInstance";

interface QuizCouponModalProps {
  onClose: () => void;
  onSuccess:(currentQuizzId:string)=>void;
  id:string | null;
}

interface CouponFormData {
  code: string;
}

export default function QuizCouponModal({ onClose,onSuccess }: QuizCouponModalProps) {
  const[errorMessage , setErrorMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CouponFormData>();

  const onSubmit = async (dataInfo: CouponFormData) => {

           setErrorMessage(null)
           const toastId = toast.loading("Waiting....")
    try {

      const options = {
        method: "POST",
        url:LEARNER.JOIN_QUIZ,
        data:dataInfo,

        
      }
        const{data} = await  axiosInstance.request(options)
           if(data.message === "Student joined successfully"){
                       onSuccess(data.data.quiz)
                       toast.success("Coupon applied successfully!");
                        reset();
                        onClose();
           }

      // Close modal
    } catch (error) {
      if(isAxiosError(error)){
        toast.error(error.response?.data?.message || "Failed to apply coupon");
      setErrorMessage(error?.response?.data?.message || "Failed to apply coupon")
      }

    }finally{
      toast.dismiss(toastId)
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative dark:bg-gray-900"
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer"
          onClick={onClose}
        >
          <MdClose size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Enter Quiz Coupon
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Coupon Code
            </label>
            <input
              id="code"
              type="text"
              {...register("code", { required: "Coupon code is required" })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            {errors.code && (
              <p className="text-red-500 text-sm mt-1 capitalize">{errors.code.message}</p>
            )}
          </div>
               {errorMessage && <p className="text-gray-600 text-sm my-1 capitalize">{errorMessage}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-150 disabled:opacity-50"
          >
            {isSubmitting ? "Applying..." : "Apply Coupon"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
