import { useEffect, useState } from "react"
import { CompletedQuizzProps, UpcommingQuizzProps } from "../../../../Interfaces/quizz.interface"
import useAuth from "../../../../Hooks/useAuth"
import { isAxiosError } from "axios"
import toast from "react-hot-toast"
import { axiosInstance } from "../../../../Services/axiosInstance"
import { LEARNER } from "../../../../Services/endPoint"
import photo1 from "../../../../assets/images/quizz/1.jpeg"
import photo2 from "../../../../assets/images/quizz/2.jpeg"
import photo3 from "../../../../assets/images/quizz/3.jpg"
import photo4 from "../../../../assets/images/quizz/4.jpg"
import photo5 from "../../../../assets/images/quizz/5.png"
import Loading from "../../../SharedModules/Pages/Loading/Loading"
import { MdFeaturedPlayList } from 'react-icons/md';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';

const QuizzPhotoList = [photo1, photo2, photo3, photo4, photo5, photo1, photo2, photo3, photo4, photo5, photo1, photo2, photo3, photo4, photo5]

export default function LearnerDashboard() {
  const [upCommingQuizzList, setUpCommingQuizzList] = useState<UpcommingQuizzProps[] | null>(null)
  const [lastFiveCompletedQuizz, setLastFiveCompletedQuizz] = useState<CompletedQuizzProps[] | null>(null)
  const { logedInData, logOut } = useAuth()

  useEffect(() => {
    async function fetchUpcommingQuizz() {
      try {
        const { data } = await axiosInstance.get(LEARNER.GET_FIRST_FIVE_INCOMMING)
        setUpCommingQuizzList(data)
      } catch (error) {
        if (isAxiosError(error)) toast.error(error.response?.data.message || "Some Thing Go Wrong")
      }
    }

    if (logedInData?.profile.role === "Student") {
      fetchUpcommingQuizz()
    } else {
      logOut()
    }
  }, [logedInData?.profile.role, logOut])

  useEffect(() => {
    async function fetchTopFiveCompletedQuizz() {
      try {
        const { data } = await axiosInstance.get(LEARNER.LAST_FIVE_COMPLETED)
        setLastFiveCompletedQuizz(data)
      } catch (error) {
        if (isAxiosError(error)) toast.error(error.response?.data.message || "Some Thing Go Wrong")
      }
    }

    if (logedInData?.profile.role === "Student") {
      fetchTopFiveCompletedQuizz()
    } else {
      logOut()
    }
  }, [logedInData?.profile.role, logOut])

  if (!upCommingQuizzList || !lastFiveCompletedQuizz) return <Loading />

  return (
    <main className="dashboard-container grid grid-cols-12 gap-4" role="main" aria-label="Learner dashboard quizzes">
      <section className="col-span-12 md:col-span-6" aria-labelledby="upcoming-quizzes">
        <h2 id="upcoming-quizzes" className="font-bold text-xl text-gray-500 dark:text-white flex items-center gap-3">
          <MdFeaturedPlayList className="text-2xl" aria-hidden="true" /> Upcoming Quizzes
        </h2>

        {upCommingQuizzList.length > 0 ? (
          upCommingQuizzList.sort((a, b) => Number(new Date(a.schadule)) - Number(new Date(b.schadule))).map((quizz: UpcommingQuizzProps, index: number) => (
            <article key={quizz._id} className="border-[1px] border-main-border-color rounded-2xl my-3 flex flex-wrap gap-2 overflow-hidden" aria-label={`Upcoming quiz titled ${quizz.title}`}>
              <figure className="img" aria-hidden="true">
                <img className="size-24 object-cover" src={QuizzPhotoList[index]} alt="quiz thumbnail" />
              </figure>
              <div className="text">
                <h3 className="font-bold text-lg text-gray-500 capitalize dark:text-amber-400">{quizz.title}</h3>
                <p className="text-sm"><span className="font-bold">Duration</span>: {quizz.duration > 1 ? `${quizz.duration} Minutes` : `${quizz.duration} Minute`}</p>
                <p><span className="font-bold">Schedule</span>: {new Date(quizz.schadule).toLocaleString()}</p>
                <p><span className="font-bold">Score Per Question:</span> {quizz.score_per_question > 1 ? `${quizz.score_per_question} Points` : `${quizz.score_per_question} Point`}</p>
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-700 dark:text-white font-bold text-center border-2 border-main-border-color shadow-emerald-600 p-3 my-3" role="status">No Upcoming Quizzes Available Now</p>
        )}
      </section>

      <section className="col-span-12 md:col-span-6" aria-labelledby="completed-quizzes">
        <h2 id="completed-quizzes" className="font-bold text-xl text-gray-500 dark:text-white flex items-center gap-3">
          <IoCheckmarkDoneCircleSharp className="text-2xl" aria-hidden="true" /> Last Five Completed Quizzes
        </h2>
        {lastFiveCompletedQuizz.length > 1 ? (
          lastFiveCompletedQuizz.map((quizz: CompletedQuizzProps, index: number) => (
            <article key={quizz._id} className="border-[1px] border-main-border-color rounded-2xl my-3 flex flex-wrap gap-2 overflow-hidden" aria-label={`Completed quiz titled ${quizz.title}`}>
              <figure className="img" aria-hidden="true">
                <img className="size-[124px] object-cover" src={QuizzPhotoList.reverse()[index]} alt="quiz thumbnail" />
              </figure>
              <div className="text">
                <h3 className="font-bold text-lg text-gray-500 capitalize dark:text-amber-400">{quizz.title}</h3>
                <p><span className="font-bold">Question Level:</span> <span className="text-gray-700 dark:text-white">{quizz.difficulty}</span></p>
                <p><span className="font-bold">Questions Number:</span> <span className="text-gray-700 dark:text-white">{quizz.questions_number}</span></p>
                <p><span className="font-bold">Score:</span> <span className="text-gray-700 dark:text-white">{quizz.score_per_question}</span></p>
                <p><span className="font-bold">Duration:</span> <span className="text-gray-700 dark:text-white">{quizz.duration} Minute</span></p>
              </div>
            </article>
          ))
        ) : (
          <p className="text-gray-700 dark:text-white font-bold text-center border-2 border-main-border-color shadow-emerald-600 p-3 my-4" role="status">No Completed Quizzes Available Now</p>
        )}
      </section>
    </main>
  )
}
