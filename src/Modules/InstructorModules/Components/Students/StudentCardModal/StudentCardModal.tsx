import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaUser, FaUsers, FaTimes, FaUserTag } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { StudentListWithGroupsProps } from "../../../../../Interfaces/Student.interface";

interface Props {
  open: boolean;
  onClose: () => void;
  student: StudentListWithGroupsProps | null;
}

const StudentCardModal: FC<Props> = ({ open, onClose, student }) => {
  return (
    <AnimatePresence>
      {open && student && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
            >
              <FaTimes />
            </button>

            {/* Card Content */}
            <div className="flex flex-col gap-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <FaUser /> {student.first_name} {student.last_name}
                </h2>
                <p className="text-sm text-gray-500 capitalize">
                  <FaUserTag className="inline mr-1" />
                  {student.role} - {student.status}
                </p>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-amber-600" /> {student.email}
                </p>
                <p className="flex items-center gap-2">
                  <MdGroup className="text-amber-600" />
                  Group: <strong>{student.group.name}</strong>
                </p>
                <p className="flex items-center gap-2">
                  <FaUsers className="text-amber-600" />
                  Members: {student.group.students.length} / {student.group.max_students}
                </p>
                <p className="text-xs text-gray-400">
                  Created at: {new Date(student.group.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StudentCardModal;
