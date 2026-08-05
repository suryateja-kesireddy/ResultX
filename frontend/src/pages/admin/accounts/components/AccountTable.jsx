import AccountRow from "./AccountRow";

export default function AccountTable({ 
  accounts,
  onView,
  onEdit,
  onDelete
 }) {
  return (
    <div className="account-table-wrapper">
      <table className="account-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}