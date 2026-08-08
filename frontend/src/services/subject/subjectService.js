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
// Supports:
// semesterId
// departmentId
// ==========================================
export const getAllSubjects = async (filters = {}) => {

  const params = new URLSearchParams();

  if (filters.semesterId) {
    params.append(
      "semesterId",
      filters.semesterId
    );
  }

  if (filters.departmentId) {
    params.append(
      "departmentId",
      filters.departmentId
    );
  }

  const queryString = params.toString();

  const response = await api.get(
    queryString
      ? `/subjects?${queryString}`
      : "/subjects"
  );

  return response.data.data;
};


// ==========================================
// Create Subject
// ==========================================
export const createSubject = async (data) => {

  const response = await api.post(
    "/subjects",
    data
  );

  return response.data.data;
};


// ==========================================
// Get Subject By ID
// ==========================================
export const getSubjectById = async (id) => {

  const response = await api.get(
    `/subjects/${id}`
  );

  return response.data.data;
};


// ==========================================
// Update Subject
// ==========================================
export const updateSubject = async (
  id,
  data
) => {

  const response = await api.put(
    `/subjects/${id}`,
    data
  );

  return response.data.data;
};


// ==========================================
// Delete Subject
// ==========================================
export const deleteSubject = async (id) => {

  const response = await api.delete(
    `/subjects/${id}`
  );

  return response.data;
};