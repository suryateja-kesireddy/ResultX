import api from "../api";

export const getHodProfile = async () => {
  const response = await api.get("/hods/profile");
  return response.data.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/hods/dashboard");
  return response.data.data;
};