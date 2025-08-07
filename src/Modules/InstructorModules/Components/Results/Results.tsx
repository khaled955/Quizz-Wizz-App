import { useCallback, useEffect, useState } from "react"
import { ResultsProps } from "../../../../Interfaces/Results.interface"
import { isAxiosError } from "axios"
import toast from "react-hot-toast"
import { axiosInstance } from "../../../../Services/axiosInstance"
import { QUIZ } from "../../../../Services/endPoint"
import useAuth from "../../../../Hooks/useAuth"
import { FaUserGraduate, FaClock, FaQuestionCircle, FaSortNumericUp, FaCheckCircle, FaAward } from "react-icons/fa";
import Pagination from "../../../SharedModules/Components/Pagination/Pagination"
import Loading from "../../../SharedModules/Pages/Loading/Loading"




const ITEMS_PER_PAGE = 3;


export default function Results() {
const[resultsList,setResultsList] = useState<ResultsProps[]| null>(null)
 const [currentPage,setCurrentPage] = useState(1);

const{logedInData,logOut}= useAuth()





// setting for pagination
 const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = resultsList?.slice(startIndex, startIndex + ITEMS_PER_PAGE);






const fetchAllResults = useCallback(async function(){

try {

  const{data} = await axiosInstance.get(QUIZ.ALL_RESULTS)
    setResultsList(data)
} catch (error) {
  if(isAxiosError(error))toast.error(error.response?.data.message ||"Some Thing Go Wrong")
}



},[])



useEffect(()=>{

if(logedInData?.profile.role === "Instructor"){
    fetchAllResults()
}else{
  logOut()
    return;
}

},[logedInData,logOut,fetchAllResults])








  if(!paginatedData) return <Loading/>
  return (
  <div className="results-box w-full border border-main-border-color p-4">
      <h2 className="font-bold text-xl mb-6">Completed Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        { paginatedData && paginatedData?.length > 0 ?paginatedData?.map(({ quiz, participants }) => (
          <div
            key={quiz._id}
            className="group perspective cursor-pointer"
          >
            <div className="relative h-64 w-full text-white transition-transform duration-700 transform-style preserve-3d group-hover:rotate-y-180">
              {/* Front */}
              <div className="absolute backface-hidden bg-gradient-to-br from-indigo-500 to-blue-600  p-4 rounded-xl h-full w-full flex flex-col items-center justify-center shadow-lg">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <FaCheckCircle className="text-white" /> {quiz.title}
                </h3>
                <p className="text-sm mt-2">Code: <span className="font-semibold">{quiz.code}</span></p>
                <p className="text-sm mt-1">Status: <span className="capitalize">{quiz.status}</span></p>
              </div>

              {/* Back */}
              <div className="absolute rotate-y-180 backface-hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4 rounded-xl h-full w-full flex flex-col justify-between shadow-lg">
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <FaAward /> <span className="font-semibold">Type:</span> {quiz.type}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCheckCircle /> <span className="font-semibold">Difficulty:</span> {quiz.difficulty}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaQuestionCircle /> <span className="font-semibold">Questions:</span> {quiz.questions_number}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock /> <span className="font-semibold">Duration:</span> {quiz.duration} min
                  </p>
                  <p className="flex items-center gap-2">
                    <FaSortNumericUp /> <span className="font-semibold">Score/Question:</span> {quiz.score_per_question}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUserGraduate /> <span className="font-semibold">Participants:</span> {participants.length}
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Closed: {new Date(quiz.closed_at).toLocaleString("en-GB")}
                </p>
              </div>
            </div>
          </div>
        )):<p className="text-xl text-red-700 text-center dark:text-white"> No Data Available Now</p>}
      </div>

      { paginatedData && paginatedData?.length > 0 && <Pagination currentPage={currentPage} itemsPerPage={ITEMS_PER_PAGE} totalItems={resultsList?.length || 0}
      onPageChange={setCurrentPage}
      
      />}
    </div>

  )
}
