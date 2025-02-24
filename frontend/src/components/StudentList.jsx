import React, { useEffect, useState } from "react";
import { fetchStudents, deleteStudent, getStudentMarks } from "../services/api";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
import DeleteModal from "./DeleteModal";
import StudentTable from "./StudentTable";
import StudentDetails from "./StudentDetails";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [studentMarks, setStudentMarks] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    getStudents();
  }, []);

  const handleUpdateStudent = (id) => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    setFilteredStudents(
      students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, students]);

  const openDeleteModal = (id) => {
    setStudentToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await deleteStudent(studentToDelete);
      const updatedStudents = students.filter((student) => student.id !== studentToDelete);
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
      toast.error("❌ Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    } finally {
      setShowDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await getStudentMarks(id);
      setStudentMarks(response.data);
      const student = students.find((s) => s.id === id);
      setSelectedStudent(student);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching student marks:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">
        Student List
      </h2>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <StudentTable
          students={filteredStudents}
          handleViewDetails={handleViewDetails}
          openDeleteModal={openDeleteModal}
          handleUpdateStudent={handleUpdateStudent}
        />
      </div>

      <DeleteModal
        showModal={showDeleteModal}
        confirmDeleteStudent={confirmDeleteStudent}
        cancelDelete={cancelDelete}
      />

      <StudentDetails
        show={showDetailsModal}
        student={selectedStudent}
        marks={studentMarks}
        onClose={() => setShowDetailsModal(false)}
      />
    </div>
  );
};

export default StudentList;
