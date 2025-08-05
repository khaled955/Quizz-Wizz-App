import { useCallback, useEffect, useState } from 'react';
import { BiSolidPlusCircle } from 'react-icons/bi';
import { CreateAndUpdateQuestionProps, QuestionListProps } from '../../../../../Interfaces/Question.interface';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../../../../Services/axiosInstance';
import { QUESTION } from '../../../../../Services/endPoint';
import useAuth from '../../../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../SharedModules/Pages/Loading/Loading';
import { FaEye } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { FaRegTrashCan } from 'react-icons/fa6';
import Pagination from '../../../../SharedModules/Components/Pagination/Pagination';
import DeleteConfirmModal from '../../../../SharedModules/Components/ConfirmationModel/ConfirmationModel';
import QuestionsDetailsModal from '../QuestionsDetailsModal/QuestionsDetailsModal';
import QuestionsAddAndUpdateForm from '../QuestionsAddAndUpdateForm/QuestionsAddAndUpdateForm';



const ITEMS_PER_PAGE = 6;



export default function QuestionsList() {
const[QuestionList , setQuestionList] = useState<QuestionListProps[] | null>(null)
const[QuestionLevel , setQuestionLevel] = useState("")
const[QuestionType , setQuestionType] = useState("")
 const [currentPage, setCurrentPage] = useState(1);
 const[selectedId , setSelectedId] = useState<string | null>(null)
const[ShowDeletModel , setShowDeletModel] = useState(false)
const[loading , setLoading] = useState(false)
 const[title , setTitle] = useState<string | null>(null)
const[errorMessage , setErrorMessage] = useState(null)
const [showAddAndUpdateForm,setShowAddAndUpdateForm] = useState(false)
const[showQuestionDetails,setShowQuestionDetails] = useState(false)
const[selectedQuestion , setSelectedQuestion] = useState<QuestionListProps | null>(null)
const {logedInData} = useAuth()
const navigate = useNavigate()


// fetch Questions
const fetchQuestions = useCallback( async function(){


try {
  const {data} = await axiosInstance.post(QUESTION.SEARCH_QUESTION(QuestionLevel,QuestionType))
  setQuestionList(data)
  
} catch (error) {

  if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")

}

},[QuestionLevel,QuestionType])




//  update current group

const handleUpdateCurrentQuestion = useCallback(  async function(dataInfo:CreateAndUpdateQuestionProps,questionId:string){

  const toastId = toast.loading("Waiting.....")
      setErrorMessage(null)

  try {
    const options = {
      url:QUESTION.UPDATE_QUESTION(questionId),
      method: "PUT",
      data:dataInfo
    }

const{data} = await axiosInstance.request(options)
if(data.message === "Record updated successfully"){
 toast.success( data.message || "Question Updated successfully")
   await fetchQuestions()
   setTimeout(()=>{
    setShowAddAndUpdateForm(false)
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

},[fetchQuestions])


const createNewQuestion = useCallback(  async function(dataInfo:CreateAndUpdateQuestionProps){

  const toastId = toast.loading("Waiting.....")
      setErrorMessage(null)

  try {
    const options = {
      url:QUESTION.CREATE_QUESTION,
      method: "POST",
      data:dataInfo
    }

const{data} = await axiosInstance.request(options)
if(data.message === "Record created successfully"){
  toast.success( data.message || "Question created successfully")
   await fetchQuestions()
   setTimeout(()=>{
    setShowAddAndUpdateForm(false)
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

},[fetchQuestions])











const handleDeletQuestion = useCallback(async function(){
  const toastId = toast.loading("Waiting.....")
 setErrorMessage(null)
 setLoading(true)
 try {
  
const{data} = await axiosInstance.delete(QUESTION.DELETE_QUESTION(selectedId!))

if(data.message === "Record deleted successfully"){
  toast.success(data.message || "Question deleted successfully")
   await fetchQuestions()
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
  setLoading(false)
  setSelectedId(null)
 }

},[selectedId,fetchQuestions])











useEffect(()=>{

if(logedInData?.profile.role === "Instructor"){
    fetchQuestions()
}else{
    navigate("/dashboard")
    return;
}

},[logedInData,navigate,fetchQuestions])




// event handler
const handleShowAddAndUpdateModel = useCallback(function(){
  setTitle("Set up a new Question")
  setShowAddAndUpdateForm(true)
  setSelectedQuestion(null)
  setErrorMessage(null)
},[])








// setting for pagination
 const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = QuestionList?.slice(startIndex, startIndex + ITEMS_PER_PAGE);





if(!QuestionList) return <Loading/>
  return (
    <div className="questions-container">
      <div className="header flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center mb-3">
        <h2 className="text-2xl font-bold">Bank Of Questions</h2>
        <button onClick={handleShowAddAndUpdateModel} className="addBtn"> <BiSolidPlusCircle className='inline text-xl'/> Add Question</button>
      </div>

       {/* search box */}
  <div className="filter-questions my-4 flex gap-3 flex-wrap flex-col sm:flex-row justify-center">

    {/* filter by level  */}
    <div className="level-filter grow">
      <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setQuestionLevel(e.target.value)
        setCurrentPage(1)
      }} defaultValue="" className='outline-0 border-2 rounded-2xl p-2 w-full'>
      <option disabled value="">Filter By Level</option>
      <option  value="">All</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
    </div>


 {/* filter by type  */}
    <div className="type-filter grow">
      <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setQuestionType(e.target.value)
        setCurrentPage(1)
      }} defaultValue="" className='outline-0 border-2 rounded-2xl p-2 w-full'>
      <option disabled value="">Filter By Type</option>
      <option  value="">All</option>
      <option value="FE">FE</option>
      <option value="BE">BE</option>
      <option value="DO">DO</option>
    </select>
    </div>



  </div>

<div className="table-box text-center max-w-full">
  <table className='w-full'>
    <thead>
      <tr className='bg-black text-white'>
        <th className=''>Title</th>
        <th className=''> Description</th>
        <th className=''> level</th>
        <th className=''>Type</th>
        <th className='py-3'>Actions</th>
      </tr>
    </thead>
<tbody>
 {paginatedData && paginatedData.length > 0 ? paginatedData?.map((question:QuestionListProps)=> <tr key={question._id}>
    <td className='border-[1px] border-main-border-color mb-1 py-3'>{question.title}</td>
    <td className='border-[1px] border-main-border-color mb-1'>{question.description}</td>
    <td className='border-[1px] border-main-border-color mb-1 p-4'>{question.difficulty}</td>
    <td className='border-[1px] border-main-border-color mb-1 px-4'>{question.type}</td>
    <td className='border-[1px] border-main-border-color mb-1'> <div className='flex gap-2 h-full px-2 text-gray-700 flex-wrap md:flex-nowrap'>
      
      <FaEye onClick={()=>{
      setSelectedQuestion(question)
      setShowQuestionDetails(true)
    }} className='cursor-pointer text-xl hover:text-blue-600 transition-colors duration-300'/> 
      
      <AiFillEdit onClick={()=>{
      setSelectedQuestion(question)
      setTitle("Update Current Question")
      setShowAddAndUpdateForm(true)
    }} 
    
    className='cursor-pointer text-xl hover:text-yellow-500 transition-colors duration-300'/>
    
     <FaRegTrashCan onClick={()=>{
      setSelectedId(question._id)
       setShowDeletModel(true)

    }} className='cursor-pointer text-xl hover:text-red-600 transition-colors duration-300'/></div>
     </td>
  </tr>) : <tr> <td colSpan={5} className='text-red-700 font-bold'> No Questions Available Now</td></tr>}
</tbody>


  </table>
</div>


{paginatedData && paginatedData.length > 0 && <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} totalItems={QuestionList?.length || 0}/>
}




{/* delet model */}
{ShowDeletModel && <DeleteConfirmModal isOpen={ShowDeletModel} onClose={()=>{
  setSelectedId(null)
  setShowDeletModel(false)
}}
  onConfirm={handleDeletQuestion}
  title="Are you sure you want to delete this Question?"
  description="This Action Will Remove This Question From Your List"
  loading={loading}
  />}


{/* Question Details Model */}

{ showQuestionDetails && selectedQuestion && <QuestionsDetailsModal
  isOpen={showQuestionDetails}
  question={selectedQuestion}
  onClose={() => {
    setShowQuestionDetails(false)
    setSelectedQuestion(null)
  }}
/>
}



   {/* add and update form pop up */}

{showAddAndUpdateForm &&  <QuestionsAddAndUpdateForm errorMessage={errorMessage} onClose={()=>{
  setShowAddAndUpdateForm(false)
  setTitle(null)
  setSelectedQuestion(null)
}} 
onCreate={createNewQuestion} 
title={title}
currentQuestion={selectedQuestion}
onUpdate={handleUpdateCurrentQuestion}
/>
}





    </div>
  )
}
