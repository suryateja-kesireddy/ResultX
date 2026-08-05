import api from "../api";

// ==========================================
// Get Subject Statistics
// ==========================================
export const getSubjectStats = async () => {
  const response = await api.get("/subjects/stats");
  return response.data.data;
};

// ==========================================
// Get All Subjects
// ==========================================
export const getAllSubjects = async () => {
  const response = await api.get("/subjects");
  return response.data.data;
};

// ==========================================
// Create Subject
// ==========================================
export const createSubject = async (data) => {
  const response = await api.post("/subjects", data);
  return response.data.data;
};

// ==========================================
// Get Subject By ID
// ==========================================
export const getSubjectById = async (id) => {
  const response = await api.get(`/subjects/${id}`);
  return response.data.data;
};

// ==========================================
// Update Subject
// ==========================================
export const updateSubject = async (id, data) => {
  const response = await api.put(`/subjects/${id}`, data);
  return response.data.data;
};

// ==========================================
// Delete Subject
// ==========================================
export const deleteSubject = async (id) => {
  const response = await api.delete(`/subjects/${id}`);
  return response.data;
};