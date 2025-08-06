import { useCallback, useEffect, useState } from "react"
import { isAxiosError } from "axios"
import toast from "react-hot-toast"
import photo1 from "../../../../../assets/images/quizz/1.jpeg"
import photo2 from "../../../../../assets/images/quizz/2.jpeg"
import photo3 from "../../../../../assets/images/quizz/3.jpg"
import photo4 from "../../../../../assets/images/quizz/4.jpg"
import photo5 from "../../../../../assets/images/quizz/5.png"
import CountDownTimer from "../CountDownTimer/CountDownTimer"
import QuizCouponModal from "../QuizCouponModal/QuizCouponModal"
import QuizQuestionModal from "../QuizQuestionsModal/QuizQuestionsModal"
import ScoreCardModal from "../ScoreCardModal/ScoreCardModal"
import { UpcommingQuizzProps } from "../../../../../Interfaces/quizz.interface"
import { LearnerQuizResult } from "../../../../../Interfaces/LearnerQuizResult.interface"
import useAuth from "../../../../../Hooks/useAuth"
import { LEARNER } from "../../../../../Services/endPoint"
import { axiosInstance } from "../../../../../Services/axiosInstance"
import { LearnerQuizQuestions } from "../../../../../Interfaces/LearnerQuiz.interface"
import Loading from "../../../../SharedModules/Pages/Loading/Loading"
import QuizzInstructions from "../QuizzInstructions/QuizzInstructions"
import { RiNextjsFill } from 'react-icons/ri';



const QuizzPhotoList = [photo1,photo2,photo3,photo4,photo5,photo1,photo2,photo3,photo4,photo5,photo1,photo2,photo3,photo4,photo5]

const instructions: string[] = [
  "You must answer all the questions to submit the quiz.",
  "Each question has four options; choose the most appropriate one.",
  "You cannot go back and change your answers once selected (unless specified).",
  "Each question carries equal marks unless stated otherwise.",
  "You will have a limited amount of time to complete the quiz.",
  "The quiz will be automatically submitted once the timer ends.",
  "Do not refresh or close the browser window during the quiz.",
  "Scores will be shown immediately after submission.",
  "If you face any technical issues, contact your instructor immediately.",
  "Read each question carefully before answering.",
  "Unanswered questions will be marked as incorrect.",
  "Make sure your internet connection is stable during the quiz.",
  "Avoid using multiple devices or tabs to prevent disqualification.",
  "Once you click 'Start Quiz', the timer will begin.",
  "Good luck and do your best!"
];


export default function LearnerQuizz() {
const[upCommingQuizzList,setUpCommingQuizzList] = useState<UpcommingQuizzProps[]| null>(null)
const [showCouponModal, setShowCouponModal] = useState(false);
const[selectedQuizzId , setSelectedQuizzId] = useState< string | null>(null)
const[showQuestionsModal,setShowQuestionsModal] = useState(false)
const[successIdAfterCodeEntry , setsuccessIdAfterCodeEntry] = useState< string | null>(null)
const[showScoreCard,setShowScoreCard] = useState(false)
const[scoreData , setScoreData] = useState<LearnerQuizResult | null>(null)
const[showInstructionsModel , setShowInstructionModel] = useState(false)
const[totalQuestions , setTotalQuestions] = useState(0)
const[scorePerQuestion,setScorePerQuestion] = useState(0)
const[quizzTitle , setQuizzTitle] = useState<string | null>(null)
const{logedInData,logOut} = useAuth()








useEffect(()=>{

async function fetchUpcommingQuizz(){

try {
  const{data} = await axiosInstance.get(LEARNER.GET_FIRST_FIVE_INCOMMING)

 setUpCommingQuizzList(data)

} catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")
}


}

if(logedInData?.profile.role === "Student"){
  fetchUpcommingQuizz()
}else{
  logOut()
}

},[logedInData?.profile.role , logOut])



  






const handleShowCouponModel = useCallback(function(){
  setShowCouponModal(true)
},[])


const handleSetQuizId = useCallback(function(currentQuizzId:string){
  setSelectedQuizzId(currentQuizzId)
},[])

const handleSetSuccessedIdAfterCodeEntry = useCallback(function(currentQuizzId:string){
  setsuccessIdAfterCodeEntry(currentQuizzId)
},[])


const handleSetQuizzTitle = useCallback(function(currentQuizzTitle:string){
  setQuizzTitle(currentQuizzTitle)
},[]
)






const handleSetQuestions = useCallback((data: LearnerQuizQuestions) => {
  setTotalQuestions(data.questions_number)
  setScorePerQuestion(data.score_per_question)
}, []);





if(!upCommingQuizzList) return <Loading/>
  return (
    <div className="dashboard-container grid grid-cols-12 gap-4">

      {/*  left side */}
      <div className=" col-span-12 md:col-span-6">
          <h2 className="font-bold text-xl text-gray-500 dark:text-white flex items-center gap-3"> <RiNextjsFill className="text-3xl"/>Your Next Quizz</h2>

         {upCommingQuizzList.length > 0 ?upCommingQuizzList.sort((a,b)=> Number(new Date(a.schadule)) - Number(new Date(b.schadule))).map((quizz:UpcommingQuizzProps,index:number)=><div key={quizz._id}>
           <div  className="border-[1px] border-main-border-color rounded-2xl my-3 justify-center flex items-center gap-2 overflow-hidden flex-col sm:flex-row text-center">
            <div className="img w-full sm:w-auto">
              
              <img className=" w-full sm:size-24 object-cover" src={QuizzPhotoList[index]} alt="quizz-photo" />
            </div>
            <div className="text grow">
              <h3 className="font-bold text-lg text-gray-500 capitalize dark:text-amber-400">{quizz.title}</h3>
              <p className="text-sm"> <span className="font-bold">Duration :</span>{quizz.duration >1 ? quizz.duration + " Minutes":quizz.duration + " Minute"} </p>
              <p><span className="font-bold">Schedule :</span> <span className="text-gray-500 dark:text-white">{new Date(quizz.schadule).toLocaleDateString()} - </span> <span className="text-gray-400 dark:text-amber-100">{new Date(quizz.schadule).toLocaleTimeString()}</span></p>
              <p> <span className="font-bold">Score Per Question:</span> {quizz.score_per_question > 1 ?quizz.score_per_question +"  Points" :quizz.score_per_question+"  Point"}</p>
            </div>
            <div className="action-timer px-1">
              <CountDownTimer title={quizz.title} targetDate={quizz.schadule}  onShow={handleShowCouponModel} id={quizz._id} onSet={handleSetQuizId} onTitle={handleSetQuizzTitle}/>
            </div>
           </div>
         
               </div>) :<p className="text-gray-700 dark:text-white font-bold text-center border-2 border-main-border-color shadow-xl p-3 my-3"> No Upcomming Quizz Available Now</p>}

      </div>


     {/*Coupon Model Pop Up  */}
{ showCouponModal && <QuizCouponModal onClose={()=>{
  setShowCouponModal(false)

}}

onSuccess={(currentId)=>{
  handleSetSuccessedIdAfterCodeEntry(currentId)
      setShowInstructionModel(true)

}}
id={selectedQuizzId}
/>}



{/*  instruction model */}

{showInstructionsModel && <QuizzInstructions
instructions={instructions}
isOpen={showInstructionsModel}
onClose={()=>{
  setShowInstructionModel(false)
}}
onStart={()=>{
   setShowInstructionModel(false);
    setShowQuestionsModal(true);
}}

/>}




{successIdAfterCodeEntry && showQuestionsModal && <QuizQuestionModal
onClose={()=>{

  setShowQuestionsModal(false)
  setsuccessIdAfterCodeEntry(null)
}}
onSet={handleSetQuestions}
quizId={successIdAfterCodeEntry}
onSubmit={(data:LearnerQuizResult)=>{
  setShowQuestionsModal(false);
  setScoreData(data);
  setTimeout(() => {
    setShowScoreCard(true);
  }, 300); 
}}

/>}

{/* score card model */}


{showScoreCard && scoreData && totalQuestions && <ScoreCardModal
isOpen={showScoreCard}
onClose={()=>{
  setShowScoreCard(false)
}}
score={scoreData.score}
total={totalQuestions * scorePerQuestion}
title={quizzTitle}
/>}






    </div>
  )
}

