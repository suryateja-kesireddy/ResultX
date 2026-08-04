import AccountRow from "./AccountRow";

export default function AccountTable({ accounts }) {
  return (
    <div className="account-table-container">
      <table className="account-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}