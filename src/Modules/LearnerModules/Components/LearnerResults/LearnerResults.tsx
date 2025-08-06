import { useEffect, useState } from 'react';
import { PiGraduationCapThin } from 'react-icons/pi';
import { QuizResultData } from '../../../../Interfaces/LearnerResultsDisplay.interface';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../../../Services/axiosInstance';
import { LEARNER } from '../../../../Services/endPoint';
import useAuth from '../../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../SharedModules/Pages/Loading/Loading';
export default function LearnerResults() {
const[resultsList,setResultsList] = useState<QuizResultData[]| null>(null)
const{logedInData} = useAuth()
const navigate = useNavigate()


useEffect(()=>{
async function fetchAllResults(){


  try {
    
    const {data} = await axiosInstance.get(LEARNER.GET_ALL_RESULTS)
    setResultsList(data)
  } catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")
  }
}


if(logedInData?.profile.role !== "Instructor"){
    fetchAllResults()
}else{
    navigate("/")
    return;
}





},[logedInData?.profile.role , navigate])



if(!resultsList) return<Loading/>
  return (
    <div className="result-container">
      <h2 className="text-gray-600 font-bold text-2xl flex items-center gap-2 mb-4 dark:text-white"> <PiGraduationCapThin className='text-3xl'/>  Quizz-Results</h2>

    { resultsList && resultsList?.length > 0 ?<div className='table-box'>
      <table className="table-auto w-full text-center">
        <thead className="bg-gray-900 text-white font-bold">
          <tr>
            <td className='py-2'>Title</td>
            <td>Questions No</td>
            <td> Score</td>
            <td> Difficulty</td>
          </tr>
        </thead>

<tbody>
  {resultsList.map((result:QuizResultData)=> <tr key={result.quiz._id} className='border-[1px]'>
    <td className='capitalize py-1 font-medium'>{result.quiz.title}</td>
    <td>{result.quiz.questions_number}</td>
    <td>{result.result.score}</td>
    <td className='capitalize'>{result.quiz.difficulty}</td>
  </tr>)}
</tbody>


      </table>
    </div> :<p className='text-gray-600 text-2xl'> No Results Available Now</p>}


    </div>
  )
}
