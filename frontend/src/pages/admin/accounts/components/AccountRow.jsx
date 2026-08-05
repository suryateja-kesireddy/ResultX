import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";
import AccountAvatar from "./AccountAvatar";
import RoleBadge from "./RoleBadge";
import DepartmentBadge from "./DepartmentBadge";

export default function AccountRow({
  account,
  onView,
  onEdit,
  onDelete
}) {
  return (
    <tr>
      <td>
        <AccountAvatar
          name={account.name}
          email={account.email}
        />
      </td>
      <td>{account.phone || "-"}</td>
      <td>
        <DepartmentBadge department={account.department} />
      </td>
      <td>
        <RoleBadge role={account.role} />
      </td>

      <td>
        <StatusBadge status={account.status} />
      </td>

      <td>
        <ActionButtons
          account={account}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}