import { useEffect, useState } from "react"
import { CompletedQuizzProps, UpcommingQuizzProps } from "../../../../Interfaces/quizz.interface"
import useAuth from "../../../../Hooks/useAuth"
import { isAxiosError } from "axios"
import toast from "react-hot-toast"
import { axiosInstance } from "../../../../Services/axiosInstance"
import { LEARNER} from "../../../../Services/endPoint"
import photo1 from "../../../../assets/images/quizz/1.jpeg"
import photo2 from "../../../../assets/images/quizz/2.jpeg"
import photo3 from "../../../../assets/images/quizz/3.jpg"
import photo4 from "../../../../assets/images/quizz/4.jpg"
import photo5 from "../../../../assets/images/quizz/5.png"
import Loading from "../../../SharedModules/Pages/Loading/Loading"




const QuizzPhotoList = [photo1,photo2,photo3,photo4,photo5,photo1,photo2,photo3,photo4,photo5,photo1,photo2,photo3,photo4,photo5]


export default function LearnerDashboard() {
const[upCommingQuizzList,setUpCommingQuizzList] = useState<UpcommingQuizzProps[]| null>(null)
const[lastFiveCompletedQuizz , setLastFiveCompletedQuizz] = useState<CompletedQuizzProps[]| null>(null)
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






useEffect(()=>{

async function fetchTopFiveCompletedQuizz(){

try {
  const{data} = await axiosInstance.get(LEARNER.LAST_FIVE_COMPLETED)
 setLastFiveCompletedQuizz(data)

} catch (error) {
    if(isAxiosError(error))toast.error(error.response?.data.message || "Some Thing Go Wrong")
}


}

if(logedInData?.profile.role === "Student"){
  fetchTopFiveCompletedQuizz()
}else{
  logOut()
}

},[logedInData?.profile.role , logOut])



if(!upCommingQuizzList || !lastFiveCompletedQuizz) return <Loading/>
  return (
    <div className="dashboard-container grid grid-cols-12 gap-4">
      <div className=" col-span-12 md:col-span-6">
          <h2 className="font-bold text-2xl text-gray-500">Up Comming Quizz</h2>

         {upCommingQuizzList.length > 0 ? upCommingQuizzList.sort((a,b)=> Number(new Date(a.schadule)) - Number(new Date(b.schadule))).map((quizz:UpcommingQuizzProps,index:number)=><div key={quizz._id}>
           <div className="border-[1px] border-main-border-color rounded-2xl my-3 flex flex-wrap gap-2 overflow-hidden">
            <div className="img">
              <img className="size-24 object-cover" src={QuizzPhotoList[index]} alt="quizz-photo" />
            </div>
            <div className="text">
              <h3 className="font-bold text-lg text-gray-500 capitalize">{quizz.title}</h3>
              <p className="text-sm"> Duration :{quizz.duration >1 ? quizz.duration + " Minutes":quizz.duration + " Minute"} </p>
               Schedule :{new Date(quizz.schadule).toLocaleString()}

              <p> Score Per Question: {quizz.score_per_question > 1 ?quizz.score_per_question +"  Points" :quizz.score_per_question+"  Point"}</p>
            </div>
           </div>
         
               </div>) :<p className="text-red-700 font-bold text-center border-2 border-main-border-color shadow-emerald-600 p-3 my-3"> No Upcomming Quizz Available Now</p>}

      </div>
      <div className="col-span-12 md:col-span-6">
        <h2 className="font-bold text-2xl text-gray-500">Last Five Completed Quizz</h2>
        {lastFiveCompletedQuizz.length > 1 ? lastFiveCompletedQuizz.map((quizz:CompletedQuizzProps,index:number)=><div key={quizz._id} className="border-[1px] border-main-border-color rounded-2xl my-3 flex flex-wrap gap-2 overflow-hidden">
          <div className="img">
            <img className="size-[124px] object-cover" src={QuizzPhotoList.reverse()[index]} alt="quizz-photo" />
          </div>
          <div className="text">
            <h3 className="font-bold text-lg text-gray-500 capitalize">{quizz.title}</h3>
            <p>Question Level: <span className="text-gray-700">{quizz.difficulty}</span></p>
            <span className="block">Questions Number : <span className="text-gray-700">{quizz.questions_number}</span> </span>
            <span className="block">Score : <span className="text-gray-700">{quizz.score_per_question}</span> </span>
            <span className="block">Duration : <span className="text-gray-700">{quizz.duration} Minute</span></span>
          </div>
        </div>)
 :<p className="text-red-700 font-bold text-center border-2 border-main-border-color shadow-emerald-600 p-3 my-4"> No Completed Quizz Available Now</p>}
      </div>
    </div>
  )
}

