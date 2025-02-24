import axios from "axios";

const API_URL = "http://localhost:3000/api/user"; // Updated with /api/user prefix

export const createStudent = async (studentData) => {
  const response = await axios.post(`${API_URL}/`, studentData);
  return response.data;
};

export const fetchStudents = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data.data;
};

export const getStudentDetails = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getStudentMarks = async (id) => {
  const response = await axios.get(`${API_URL}/getMarks/${id}`);
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await axios.put(`${API_URL}/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// for backend
export const addMarks = async (marksData) => {
  const response = await axios.post(`${API_URL}/add`, marksData);
  return response.data;
};