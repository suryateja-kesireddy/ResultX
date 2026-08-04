import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";

export default function AccountRow({ account }) {
  return (
    <tr>
      <td>{account.name}</td>
      <td>{account.email}</td>
      <td>{account.phone || "-"}</td>
      <td>{account.department}</td>
      <td>{account.role}</td>

      <td>
        <StatusBadge status={account.status} />
      </td>

      <td>
        <ActionButtons account={account} />
      </td>
    </tr>
  );
}