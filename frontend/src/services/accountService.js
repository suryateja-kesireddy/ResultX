import api from "./api";

export const createAccount = async (accountData) => {
  const response = await api.post("/accounts", accountData);
  return response.data;
};
