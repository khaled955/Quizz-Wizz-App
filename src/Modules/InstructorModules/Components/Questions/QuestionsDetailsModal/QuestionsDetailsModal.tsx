// import { motion } from "framer-motion";
// import { MdClose } from "react-icons/md";
// import { QuestionListProps } from "../../../../../Interfaces/Question.interface";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// interface Props {
//   question: QuestionListProps;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const QuestionsDetailsModal = ({ question, isOpen, onClose }: Props) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-6">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0 }}
//         className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative"
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
//         >
//           <MdClose />
//         </button>

//         {/* Header */}
//         <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
//           <FaTimesCircle className="text-green-500" />
//           Question Details
//         </h2>

//         {/* Question Info */}
//         <div className="space-y-2 text-left text-gray-700">
//           <p>
//             <span className="font-semibold">Title:</span> {question.title}
//           </p>
//           <p>
//             <span className="font-semibold">Description:</span>{" "}
//             {question.description}
//           </p>
//           <p>
//             <span className="font-semibold">Difficulty:</span>{" "}
//             {question.difficulty}
//           </p>
//           <p>
//             <span className="font-semibold">Type:</span> {question.type}
//           </p>
//           <p>
//             <span className="font-semibold">Points:</span> {question.points}
//           </p>
//           <p>
//             <span className="font-semibold">Status:</span>{" "}
//             <span
//               className={`inline-block px-2 py-1 rounded text-white text-sm ${
//                 question.status === "active"
//                   ? "bg-green-600"
//                   : "bg-gray-400"
//               }`}
//             >
//               {question.status}
//             </span>
//           </p>
//         </div>

//         {/* Options */}
//         <div className="mt-4">
//           <h3 className="font-bold mb-2">Options:</h3>
//           <ul className="grid gap-2">
//             {(["A", "B", "C", "D"] as const).map((key) => (
//               <li
//                 key={key}
//                 className={`px-4 py-2 rounded border flex justify-between items-center ${
//                   question.answer === key
//                     ? "bg-green-100 border-green-500"
//                     : "bg-gray-50 border-gray-300"
//                 }`}
//               >
//                 <span className="font-semibold">{key}:</span>
//                 <span className="ml-2">{question.options[key]}</span>
//                 {question.answer === key && (
//                   <FaCheckCircle className="text-green-500" />
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default QuestionsDetailsModal;







import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { QuestionListProps } from "../../../../../Interfaces/Question.interface";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface Props {
  question: QuestionListProps;
  isOpen: boolean;
  onClose: () => void;
}

const QuestionsDetailsModal = ({ question, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 dark:bg-white cursor-pointer hover:text-red-500 text-xl"
        >
          <MdClose />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
          <FaTimesCircle className="text-green-500 dark:text-white" />
          Question Details
        </h2>

        {/* Question Info */}
        <div className="space-y-3 text-left text-gray-700 dark:text-white text-sm break-words">
          <p>
            <span className=" capitalize font-bold">Title:</span> {question.title}
          </p>
          <p>
            <span className=" capitalize font-bold">Description:</span>{" "}
            {question.description}
          </p>
          <p>
            <span className=" capitalize font-bold">Difficulty:</span>{" "}
            {question.difficulty}
          </p>
          <p>
            <span className="capitalize font-bold">Type:</span> {question.type}
          </p>
          <p>
            <span className="capitalize font-bold">Points:</span> {question.points}
          </p>
          <p>
            <span className="capitalize font-bold">Status:</span>{" "}
            <span
              className={`inline-block px-2 py-1 rounded text-white text-sm ${
                question.status === "active"
                  ? "bg-green-600 dark:bg-amber-400"
                  : "bg-gray-400"
              }`}
            >
              {question.status}
            </span>
          </p>
        </div>

        {/* Options */}
        <div className="mt-5">
          <h3 className="font-bold mb-3 text-sm">Options:</h3>
          <ul className="grid gap-3 text-sm">
            {(["A", "B", "C", "D"] as const).map((key) => (
              <li
                key={key}
                className={`flex justify-between items-center border rounded px-4 py-2 ${
                  question.answer === key
                    ? "bg-green-100 border-green-500 dark:bg-amber-400"
                    : "bg-gray-50 border-gray-300 dark:bg-blue-500"
                }`}
              >
                <span className="font-semibold">{key}:</span>
                <span className="ml-2 flex-1 text-left">{question.options[key]}</span>
                {question.answer === key && (
                  <FaCheckCircle className="text-green-500 ml-2" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionsDetailsModal;




