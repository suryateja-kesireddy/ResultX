import { TriangleAlert, X } from "lucide-react";
import toast from "react-hot-toast";

import { deleteAccount } from "../../../../../services/admin/accountService";

export default function DeleteAccountModal({
  account,
  onClose,
  onSuccess,
}) {

  const handleDelete = async () => {
    try {

      await deleteAccount(account.id);

      toast.success("Account deactivated successfully");

      onSuccess();

    } catch (error) {

      console.error(error);

      toast.error("Failed to deactivate account");

    }
  };

  if (!account) return null;

  return (
    <div className="modal-overlay">

      <div className="delete-account-modal">

        <div className="modal-header">

          <h2>Deactivate Account</h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>

        </div>

        <div className="delete-body">

          <div className="delete-icon">
            <TriangleAlert size={42} />
          </div>

          <h3>{account.name}</h3>

          <p className="delete-description">
            Are you sure you want to deactivate this account?
          </p>

          <div className="warning-box">

            <h4>What will happen?</h4>

            <ul>
              <li>User cannot log in.</li>
              <li>Academic records will remain safe.</li>
              <li>Results and marks are preserved.</li>
              <li>You can restore this account later.</li>
            </ul>

          </div>

        </div>

        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="deactivate-btn"
            onClick={handleDelete}
          >
            Deactivate Account
          </button>

        </div>

      </div>

    </div>
  );
}