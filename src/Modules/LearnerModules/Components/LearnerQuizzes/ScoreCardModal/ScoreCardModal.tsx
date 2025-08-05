import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { FaTimes, FaMedal, FaSmile, FaRegSadTear, FaRegThumbsUp } from "react-icons/fa";
import useAuth from "../../../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ScoreCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  total: number;
  title:string | null;
}

export default function ScoreCardModal({ isOpen, onClose, score, total,title}: ScoreCardModalProps) {
  const navigate = useNavigate()
  const {logedInData} = useAuth()
  const percentage = total > 0 ? ((score / total) * 100).toFixed(0) : "0";



  const getMessage = () => {
    if (+percentage >= 90) return { msg: "Excellent!", icon: <FaMedal className="text-yellow-500" /> };
    if (+percentage >= 75) return { msg: "Great Job!", icon: <FaSmile className="text-green-500" /> };
    if (+percentage >= 50) return { msg: "Good Effort!", icon: <FaRegThumbsUp className="text-blue-500" /> };
    return { msg: "Keep Practicing!", icon: <FaRegSadTear className="text-red-500" /> };
  };

  const result = getMessage();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md text-center relative"
        >
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold text-main-color mb-2">Quiz Result</h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg mb-1">
            You scored <span className="font-bold text-main-color">{score}</span> out of {" "}
            <span className="font-bold">{total}</span>
          </p>

          <div className="text-4xl font-extrabold text-green-600 mb-2">{percentage}%</div>

          <div className="flex items-center justify-center gap-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
            {result.icon}
            {result.msg}
          </div>

          <button
            onClick={()=>{
              onClose()
              navigate(`/learner/certificate/${logedInData?.profile._id}`,{state:{score:percentage,title,total}})
            }}
            className="mt-5 px-5 py-2 bg-main-color text-white rounded-lg hover:bg-main-hover transition"
          >
            Close
          </button>
        </motion.div>
      </div>
    </Dialog>
  );
}
