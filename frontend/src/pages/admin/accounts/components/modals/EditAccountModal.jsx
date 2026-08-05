import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { updateAccount } from "../../../../../services/admin/accountService";

export default function EditAccountModal({
    account,
    onClose,
    onSuccess,
}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: true,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (account) {
            setFormData({
                name: account.name || "",
                email: account.email || "",
                phone: account.phone || "",
                status: account.status === true || account.status === "Active",
            });
        }
    }, [account]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStatus = (e) => {
        setFormData((prev) => ({
            ...prev,
            status: e.target.value === "true",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await updateAccount(account.id, formData);

            toast.success("Account updated successfully");

            if (typeof onSuccess === "function") {
                onSuccess();
            } else {
                onClose();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update account");
        } finally {
            setLoading(false);
        }
    };

    if (!account) return null;

    return (
        <div className="modal-overlay">

            <div className="edit-account-modal">

                <div className="modal-header">
                    <h2>Edit Account</h2>

                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="edit-grid">

                        <div className="form-group">
                            <label>Name</label>

                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>

                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>

                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Status</label>

                            <select
                                value={formData.status}
                                onChange={handleStatus}
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                        </div>

                    </div>

                    <div className="modal-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}