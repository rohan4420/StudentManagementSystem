import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createStudent } from "../services/api";

const CreateStudent = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent(formData);
      toast.success("✅ Student created successfully!");
      setFormData({ name: "", email: "" });
      onClose();
    } catch (error) {
      console.error("Error creating student:", error);
      toast.error("❌ Failed to create student.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 mt-25 p-4">
      {/* Animated Modal */}
      <motion.div
        initial={{ y: "-10%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-10%", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Create Student</h2>
          <button
            className="text-gray-500 hover:text-red-500 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none transition"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateStudent;
