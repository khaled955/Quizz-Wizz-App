import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import {useForm } from "react-hook-form"
import { CreateAndUpdateQuizzProps, QuizzAddAndUpdateProps, QuizzGroupList } from "../../../../../Interfaces/quizz.interface";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../../../Services/axiosInstance";
import { GROUP } from "../../../../../Services/endPoint";
import useAuth from "../../../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { QUIZZ_MODULE } from "../../../../../Services/validation";

export default function QuizzesAddAndUpdateForm({errorMessage,onClose,onCreate,title ,currentQuizz,onUpdate}:QuizzAddAndUpdateProps) {
const[groupList , setGroupList]= useState<QuizzGroupList[] | []>([])
const{logedInData}= useAuth()
const navigate = useNavigate()
const{register,handleSubmit,formState:{errors,isSubmitting}}= useForm<CreateAndUpdateQuizzProps>({"mode":"onChange",defaultValues:{
  title:currentQuizz?.title,
  description:currentQuizz?.description,
  group:currentQuizz?.group,
  difficulty:currentQuizz?.difficulty,
  duration:currentQuizz?.duration,
  questions_number:currentQuizz?.questions_number,
  score_per_question:currentQuizz?.score_per_question,
  schadule: currentQuizz?.schadule?.slice(0, 16),
  type: (["FE", "BE", "DB"].includes(currentQuizz?.type as string) 
       ? currentQuizz?.type 
       : undefined) as "FE" | "BE" | "DB" | undefined,
}})



//  fetch all groups available
useEffect(()=>{
  async function fetchAllGroups(){

    try {
      const{data} = await axiosInstance.get(GROUP.GET_ALL)
      setGroupList(data)
      
    } catch (error) {
      if(isAxiosError(error))toast.error(error.response?.data.message ||"Some Thing Go Wrong")
    }
  }



  if(logedInData?.profile.role === "Instructor"){
    fetchAllGroups()
}else{
    navigate("/dashboard")
    return;
}

},[ navigate,logedInData?.profile.role])




const now = new Date();
const minDate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now

// Convert to "YYYY-MM-DDTHH:MM" format
const minDateValue = minDate.toISOString().slice(0, 16);








  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center z-50 bg-gray-600/40 items-start overflow-y-auto">
      <div className="form-box bg-white w-full sm:w-[80%] pb-5 mt-6">
        <form onSubmit={handleSubmit((data)=>{
          if(title ==="Set New Quizz")onCreate(data)
            if(title === "Update Current Quizz" && currentQuizz) onUpdate(data,currentQuizz?._id)
        })}>
        <div className="form-header flex justify-between border-[1px] border-main-border-color items-center">
            <h2 className="px-3 font-bold capitalize text-gray-600 text-2xl">{title}</h2>
            <div className="act-btn flex">
                <button disabled={isSubmitting} type="submit" className="true-btn p-3 border-l-[1px] border-main-border-color">
                  <FaCheck className="cursor-pointer text-2xl"/>
                </button>
                <button onClick={onClose} disabled={isSubmitting} type="button" className="false-btn p-3  border-l-[1px] border-main-border-color">
                  <IoCloseSharp className="cursor-pointer text-2xl"/>
                </button>
            </div>
        </div>

        <div className="form-inputs px-3 py-6">

          <span className="inline-block mb-3">Details</span>


          {/* title input */}
       <div className="title-input-box">
           <div className="title-name border-[2px] border-main-border-color rounded-2xl flex overflow-hidden">
            <span className="px-1 py-2 mr-2 bg-main-border-color font-bold">Title:</span>
            <input
            {...register("title" ,QUIZZ_MODULE.QUIZZ_TITLE)}
            className="border-0 outline-0 grow" type="text"/>
          </div>
           {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}

       </div>

           
      {/*  setting time and score inputs */}

       <div className="mt-3 flex gap-3 flex-col md:flex-row  flex-wrap">

        {/* duration input */}
         <div className="duration-input-box grow">
           <div className="border-[2px] border-main-border-color rounded-2xl flex overflow-hidden ">
            <span className="px-1 font-bold py-2 mr-2 bg-main-border-color text-sm">Duration (in Minutes):</span>
            <input
            {...register("duration" ,QUIZZ_MODULE.QUIZZ_DURATION)}
            className="border-0 outline-0 grow" type="number"/>
          </div>
           {errors.duration && <p className="text-red-500 text-sm mt-1 capitalize">{errors.duration.message}</p>}

       </div>

       {/* No Of Questions */}

         <div className="question-number-input-box grow">
           <div className="border-[2px] border-main-border-color rounded-2xl flex overflow-hidden">
            <span className="px-1 font-bold py-2 mr-2 bg-main-border-color text-sm">Questions Number:</span>
            <input
            {...register("questions_number" ,QUIZZ_MODULE.QUIZZ_QUESTION_NUMBER)}
            className="border-0 outline-0 grow" type="number"/>
          </div>
           {errors.questions_number && <p className="text-red-500 text-sm mt-1">{errors.questions_number.message}</p>}

       </div>


       

       </div>

     {/* Schedule setting And Score No */}

<div className="mt-3 flex gap-3 flex-col md:flex-row  flex-wrap">

        {/* schedule input */}
         <div className="schedule-input-box grow">
           <div className="border-[2px] border-main-border-color rounded-2xl flex overflow-hidden ">
            <span className="px-1 font-bold py-2 mr-2 bg-main-border-color text-sm">Schedule:</span>
            <input
            min={minDateValue}
            {...register("schadule" , QUIZZ_MODULE.QUIZZ_SCHEDULE)}
            className="border-0 outline-0 grow" type="datetime-local"/>
          </div>
           {errors.schadule && <p className="text-red-500 text-sm mt-1">{errors.schadule.message}</p>}

       </div>

       {/* score per Questions */}

         <div className="question-number-input-box grow">
           <div className="border-[2px] border-main-border-color rounded-2xl flex overflow-hidden">
            <span className="px-1 font-bold py-2 mr-2 bg-main-border-color text-sm">Score Per Question:</span>
            <input
            {...register("score_per_question" ,QUIZZ_MODULE.QUIZZ_SCORE_PER_QUESTION)}
            className="border-0 outline-0 grow" type="number"/>
          </div>
           {errors.score_per_question && <p className="text-red-500 text-sm mt-1">{errors.score_per_question.message}</p>}

       </div>


       

       </div>




      {/* Description input */}
       <div className="description-input-box mt-3">
           <div className="description-name border-[2px] border-main-border-color rounded-2xl flex overflow-hidden">
            <span className="px-1 py-2 mr-2 bg-main-border-color font-bold flex items-center">Description:</span>
            <textarea
            {...register("description" ,{required:"Description Is Required"})}
            className="border-0 outline-0 grow h-[60px] resize-none"></textarea>
          </div>
           {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}

       </div>






     
               {/* Question group And Type and level */}
           <div className="question-type-answer-level-box flex gap-2 items-center flex-wrap justify-center mt-3">
            {/* Group Input */}
              {groupList.length > 0 &&  <div className="group-box grow">
                    <select defaultValue="" className=" p-2 w-full outline-0 border-2 border-main-border-color rounded-2xl"
                    {...register("group",{required:"Group Is Required"})}
                    >
                      <option disabled value=""> Select Group Name</option>

                        {groupList.map((group:QuizzGroupList)=><option key={group._id} value={group._id}>{group.name}</option>)}

                    </select>
                    {errors.group && <p className="text-red-500 text-sm mt-1">{errors.group.message}</p>}
               </div>}


                 {/* type Input */}
               <div className="type-box grow">
                    <select  defaultValue="" className=" p-2 w-full outline-0 border-2 border-main-border-color rounded-2xl"
                    {...register("type",{required:"Question Type Is Required"})}
                    >
                      <option disabled value=""> Select Question Type</option>
                      <option  value="FE">FE</option>
                      <option value="BE">BE</option>
                      <option value="DB">DB</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
               </div>


                 {/* level Input */}
               <div className="level-box grow">
                    <select  defaultValue="" className=" p-2 w-full outline-0 border-2 border-main-border-color rounded-2xl"
                    {...register("difficulty",{required:"Question Level Is Required"})}
                    >
                      <option disabled value=""> Select Question Level</option>
                      <option  value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                    {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>}
               </div>



           </div>









{/* end of form */}
   </div> 
{errorMessage && <p className="error-message text-black text-center mb-3 ml-3">{errorMessage === "Cannot read properties of undefined (reading 'sort')" ? "Backend Error,try Again alter":errorMessage}</p>}
      </form>
      </div>
    </div>
  )
}
