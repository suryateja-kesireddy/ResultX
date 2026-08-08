import api from "../api";


/* ==========================================================
   GET CURRENT ADMIN
========================================================== */

export const getAdminProfile = async () => {
    const response = await api.get("/auth/me");

    return response.data.data;
};


/* ==========================================================
   UPDATE ADMIN PROFILE
========================================================== */

export const updateAdminProfile = async (data) => {
    const response = await api.put(
        "/auth/profile",
        {
            name: data.name,
            email: data.email,
        }
    );

    return response.data;
};


/* ==========================================================
   CHANGE ADMIN PASSWORD
========================================================== */

export const changeAdminPassword = async (data) => {
    const response = await api.put(
        "/auth/password",
        {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        }
    );

    return response.data;
};