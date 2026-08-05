import { X } from "lucide-react";

export default function ViewAccountModal({
  account,
  onClose,
}) {
  if (!account) return null;
  console.log("ViewAccountModal rendered", account);

  return (
    <div className="modal-overlay">
      <div className="view-account-modal">

        <div className="modal-header">
          <h2>Account Details</h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="view-account-body">

          <div className="profile-avatar">
            {account.name
              ?.split(" ")
              .map((i) => i[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div className="profile-grid">

            <div>
              <label>Name</label>
              <p>{account.name}</p>
            </div>

            <div>
              <label>Email</label>
              <p>{account.email}</p>
            </div>

            <div>
              <label>Phone</label>
              <p>{account.phone || "-"}</p>
            </div>

            <div>
              <label>Role</label>
              <p>{account.role}</p>
            </div>

            <div>
              <label>Department</label>
              <p>{account.department || "-"}</p>
            </div>

            <div>
              <label>Status</label>
              <p>{account.status ? "Active" : "Inactive"}</p>
            </div>

            {account.hallTicket && (
              <div>
                <label>Hall Ticket</label>
                <p>{account.hallTicket}</p>
              </div>
            )}

            {account.employeeId && (
              <div>
                <label>Employee ID</label>
                <p>{account.employeeId}</p>
              </div>
            )}

            {account.semester && (
              <div>
                <label>Semester</label>
                <p>{account.semester}</p>
              </div>
            )}

            {account.section && (
              <div>
                <label>Section</label>
                <p>{account.section}</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}