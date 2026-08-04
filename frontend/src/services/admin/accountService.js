import api from "../api";

// ==========================================
// Get Account Statistics
// ==========================================
export const getAccountStats = async () => {
  const response = await api.get("/accounts/stats");
  return response.data.data;
};

// ==========================================
// Get All Accounts
// ==========================================
export const getAccounts = async () => {
  const response = await api.get("/accounts");
  return response.data.data;
};

// ==========================================
// Get Single Account
// ==========================================
export const getAccountById = async (id) => {
  const response = await api.get(`/accounts/${id}`);
  return response.data.data;
};

// ==========================================
// Create Account
// ==========================================
export const createAccount = async (accountData) => {
  const response = await api.post("/accounts", accountData);
  return response.data.data;
};

// ==========================================
// Update Account
// ==========================================
export const updateAccount = async (id, accountData) => {
  const response = await api.put(`/accounts/${id}`, accountData);
  return response.data.data;
};

// ==========================================
// Delete Account
// ==========================================
export const deleteAccount = async (id) => {
  const response = await api.delete(`/accounts/${id}`);
  return response.data;
};