import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateStudent from "./components/CreateStudent";
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import UpdateStudent from "./components/UpdateStudent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <Router>
      {/* ✅ Navbar */}
      <nav className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">
            <Link to="/">Student Management</Link>
          </h1>
          <div className="space-x-4">
            <Link to="/" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition">
              Home
            </Link>
            <button
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Add Student
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Modal for Create Student */}
      <CreateStudent isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

      {/* ✅ Main Content */}
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </div>

      {/* ✅ Toast Messages */}
      <ToastContainer
  position="top-center"
  autoClose={3000}
  style={{ marginTop: "25px" }} 
/>

    </Router>
  );
};

export default App;
