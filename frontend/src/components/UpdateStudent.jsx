import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentDetails, updateStudent } from "../services/api";
import { toast } from "react-toastify";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentDetails(id);
        if (response.data) {
          setFormData({
            name: response.data.name || "",
            email: response.data.email || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load student details.");
      }
    };
    fetchStudent();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await updateStudent(id, formData);
      toast.success("Student updated successfully!");
      navigate("/"); // Redirect to Home
    } catch (error) {
      toast.error("Failed to update student.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Student</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsModalOpen(true); // Open the modal on form submission
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Update Student
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm text-center">
            <ExclamationTriangleIcon className="w-14 h-14 mx-auto text-green-600" />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Are you sure?</h3>
            <p className="text-gray-600 mt-2">
              You are about to update the student details. Do you want to proceed?
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-200"
                onClick={() => {
                  handleSubmit();
                  setIsModalOpen(false); // Close the modal after submission
                }}
              >
                Yes, Update
              </button>
              <button
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
                onClick={() => setIsModalOpen(false)} // Close modal without submitting
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateStudent;
