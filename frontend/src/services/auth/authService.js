import api from "../api";

export const login = async (role, credentials) => {

  let endpoint = "";

  switch (role) {

    case "STUDENT":
      endpoint = "/auth/student/login";
      break;

    case "HOD":
      endpoint = "/auth/hod/login";
      break;

    case "EXAM_CELL":
      endpoint = "/auth/examcell/login";
      break;

    case "ADMIN":
      endpoint = "/auth/admin/login";
      break;

    default:
      throw new Error("Invalid Role");
  }

  const response = await api.post(endpoint, credentials);

  return response.data.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data.data;
};