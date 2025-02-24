import React, { useEffect } from "react";
import { motion } from "framer-motion";

const StudentDetails = ({ show, student, marks, onClose }) => {
  useEffect(() => {
    console.log("Student Details Opened", student);
    console.log("Marks Data:", marks);
  }, [student, marks]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white p-6 rounded-xl shadow-lg w-96 max-w-lg pointer-events-auto border border-gray-300"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {student?.name}'s Marks
          </h2>
          <button
            className="text-gray-500 hover:text-red-600 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Marks Data */}
        {Array.isArray(marks) && marks.length > 0 ? (
          <div className="space-y-3">
            {marks.map((mark, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
              >
                <span className="font-medium text-gray-800">
                  {mark.subject}
                </span>
                <span className="text-gray-600">{mark.score}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 font-medium">
            No marks added yet.
          </p>
        )}

        {/* Back Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDetails;
