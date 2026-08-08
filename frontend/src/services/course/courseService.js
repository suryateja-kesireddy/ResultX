import api from "../api";

// ==========================================
// Get Course Statistics
// ==========================================
export const getCourseStats = async () => {
  const response = await api.get("/courses/stats");
  return response.data.data;
};

// ==========================================
// Get All Courses
// ==========================================
export const getAllCourses = async () => {
  const response = await api.get("/courses");
  return response.data.data;
};

// ==========================================
// Get Course By ID
// ==========================================
export const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return response.data.data;
};

// ==========================================
// Create Course
// ==========================================
export const createCourse = async (data) => {
  const response = await api.post("/courses", data);
  return response.data.data;
};

// ==========================================
// Update Course
// ==========================================
export const updateCourse = async (id, data) => {
  const response = await api.put(`/courses/${id}`, data);
  return response.data.data;
};

// ==========================================
// Delete Course
// ==========================================
export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};