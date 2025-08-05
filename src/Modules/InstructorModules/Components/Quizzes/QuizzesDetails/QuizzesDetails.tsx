



import { MdClose,  MdOutlineQuiz } from "react-icons/md";
import { FaTrash, FaEdit, FaListUl } from "react-icons/fa";
import { motion } from "framer-motion";
import { UpcommingQuizzProps } from "../../../../../Interfaces/quizz.interface";
import { format } from "date-fns";

interface Props {
  quiz: UpcommingQuizzProps;
  onClose: () => void;
  onEdit: (quizz:UpcommingQuizzProps) => void;
  onDelete: (quizzId:string) => void;
}

export default function QuizzesDetails({
  quiz,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 relative transition-all"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          <MdClose />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <MdOutlineQuiz className="text-blue-500 dark:text-blue-400 text-3xl" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {quiz.title}
          </h2>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">Code:</span> {quiz.code}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`font-bold ${
                quiz.status === "closed"
                  ? "text-red-500"
                  : "text-green-500 dark:text-green-400"
              }`}
            >
              {quiz.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Schedule:</span>{" "}
            {format(new Date(quiz.schadule), "dd MMM yyyy, hh:mm a")}
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {quiz.duration} min
          </p>
          <p>
            <span className="font-semibold">Questions:</span>{" "}
            {quiz.questions_number}
          </p>
          <p>
            <span className="font-semibold">Difficulty:</span>{" "}
            <span
              className={`capitalize font-semibold ${
                quiz.difficulty === "easy"
                  ? "text-green-500"
                  : quiz.difficulty === "medium"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {quiz.difficulty}
            </span>
          </p>
          <p>
            <span className="font-semibold">Type:</span> {quiz.type}
          </p>
          <p>
            <span className="font-semibold">Score per Question:</span>{" "}
            {quiz.score_per_question}
          </p>
        </div>

        {/* Questions Preview */}
        <div className="mt-4 border-t pt-4">
          <h3 className="flex items-center gap-2 text-gray-800 dark:text-white font-bold mb-2">
            <FaListUl />
            Questions Preview
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
            {quiz.questions.map((q, idx) => (
              <li key={q._id}>
                <span className="font-medium">Q{idx + 1}:</span> {q.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => onEdit(quiz)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <FaEdit />
            Edit
          </button>
          <button
            onClick={() => onDelete(quiz._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
