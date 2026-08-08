import api from "../api";

// ==========================================
// Get HOD Statistics
// ==========================================
export const getHODStats = async () => {
    const response = await api.get("/hods/stats");

    return response.data.data;
};

// ==========================================
// Get HOD Dashboard Statistics
// ==========================================
export const getDashboardStats = async () => {
    const response = await api.get(
        "/hods/dashboard/stats"
    );

    return response.data.data;
};

// ==========================================
// Get Logged In HOD Profile
// ==========================================
export const getHodProfile = async () => {
    const response = await api.get(
        "/hods/profile"
    );

    return response.data.data;
};

// ==========================================
// Get All HODs
// ==========================================
export const getAllHODs = async () => {
    const response = await api.get("/hods");

    return response.data.data;
};

// ==========================================
// Create HOD
// ==========================================
export const createHOD = async (data) => {
    const response = await api.post(
        "/hods",
        data
    );

    return response.data.data;
};

// ==========================================
// Get HOD By ID
// ==========================================
export const getHODById = async (id) => {
    const response = await api.get(
        `/hods/${id}`
    );

    return response.data.data;
};

// ==========================================
// Update HOD
// ==========================================
export const updateHOD = async (id, data) => {
    const response = await api.put(
        `/hods/${id}`,
        data
    );

    return response.data.data;
};

// ==========================================
// Delete HOD
// ==========================================
export const deleteHOD = async (id) => {
    const response = await api.delete(
        `/hods/${id}`
    );

    return response.data;
};