import { FaCheckCircle, FaCopy } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { GroupInfo, QuizDetails } from "../../../../../Interfaces/quizz.interface";
import { axiosInstance } from "../../../../../Services/axiosInstance";
import { GROUP } from "../../../../../Services/endPoint";
import { sendQuizEmails } from "../../../../../Services/EmailJs";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { FaSpinner } from "react-icons/fa6";

interface QuizSuccessModalProps {
  quizz: QuizDetails;
  message?: string;
  onClose: () => void;
}

export default function QuizSuccessModal({
  quizz,
  message = "Quiz created successfully!",
  onClose,
}: QuizSuccessModalProps) {
  const [copied, setCopied] = useState(false);
const [isSending, setIsSending] = useState(false);


  const fetchGroupInfo = useCallback(async (groupId: string): Promise<GroupInfo | null> => {
    try {
      const res = await axiosInstance.get(GROUP.GET_BY_ID(groupId));
      return res.data;
    } catch (error) {
      console.error("Error fetching group info:", error);
      return null;
    }
  }, []);

        



const handleSendEmails = async () => {
  if (!quizz?.group) return;

  setIsSending(true); 
  try {
    const group = await fetchGroupInfo(quizz.group);
    if (!group || !Array.isArray(group.students)) {
      toast.error("Failed to fetch students");
      return;
    } 


    await sendQuizEmails({
    students: group.students.map((s) => ({
    email: s.email,
    first_name: s.first_name,
    last_name: s.last_name
  })),
      quizCode: quizz.code,
      scheduleTime: format(new Date(quizz.schadule), "yyyy-MM-dd HH:mm:ss"),
    });

    toast.success("Emails sent successfully!");
  } catch (err) {
    console.error("Error sending emails:", err);
  } finally {
    setIsSending(false); // ✅ stop loading
  }
};







  const handleCopy = () => {
    navigator.clipboard.writeText(quizz.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white max-w-md w-full rounded-2xl shadow-xl p-6 relative dark:bg-gray-900"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          <MdClose />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-4xl" />
        </div>

        {/* Message */}
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {message}
        </h2>

        {/* Quiz Code */}
        <div className="mt-4 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
          <span className="text-lg font-mono text-gray-800 dark:text-white">{quizz.code}</span>
          <button onClick={handleCopy} className="ml-2 text-gray-600 hover:text-blue-600 dark:text-gray-300">
            <FaCopy />
          </button>
        </div>

        {/* Copied Tooltip */}
        {copied && (
          <p className="text-sm text-green-600 text-center mt-2 transition-opacity duration-200">
            Copied to clipboard!
          </p>
        )}

        {/* Send Email Button */}
        <button
  onClick={handleSendEmails}
  disabled={isSending}
  className={`mt-6 w-full flex items-center justify-center gap-2 ${
    isSending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
  } text-white py-2 rounded-md transition-colors`}
>
  {isSending ? (
    <>
      <FaSpinner className="animate-spin" />
      Sending...
    </>
  ) : (
    "Send Email to Students"
  )}
</button>

      </motion.div>
    </div>
  );
}




