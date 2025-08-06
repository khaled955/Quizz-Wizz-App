import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useCallback, useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { FaSpinner } from 'react-icons/fa';
import alertAudio from "../../../../../assets/audio/alarm.mp3";
import { LearnerQuizResult } from "../../../../../Interfaces/LearnerQuizResult.interface";
import { LearnerQuizQuestions } from "../../../../../Interfaces/LearnerQuiz.interface";
import { QuizAnswerSubmission } from "../../../../../Interfaces/LearnerQuizzAnswerSubmistioninterface";
import useAuth from "../../../../../Hooks/useAuth";
import { LEARNER } from "../../../../../Services/endPoint";
import { axiosInstance } from "../../../../../Services/axiosInstance";
import Loading from "../../../../SharedModules/Pages/Loading/Loading";

interface QuizQuestionModalProps {
  onClose: () => void;
  onSubmit: (data: LearnerQuizResult) => void;
  quizId: string;
  onSet: (data: LearnerQuizQuestions) => void;
}

export default function QuizQuestionModal({ onClose, onSubmit, quizId, onSet }: QuizQuestionModalProps) {
  const [questions, setQuestions] = useState<LearnerQuizQuestions | null>(null);
  const [counter, setCounter] = useState(0);
  const [durationPerQuestionInMinute, setDurationPerQuestionInMinute] = useState(0);
  const { handleSubmit, formState: { isSubmitting ,errors}, register, getValues } = useForm<QuizAnswerSubmission>();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { logedInData } = useAuth();









 const handleFormSubmit =  useCallback(async (dataInfo: QuizAnswerSubmission) => {
   
    const toastId = toast.loading("Waiting......");
    try {
      const options = {
        method: "POST",
        url: LEARNER.SUBMIT_QUIZZ(quizId),
        data: dataInfo
      };
      const { data } = await axiosInstance.request(options);
      toast.success(data.message || "Quizz Submitted Successfully");
      onSubmit(data.data);
      onClose();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to submit form");
      }
    } finally {
      toast.dismiss(toastId);
    }
  },[onClose,quizId,onSubmit]);










const autoSubmit = useCallback(() => {
  const values = getValues();

  // Not all answered
  const incomplete = values.answers?.length !== questions?.questions.length ||
    values.answers.some((a) => !a.answer);

  if (incomplete) {
  

  setTimeout(() => {
      onClose(); // ✅ Defer close
      onSubmit({
        score: 0,
        questions: [],
        finished_at: new Date().toISOString(),
        started_at: new Date().toISOString(),
        _id: "",
        participant: logedInData?.profile._id || "",
        quiz: quizId,
      });
    }, 0);

    return;
  }

  handleFormSubmit(values);
}, [getValues, handleFormSubmit, onClose, onSubmit, logedInData?.profile._id, quizId, questions?.questions.length]);



  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    async function fetchQuestions() {
      try {
        const { data } = await axiosInstance.get(LEARNER.GET_QUESTIONS_WITHOUT_ANSWERS(quizId));
        setQuestions(data.data);
        onSet(data.data);
        setDurationPerQuestionInMinute(data.data.duration);

        interval = setInterval(() => {
          setCounter(prev => {
            const totalSeconds = data.data.duration * 60;
            const newVal = prev + 1;
            if (newVal === totalSeconds - 60 && audioRef.current) {
              audioRef.current.play(); // play 1-minute alert
            }
            if (newVal >= totalSeconds) {
              clearInterval(interval);
              autoSubmit();
            }
            return newVal;
          });
        }, 1000);
      } catch (error) {
        if (isAxiosError(error)) toast.error(error.response?.data.message || "Failed to load questions");
      }
    }

    fetchQuestions();
    return () => clearInterval(interval);
  }, [quizId, onSet,autoSubmit]);

 
 
  if (!questions) return <Loading />;

  const totalSeconds = durationPerQuestionInMinute * 60;
  const remaining = totalSeconds - counter;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh] border-[1px] border-black dark:border-white"
      >
        <audio ref={audioRef} src={alertAudio} preload="auto" />
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <MdClose size={22} />
        </button>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Answer Questions ({questions.questions.length})
          </h2>
          <span className="text-sm text-gray-600 dark:text-amber-400">
            Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {questions.questions.map((question, index) => (
            <div key={question._id} className="p-4 rounded-md border dark:border-gray-700 space-y-2">
              <p className="font-medium text-lg text-gray-800 dark:text-white">
                {index + 1}. {question.title}
              </p>
              <div className="space-y-1">
               {(["A", "B", "C", "D"] as const).map((optionKey) => (
  <label key={optionKey} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
    <input
      type="radio"
      value={optionKey}
      {...register(`answers.${index}.answer`, {
        required: "This question is required",
      })}
    />
    {question.options[optionKey]}
  </label>
))}
{errors?.answers?.[index]?.answer && (
  <p className="text-red-500 text-sm dark:text-white">{errors.answers[index]?.answer?.message}</p>
)}

              </div>
              <input
                type="hidden"
                value={question._id}
                {...register(`answers.${index}.question`)}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold rounded-md transition duration-150"
          >
            {isSubmitting ? <FaSpinner className="animate-spin" /> : "Submit Answers"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}



