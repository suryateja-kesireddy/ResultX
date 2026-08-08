import api from "../api";

/* ==========================================
   Get All Semesters
========================================== */

export const getSemesters = async () => {

  const response = await api.get("/semester");

  return response.data.data;

};

/* ==========================================
   Get Semester Statistics
========================================== */

export const getSemesterStats = async () => {

  const response = await api.get("/semester/stats");

  return response.data.data;

};

/* ==========================================
   Get Semester By ID
========================================== */

export const getSemesterById = async (id) => {

  const response = await api.get(`/semester/${id}`);

  return response.data.data;

};

/* ==========================================
   Create Semester
========================================== */

export const createSemester = async (data) => {

  const response = await api.post(
    "/semester",
    data
  );

  return response.data.data;

};

/* ==========================================
   Update Semester
========================================== */

export const updateSemester = async (
  id,
  data
) => {

  const response = await api.put(
    `/semester/${id}`,
    data
  );

  return response.data.data;

};

/* ==========================================
   Delete Semester
========================================== */

export const deleteSemester = async (id) => {

  const response = await api.delete(
    `/semester/${id}`
  );

  return response.data;

};