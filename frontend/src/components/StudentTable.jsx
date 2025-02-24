import React from "react";

const StudentTable = ({ students, handleViewDetails, handleUpdateStudent, openDeleteModal }) => {
  
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Avatar</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {student.name.charAt(0)}
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">{student.id}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-3">
                    <button 
                      className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                      onClick={() => handleViewDetails(student.id)}>
                      View
                    </button>
                    <button 
                      className="px-4 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100"
                      onClick={() => handleUpdateStudent(student.id)}>
                      Update
                    </button>
                    <button 
                      className="px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                      onClick={() => openDeleteModal(student.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
