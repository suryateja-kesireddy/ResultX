import api from "../api";

// ==========================================
// Get Logged In Student Profile
// ==========================================
export const getStudentProfile = async () => {
  const response = await api.get("/students/profile");

  return response.data.data;
};