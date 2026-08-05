import { Eye, Pencil, Trash2 } from "lucide-react";


export default function ActionButtons({
  account,
  onView,
  onEdit,
  onDelete
}) {
  return (
    <div className="account-actions">

      <button onClick={() => onView(account.id)}>
        <Eye size={18} />
      </button>

      <button className="edit-btn" onClick={() => onEdit(account.id)}>
        <Pencil size={17} />
      </button>

      <button className="delete-btn" onClick={() => onDelete(account.id)}>
        <Trash2 size={17} />
      </button>

    </div>
  );
}