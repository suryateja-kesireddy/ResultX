import api from "../api";

// ==========================================
// Get Student Statistics
// ==========================================
export const getStudentStats = async () => {
    const response = await api.get("/students/stats");

    return response.data.data;
};


// ==========================================
// Get Students
// ==========================================
export const getStudents = async (filters = {}) => {

    const params = new URLSearchParams();

    if (filters.search) {
        params.append("search", filters.search);
    }

    if (filters.department) {
        params.append("department", filters.department);
    }

    if (filters.semester) {
        params.append("semester", filters.semester);
    }

    if (filters.status) {
        params.append("status", filters.status);
    }

    const response = await api.get(
        `/students?${params.toString()}`
    );

    return response.data.data;
};


// ==========================================
// Get Student By ID
// ==========================================
export const getStudentById = async (id) => {

    const response = await api.get(
        `/students/${id}`
    );

    return response.data.data;
};


// ==========================================
// Get Logged-In Student Profile
// ==========================================
// ==========================================
// Get Logged-In Student Profile
// ==========================================
export const getStudentProfile = async () => {
    const response = await api.get("/students/profile");

    return response.data.data;
};

// ==========================================
// Create Student
// ==========================================
export const createStudent = async (data) => {

    const response = await api.post(
        "/students",
        data
    );

    return response.data.data;
};


// ==========================================
// Update Student
// ==========================================
export const updateStudent = async (id, data) => {

    const response = await api.put(
        `/students/${id}`,
        data
    );

    return response.data.data;
};


// ==========================================
// Delete Student
// ==========================================
export const deleteStudent = async (id) => {

    const response = await api.delete(
        `/students/${id}`
    );

    return response.data;
};