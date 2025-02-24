import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const DeleteModal = ({ showModal, confirmDeleteStudent, cancelDelete }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm text-center">
        <ExclamationTriangleIcon className="w-14 h-14 mx-auto text-red-600" />
        <h3 className="text-xl font-semibold text-gray-800 mt-4">Are you sure?</h3>
        <p className="text-gray-600 mt-2">
          This action cannot be undone. Do you really want to delete this student?
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-200"
            onClick={confirmDeleteStudent}
          >
            Yes, Delete
          </button>
          <button
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
            onClick={cancelDelete}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
