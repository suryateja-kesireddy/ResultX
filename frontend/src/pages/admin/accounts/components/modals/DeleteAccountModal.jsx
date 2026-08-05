import { useState } from "react";
import { TriangleAlert, X } from "lucide-react";
import toast from "react-hot-toast";

import { deleteAccount } from "../../../../../services/admin/accountService";

export default function DeleteAccountModal({
  account,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteAccount(account.id);

      toast.success("Account deactivated successfully");

      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to deactivate account");
    } finally {
      setLoading(false);
    }
  };

  if (!account) return null;

  return (
    <div className="modal-overlay">

      <div className="delete-account-modal">

        {/* Header */}
        <div className="modal-header">

          <h2>Deactivate Account</h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>

        </div>

        {/* Body */}
        <div className="delete-body">

          <div className="delete-icon">
            <TriangleAlert size={42} />
          </div>

          <div className="delete-profile">

            <div className="delete-avatar">
              {account.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>

            <h3>{account.name}</h3>

            <span className="delete-role">
              {account.role.replace("_", " ")}
            </span>

          </div>

          <p className="delete-description">
            Are you sure you want to deactivate this account?
          </p>

          <div className="warning-box">

            <h4>What will happen?</h4>

            <ul>
              <li>✓ User will no longer be able to log in.</li>
              <li>✓ Academic records will be preserved.</li>
              <li>✓ Results, marks and history remain intact.</li>
              <li>✓ Account can be restored anytime.</li>
            </ul>

          </div>

        </div>

        {/* Footer */}
        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="deactivate-btn"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading
              ? "Deactivating..."
              : "Deactivate Account"}
          </button>

        </div>

      </div>

    </div>
  );
}