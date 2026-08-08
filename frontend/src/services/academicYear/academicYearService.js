import api from "../api";

/* ===============================
   Get All Academic Years
=============================== */

export const getAcademicYears = async () => {

  const response = await api.get("/academicyears");

  return response.data.data;

};

/* ===============================
   Get Academic Year By ID
=============================== */

export const getAcademicYearById = async (id) => {

  const response = await api.get(`/academicyears/${id}`);

  return response.data.data;

};

/* ===============================
   Create Academic Year
=============================== */

export const createAcademicYear = async (academicYearData) => {

  const response = await api.post(
    "/academicyears",
    academicYearData
  );

  return response.data.data;

};

/* ===============================
   Update Academic Year
=============================== */

export const updateAcademicYear = async (
  id,
  academicYearData
) => {

  const response = await api.put(
    `/academicyears/${id}`,
    academicYearData
  );

  return response.data.data;

};

/* ===============================
   Delete Academic Year
=============================== */

export const deleteAcademicYear = async (id) => {

  const response = await api.delete(
    `/academicyears/${id}`
  );

  return response.data;

};