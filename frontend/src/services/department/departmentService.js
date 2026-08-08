import api from "../api";

// ==========================================
// Get Department Statistics
// ==========================================
export const getDepartmentStats = async () => {
  const response = await api.get("/departments/stats");
  return response.data.data;
};

// ==========================================
// Get All Departments
// ==========================================
export const getAllDepartments = async () => {
  const response = await api.get("/departments");
  return response.data.data;
};

// ==========================================
// Get Department By ID
// ==========================================
export const getDepartmentById = async (id) => {
  const response = await api.get(`/departments/${id}`);
  return response.data.data;
};

// ==========================================
// Create Department
// ==========================================
export const createDepartment = async (data) => {
  const response = await api.post("/departments", data);
  return response.data.data;
};

// ==========================================
// Update Department
// ==========================================
export const updateDepartment = async (id, data) => {
  const response = await api.put(`/departments/${id}`, data);
  return response.data.data;
};

// ==========================================
// Delete Department
// ==========================================
export const deleteDepartment = async (id) => {
  const response = await api.delete(`/departments/${id}`);
  return response.data;
};