import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="account-actions">

      <button className="view-btn">
        <Eye size={17} />
      </button>

      <button className="edit-btn">
        <Pencil size={17} />
      </button>

      <button className="delete-btn">
        <Trash2 size={17} />
      </button>

    </div>
  );
}