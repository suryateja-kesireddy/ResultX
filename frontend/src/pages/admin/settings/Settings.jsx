import { useEffect, useState } from "react";
import { User, Mail, Lock, Save } from "lucide-react";

import {
    getAdminProfile,
    updateAdminProfile,
    changeAdminPassword,
} from "../../../services/settings/settingsService";

import "../../../styles/dashboard/admin/settings.css";

const Settings = () => {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(true);
    const [savingProfile, setSavingProfile] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    /* ==========================================================
       LOAD ADMIN PROFILE
    ========================================================== */

    useEffect(() => {
        loadProfile();
    }, []);


    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAdminProfile();

            setProfile({
                name: data.name || "",
                email: data.email || "",
            });

        } catch (error) {

            console.error(
                "Failed to load admin profile:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "Failed to load admin profile"
            );

        } finally {

            setLoading(false);

        }
    };


    /* ==========================================================
       PROFILE CHANGE
    ========================================================== */

    const handleProfileChange = (e) => {

        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    /* ==========================================================
       PASSWORD CHANGE
    ========================================================== */

    const handlePasswordChange = (e) => {

        const { name, value } = e.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    /* ==========================================================
       UPDATE PROFILE
    ========================================================== */

    const handleProfileSubmit = async (e) => {

        e.preventDefault();

        try {

            setSavingProfile(true);
            setMessage("");
            setError("");

            const response =
                await updateAdminProfile(profile);

            setProfile({
                name: response.data.name,
                email: response.data.email,
            });

            setMessage(
                "Profile updated successfully."
            );

        } catch (error) {

            console.error(
                "Failed to update profile:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "Failed to update profile"
            );

        } finally {

            setSavingProfile(false);

        }
    };


    /* ==========================================================
       CHANGE PASSWORD
    ========================================================== */

    const handlePasswordSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (
            passwordData.newPassword !==
            passwordData.confirmPassword
        ) {

            setError(
                "New password and confirm password do not match."
            );

            return;
        }

        try {

            setChangingPassword(true);

            await changeAdminPassword({
                currentPassword:
                    passwordData.currentPassword,

                newPassword:
                    passwordData.newPassword,
            });

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setMessage(
                "Password changed successfully."
            );

        } catch (error) {

            console.error(
                "Failed to change password:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "Failed to change password"
            );

        } finally {

            setChangingPassword(false);

        }
    };


    /* ==========================================================
       LOADING
    ========================================================== */

    if (loading) {

        return (
            <div className="settings-page">

                <div className="settings-loading">
                    Loading settings...
                </div>

            </div>
        );

    }


    return (
        <div className="settings-page">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="settings-header">

                <div>

                    <h1>
                        Account Settings
                    </h1>

                    <p>
                        Manage your administrator
                        account details and password.
                    </p>

                </div>

            </div>


            {/* ==================================================
                MESSAGE
            ================================================== */}

            {message && (
                <div className="settings-success">
                    {message}
                </div>
            )}

            {error && (
                <div className="settings-error">
                    {error}
                </div>
            )}


            {/* ==================================================
                ADMIN DETAILS
            ================================================== */}

            <form
                className="settings-card"
                onSubmit={handleProfileSubmit}
            >

                <div className="settings-card-header">

                    <div className="settings-card-icon">
                        <User size={22} />
                    </div>

                    <div>

                        <h2>
                            Admin Details
                        </h2>

                        <p>
                            Update your basic account
                            information.
                        </p>

                    </div>

                </div>


                <div className="settings-grid">

                    {/* Name */}

                    <div className="settings-field">

                        <label>
                            Admin Name
                        </label>

                        <div className="settings-input">

                            <User size={18} />

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter admin name"
                                value={profile.name}
                                onChange={
                                    handleProfileChange
                                }
                                required
                            />

                        </div>

                    </div>


                    {/* Email */}

                    <div className="settings-field">

                        <label>
                            Email Address
                        </label>

                        <div className="settings-input">

                            <Mail size={18} />

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                value={profile.email}
                                onChange={
                                    handleProfileChange
                                }
                                required
                            />

                        </div>

                    </div>

                </div>


                <div className="settings-actions">

                    <button
                        type="submit"
                        className="settings-save-btn"
                        disabled={savingProfile}
                    >

                        <Save size={18} />

                        {savingProfile
                            ? "Saving..."
                            : "Save Changes"}

                    </button>

                </div>

            </form>


            {/* ==================================================
                CHANGE PASSWORD
            ================================================== */}

            <form
                className="settings-card"
                onSubmit={handlePasswordSubmit}
            >

                <div className="settings-card-header">

                    <div className="settings-card-icon">
                        <Lock size={22} />
                    </div>

                    <div>

                        <h2>
                            Change Password
                        </h2>

                        <p>
                            Update your administrator
                            password.
                        </p>

                    </div>

                </div>


                <div className="settings-grid">

                    {/* Current Password */}

                    <div className="settings-field">

                        <label>
                            Current Password
                        </label>

                        <div className="settings-input">

                            <Lock size={18} />

                            <input
                                type="password"
                                name="currentPassword"
                                placeholder="Enter current password"
                                value={
                                    passwordData.currentPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                                required
                            />

                        </div>

                    </div>


                    {/* New Password */}

                    <div className="settings-field">

                        <label>
                            New Password
                        </label>

                        <div className="settings-input">

                            <Lock size={18} />

                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Enter new password"
                                value={
                                    passwordData.newPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                                minLength={6}
                                required
                            />

                        </div>

                    </div>


                    {/* Confirm Password */}

                    <div className="settings-field">

                        <label>
                            Confirm Password
                        </label>

                        <div className="settings-input">

                            <Lock size={18} />

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={
                                    passwordData.confirmPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                                minLength={6}
                                required
                            />

                        </div>

                    </div>

                </div>


                <div className="settings-actions">

                    <button
                        type="submit"
                        className="settings-save-btn"
                        disabled={changingPassword}
                    >

                        <Lock size={18} />

                        {changingPassword
                            ? "Changing..."
                            : "Change Password"}

                    </button>

                </div>

            </form>

        </div>
    );
};

export default Settings;