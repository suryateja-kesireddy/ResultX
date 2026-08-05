import api from "../api";

// ==========================================
// Get Account Statistics
// ==========================================
export const getAccountStats = async () => {
  const response = await api.get("/accounts/stats");
  return response.data.data;
};


// ==========================================
// Get Accounts
// ==========================================
export const getAccounts = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.role) {
    params.append("role", filters.role);
  }

  if (filters.department) {
    params.append("department", filters.department);
  }

  if (filters.status) {
    params.append("status", filters.status);
  }

  const response = await api.get(
    `/accounts?${params.toString()}`
  );

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