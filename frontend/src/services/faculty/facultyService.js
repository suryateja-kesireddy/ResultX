import api from "../api";

// ==========================================
// Faculty Statistics
// ==========================================
export const getFacultyStats = async () => {
  const response = await api.get("/faculty/stats");
  return response.data.data;
};

// ==========================================
// Get All Faculty
// ==========================================
export const getAllFaculty = async () => {
  const response = await api.get("/faculty");
  return response.data.data;
};

// ==========================================
// Get Faculty By ID
// ==========================================
export const getFacultyById = async (id) => {
  const response = await api.get(`/faculty/${id}`);
  return response.data.data;
};

// ==========================================
// Create Faculty
// ==========================================
export const createFaculty = async (data) => {
  const response = await api.post("/faculty", data);
  return response.data.data;
};

// ==========================================
// Update Faculty
// ==========================================
export const updateFaculty = async (id, data) => {
  const response = await api.put(`/faculty/${id}`, data);
  return response.data.data;
};

// ==========================================
// Delete Faculty
// ==========================================
export const deleteFaculty = async (id) => {
  const response = await api.delete(`/faculty/${id}`);
  return response.data;
};