import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface QuizInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  instructions: string[];
}

export default function QuizzInstructions({
  isOpen,
  onClose,
  onStart,
  instructions,
}: QuizInstructionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          Quiz Instructions
        </h2>

        {/* Instructions List */}
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>

        {/* Start Button */}
        <div className="mt-6 text-end">
          <button
            onClick={onStart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            Start Quiz
          </button>
        </div>
      </motion.div>
    </div>
  );
}
