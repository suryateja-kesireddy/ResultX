import api from "../api";

// ==========================================
// Get Logged In Exam Cell Profile
// ==========================================
export const getExamCellProfile = async () => {
  const response = await api.get("/examcell/profile");
  return response.data;
};

// ==========================================
// Dashboard Statistics
// ==========================================
export const getExamCellDashboard = async () => {
  const response = await api.get("/examcell/dashboard");
  return response.data;
};