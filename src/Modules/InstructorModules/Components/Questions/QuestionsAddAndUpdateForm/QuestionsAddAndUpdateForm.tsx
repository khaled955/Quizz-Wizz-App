import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import {useForm } from "react-hook-form"
import { CreateAndUpdateQuestionProps, QuestionAddAndUpdateProps } from "../../../../../Interfaces/Question.interface";

export default function QuestionsAddAndUpdateForm({errorMessage,onClose,onCreate,title ,currentQuestion,onUpdate}:QuestionAddAndUpdateProps) {



const{register,handleSubmit,formState:{errors,isSubmitting}}= useForm<CreateAndUpdateQuestionProps>({"mode":"onChange" ,defaultValues:{
  title:currentQuestion?.title,
  description:currentQuestion?.description,
  answer:currentQuestion?.answer,
  difficulty:currentQuestion?.difficulty,
  options:{
    A:currentQuestion?.options.A,
    B:currentQuestion?.options.B,
    C:currentQuestion?.options.C,
    D:currentQuestion?.options.D,
  },
  type:currentQuestion?.type

}})








 












  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center z-50 bg-gray-600/40 items-start overflow-y-auto">
      <div className="form-box bg-white w-full sm:w-[60%] pb-5 mt-6">
        <form onSubmit={handleSubmit((data)=>{
          if(title ==="Set up a new Question")onCreate(data)
            if(title === "Update Current Question" && currentQuestion) onUpdate(data,currentQuestion?._id)
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
            <span className="px-6 py-2 mr-2 bg-main-border-color font-bold">Title:</span>
            <input
            {...register("title" ,{required:"Title Is Required"})}
            className="border-0 outline-0 grow" type="text"/>
          </div>
           {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}

       </div>

           
      {/* Description input */}
       <div className="description-input-box mt-3">
           <div className="description-name border-[2px] border-main-border-color rounded-2xl flex overflow-hidden">
            <span className="px-6 py-2 mr-2 bg-main-border-color font-bold flex items-center">Description:</span>
            <textarea
            {...register("description" ,{required:"Description Is Required"})}
            className="border-0 outline-0 grow h-[60px] resize-none"></textarea>
          </div>
           {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}

       </div>

        {/* Answer Options */}

           {/* A-B Input Value */}
         <div className="a-b-box flex flex-wrap gap-2 mt-3 w-full">
      
       {/* A input */}
         <div className="a-input-box grow">
           <div className="a-name border-[2px] border-main-border-color rounded-2xl flex overflow-hidden">
            <span className="px-6 py-2 mr-2 bg-main-border-color font-bold">A:</span>
            <input
            {...register("options.A" ,{required:"Value Is Required"})}
            className="border-0 outline-0 grow" type="text"/>
          </div>
           {errors.options?.A && <p className="text-red-500 text-sm mt-1">{errors.options.A.message}</p>}

       </div>

 

             {/* B input */}
         <div className="b-input-box grow">
           <div className="b-name border-[2px] border-main-border-color rounded-2xl flex overflow-hidden">
            <span className="px-6 py-2 mr-2 bg-main-border-color font-bold">B:</span>
            <input
            {...register("options.B" ,{required:"Value Is Required"})}
            className="border-0 outline-0 grow" type="text"/>
          </div>
           {errors.options?.B && <p className="text-red-500 text-sm mt-1">{errors.options.B.message}</p>}

       </div>
         </div>

            {/*  C-D Input Value */}


               <div className="c-d-box flex flex-wrap gap-2 mt-3 w-full">
      
       {/* C input */}
         <div className="c-input-box grow">
           <div className="c-name border-[2px] border-main-border-color rounded-2xl flex overflow-hidden">
            <span className="px-6 py-2 mr-2 bg-main-border-color font-bold">C:</span>
            <input
            {...register("options.C" ,{required:"Value Is Required"})}
            className="border-0 outline-0 grow" type="text"/>
          </div>
           {errors.options?.C && <p className="text-red-500 text-sm mt-1">{errors.options.C.message}</p>}

       </div>

 

             {/* D input */}
         <div className="d-input-box grow">
           <div className="d-name border-[2px] border-main-border-color rounded-2xl flex overflow-hidden">
            <span className="px-6 py-2 mr-2 bg-main-border-color font-bold">D:</span>
            <input
            {...register("options.D" ,{required:"Value Is Required"})}
            className="border-0 outline-0 grow" type="text"/>
          </div>
           {errors.options?.D && <p className="text-red-500 text-sm mt-1">{errors.options.D.message}</p>}

       </div>
         </div>
               
               {/* Question Answer And Type and level */}
           <div className="question-type-answer-level-box flex gap-2 items-center flex-wrap justify-center mt-3">
            {/* Answer Input */}
               <div className="answer-box grow">
                    <select defaultValue="" className=" p-2 w-full outline-0 border-2 border-main-border-color rounded-2xl"
                    {...register("answer",{required:"Right Answer Is Required"})}
                    >
                      <option disabled value=""> Select Right Answer</option>
                      <option  value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                    {errors.answer && <p className="text-red-500 text-sm mt-1">{errors.answer.message}</p>}
               </div>


                 {/* type Input */}
               <div className="type-box grow">
                    <select  defaultValue="" className=" p-2 w-full outline-0 border-2 border-main-border-color rounded-2xl"
                    {...register("type",{required:"Question Type Is Required"})}
                    >
                      <option disabled value=""> Select Question Type</option>
                      <option  value="FE">FE</option>
                      <option value="BE">BE</option>
                      <option value="DO">DO</option>
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
{errorMessage && <p className="error-message text-black text-center mb-3 ml-3">{errorMessage}</p>}
      </form>
      </div>
    </div>
  )
}
