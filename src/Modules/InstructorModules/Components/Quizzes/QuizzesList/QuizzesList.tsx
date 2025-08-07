import { useCallback, useEffect, useState } from 'react';
import { BiSolidAlarmAdd } from 'react-icons/bi';
import { BsBank, } from 'react-icons/bs';
import { FaChevronCircleRight } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import { CompletedQuizzProps, CreateAndUpdateQuizzProps, QuizResponseAfterCreateProps, UpcommingQuizzProps } from '../../../../../Interfaces/quizz.interface';
import useAuth from '../../../../../Hooks/useAuth';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../../../../Services/axiosInstance';
import { QUIZ } from '../../../../../Services/endPoint';
import Loading from '../../../../SharedModules/Pages/Loading/Loading';
import photo1 from "../../../../../assets/images/quizz/1.jpeg"
import photo2 from "../../../../../assets/images/quizz/2.jpeg"
import photo3 from "../../../../../assets/images/quizz/3.jpg"
import photo4 from "../../../../../assets/images/quizz/4.jpg"
import photo5 from "../../../../../assets/images/quizz/5.png"
import QuizzesAddAndUpdateForm from '../QuizzesAddAndUpdateForm/QuizzesAddAndUpdateForm';
import QuizSuccessModal from '../QuizSuccessModal/QuizSuccessModal';
import QuizzesDetails from '../QuizzesDetails/QuizzesDetails';
import DeleteConfirmModal from '../../../../SharedModules/Components/ConfirmationModel/ConfirmationModel';
import Pagination from '../../../../SharedModules/Components/Pagination/Pagination';
import { FaTasks } from 'react-icons/fa';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
const ITEMS_PER_PAGE = 2;


const quizzPhotosList = [photo1,photo2,photo3,photo4,photo5]

export default function QuizzesList() {
const [upcommingQuizzList,setUpcommingQuizzList] = useState<UpcommingQuizzProps[]| null>(null)
const [completedQuizz,setCompletedQuizz] = useState<CompletedQuizzProps[]| null>(null)
const [showQuizzAddAndUpdateForm , setShowQuizzAddAndUpdateForm] = useState(false)
const[currentQuizz , setCurrentQuizz] = useState<UpcommingQuizzProps | null>(null)
const[selectedQuizzId , setSelectedQuizzId] = useState<string | null>(null)
const[showQuizzDetails , setShowQuizzDetails] = useState(false)
const[title , setTitle]= useState<string | null>(null)
const[errorMessage , setErrorMessage] = useState<string|null>(null)
const[isLoading,setIsloading] = useState(false)
const[showDeletModel,setShowDeletModel] = useState(false)
const[successMessage , setSuccessMessage] = useState<QuizResponseAfterCreateProps | null>(null)
const[showSuccess,setShowSuccess] = useState(false)
 const [currentPage, setCurrentPage] = useState(1);

const{logedInData,logOut} = useAuth()


// fetch Upcomming Quizz
const fetchUpCommingQuizz = useCallback(async function(){


try {
  const{data} = await axiosInstance.get(QUIZ.FIRST_FIVE_INCOMMING)
  setUpcommingQuizzList(data)

} catch (error) {
  if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong!")
}


},[])




useEffect(()=>{
if(logedInData?.profile.role === "Instructor"){
    fetchUpCommingQuizz()
}else{
  logOut()
    return;
}


},[fetchUpCommingQuizz ,logOut,logedInData?.profile.role])




// fetch Completed Quizz
const fetchCompletedQuizz = useCallback(async function(){


try {
  const{data} = await axiosInstance.get(QUIZ.LAST_FIVE_COMPLETED)
  setCompletedQuizz(data)

} catch (error) {
  if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong!")
}


},[])




useEffect(()=>{
if(logedInData?.profile.role === "Instructor"){
    fetchCompletedQuizz()
}else{
  logOut()
    return;
}


},[fetchCompletedQuizz , logOut,logedInData?.profile.role])






const handleUpdateCurrentQuizz = useCallback(  async function(dataInfo:CreateAndUpdateQuizzProps,quizzId:string){

  const toastId = toast.loading("Waiting.....")
      setErrorMessage(null)

  try {
    const options = {
      url:QUIZ.UPDATE_QUIZ(quizzId),
      method: "PUT",
      data:dataInfo
    }

const{data} = await axiosInstance.request(options)
if(data.message === "Record updated successfully"){
 toast.success( data.message || "Quizz Updated successfully")
   await fetchUpCommingQuizz()
   setTimeout(()=>{
    setShowQuizzAddAndUpdateForm(false)
   },1500)
}
 




  } catch (error) {
    if(isAxiosError(error)){
      toast.error(error.response?.data.message || "Some Thing Go Wrong!")
      setErrorMessage(error.response?.data.message || "Some Thing Go Wrong!")
    }
  }finally{
    toast.dismiss(toastId)
  }

},[fetchUpCommingQuizz])


const createNewQuizz = useCallback(  async function(dataInfo:CreateAndUpdateQuizzProps){

  const toastId = toast.loading("Waiting.....")
      setErrorMessage(null)

  try {
    const options = {
      url:QUIZ.CREATE_QUIZ,
      method: "POST",
      data:dataInfo
    }

const{data} = await axiosInstance.request(options)
if(data.message === "Record created successfully"){

       setSuccessMessage(data.data)
  toast.success( data.message || "Quizz created successfully")
   await fetchUpCommingQuizz()
    setShowQuizzAddAndUpdateForm(false)
   setShowSuccess(true)
}



  } catch (error) {
    if(isAxiosError(error)){
      toast.error(error.response?.data.message || "Some Thing Go Wrong!")
      setErrorMessage(error.response?.data.message || "Some Thing Go Wrong!")
    }
  }finally{
    toast.dismiss(toastId)
  }

},[fetchUpCommingQuizz])


const handleDeletQuizz = useCallback(async function(){
  const toastId = toast.loading("Waiting.....")
 setErrorMessage(null)
 setIsloading(true)
 try {
  
const{data} = await axiosInstance.delete(QUIZ.DELETE_QUIZ(selectedQuizzId!))

if(data.message === "Record deleted successfully"){
  toast.success(data.message || "Question deleted successfully")
   await fetchUpCommingQuizz()
setTimeout(() => {
  setShowDeletModel(false)
}, 1500);

}

 } catch (error) {
  if(isAxiosError(error)){
    toast.error(error.response?.data.message || "Some Thing Go Wrong!")
  }
 }finally{
  toast.dismiss(toastId)
  setIsloading(false)
  setSelectedQuizzId(null)
 }

},[selectedQuizzId,fetchUpCommingQuizz])








// setting for pagination
 const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = upcommingQuizzList?.slice(startIndex, startIndex + ITEMS_PER_PAGE);









 if(!completedQuizz || !upcommingQuizzList) return <Loading/>
  return (
    <div className="quizz-container grid grid-cols-12 gap-4">

      {/*  left side */}
      <div className="quizz-action col-span-12 md:col-span-6  flex flex-col gap-3 items-center md:items-start md:flex-row">
        <button onClick={()=>{
          setShowQuizzAddAndUpdateForm(true)
           setTitle("Set New Quizz")
        }} className=" cursor-pointer set-up-action p-9 border-[1px] border-main-border-color flex flex-col items-center gap-3">
              <BiSolidAlarmAdd className='text-3xl'/>
              <span className='font-black'> SetUp New quiz</span>
        </button>

          <Link to="/dashboard/questions-list" className='p-9 border-[1px] border-main-border-color flex flex-col gap-3 items-center'>
          <BsBank className='text-3xl'/>
          <span className='font-black'>Question Bank</span>
          </Link>

      </div>

           {/* right side */}
      <div className=" p-3 quizz-info col-span-12 md:col-span-6 border-[1px] border-main-border-color flex flex-col gap-3 ">
              {/* upcomming quizz */}
              <div className="up-comming-quizz">
                <h2 className='mb-5 font-bold flex items-center gap-3'> <FaTasks className='text-3xl'/> Upcoming quizzes</h2>
                  {upcommingQuizzList.length > 0 ?<div className='flex flex-col gap-3'>
                        {paginatedData?.map((quizz:UpcommingQuizzProps,index:number)=> <div key={quizz._id} className='border-[1px] border-main-border-color flex gap-1 '>
                            <div className="img-box">
                                <img className='size-24 object-cover' src={quizzPhotosList[index]} alt={quizz.title} />
                            </div>
                             <div className="quizz-body flex justify-between items-center grow flex-wrap">
                              <div className='quizz-text grow'>
                                <h3 className='font-black capitalize'>{quizz.title}</h3>
                              <p className='text-gray-700 dark:text-white'>{new Date(quizz.schadule).toLocaleDateString("en-GB", {day: "2-digit",month: "long",year: "numeric",})} | {new Date(quizz.schadule).toLocaleTimeString()}</p>
                              <p className='font-semibold'>No. of Quesstions: <span>{quizz.questions_number}</span></p>

                              </div>
                              <div className="arrow px-3">
                                <FaChevronCircleRight onClick={()=>{
                                  setCurrentQuizz(quizz)
                                  setShowQuizzDetails(true)
                                }} className='text-3xl text-red-700 cursor-pointer dark:text-blue-600'/>
                              </div>

                             </div>
                        </div>)}
                    
                  </div>  : <p className='text-gray-600 text-center dark:text-white font-bold border-2 border-main-border-color'> No Upcomming Quizz Now </p>}
              </div>
              
              <hr className='text-gray-500 dark:text-amber-400'/>
              {/* completed quizz */}
              <div className="completed-qizz">
                <h2 className='font-black my-4 flex items-center gap-3'> <IoCheckmarkDoneCircle className='text-3xl'/>Completed Quizz</h2>
                 {completedQuizz.length > 0 ?   <table className='w-full'>
                  <thead>
                 <tr className='text-white border-[1px] border-main-border-color'>
                     <th className='bg-black/50'>Title</th>
                    <th className='bg-black/50'> Questions No</th>
                    <th className='bg-black/50'> No Of Participate</th>
                    <th className='bg-black/50'>Duration</th>
                 </tr>
                  </thead>
                   <tbody>
                    {completedQuizz.map((quizz:CompletedQuizzProps)=> <tr key={quizz._id} className='text-center border-[1px] border-main-border-color'>
                     <td className='capitalize font-semibold'>{quizz.title}</td>
                     <td>{quizz.questions_number}</td>
                     <td>{quizz.participants}</td>
                     <td>{quizz.duration} minutes</td>
                    </tr>)}
                   </tbody>


                </table> :<p className='text-gray-600 text-center dark:text-white font-bold border-2 border-main-border-color'> No Completed Quizz Now </p>}
              
              </div>

              {paginatedData && paginatedData.length > 0 && <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} totalItems={upcommingQuizzList.length || 0}/>
}
      </div>




      {/*  Add And Update Form */}
      {showQuizzAddAndUpdateForm && <QuizzesAddAndUpdateForm
       onClose={()=>{ 
        setShowQuizzAddAndUpdateForm(false)
        setTitle(null)
        setCurrentQuizz(null)
        setSelectedQuizzId(null)
       }}
       
       title={title}
       onCreate={createNewQuizz}
       errorMessage={errorMessage}
       onUpdate={handleUpdateCurrentQuizz}
       currentQuizz={currentQuizz}
       
       />}



{/* quizz success model */}

{showSuccess && successMessage && <QuizSuccessModal quizz={successMessage} onClose={()=>{
  setShowSuccess(false)
  setSuccessMessage(null)
}}/>}



{/*  upcomming quizz details model */}

{showQuizzDetails && currentQuizz && <QuizzesDetails 
onClose={()=>{
  setShowQuizzDetails(false)
  setCurrentQuizz(null)
  setSelectedQuizzId(null)
}}
onDelete={(quizzId:string)=>{
  setShowQuizzDetails(false)
  setSelectedQuizzId(quizzId)
  setShowDeletModel(true)
}}

quiz={currentQuizz}
onEdit={(quizz)=>{
  setShowQuizzDetails(false)
  setSelectedQuizzId(quizz._id)
  setCurrentQuizz(quizz)
  setTitle("Update Current Quizz")
  setShowQuizzAddAndUpdateForm(true)
  setErrorMessage(null)
}}

/>}


{/* delet model */}

{showDeletModel && selectedQuizzId && <DeleteConfirmModal
isOpen={showDeletModel}
loading={isLoading}
onClose={()=>{
  setShowDeletModel(false)
  setSelectedQuizzId(null)
}}
onConfirm={handleDeletQuizz}
title='Are You Want to Delet This Quizz?'
/>}



    </div>
  )
}
