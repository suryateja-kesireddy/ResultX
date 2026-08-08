import {
    Pencil,
    Trash2,
} from "lucide-react";

export default function HODRow({
    hod,
    onEdit,
    onDelete,
}) {
    return (
        <tr>

            {/* ==================================================
                EMPLOYEE ID
            ================================================== */}

            <td>
                {hod.employeeId || "-"}
            </td>


            {/* ==================================================
                NAME
            ================================================== */}

            <td>
                {hod.user?.name || "-"}
            </td>


            {/* ==================================================
                DEPARTMENT
            ================================================== */}

            <td>

                <span className="hod-department-badge">
                    {hod.department?.code || "-"}
                </span>

            </td>


            {/* ==================================================
                PHONE
            ================================================== */}

            <td>
                {hod.phone || "-"}
            </td>


            {/* ==================================================
                EMAIL
            ================================================== */}

            <td>
                {hod.user?.email || "-"}
            </td>


            {/* ==================================================
                ACTIONS
            ================================================== */}

            <td>

                <div className="hod-action-buttons">

                    {/* EDIT */}

                    <button
                        type="button"
                        className="hod-edit-btn"
                        onClick={() =>
                            onEdit(hod)
                        }
                        title="Edit HOD"
                        aria-label="Edit HOD"
                    >
                        <Pencil size={17} />
                    </button>


                    {/* DELETE */}

                    <button
                        type="button"
                        className="hod-delete-btn"
                        onClick={() =>
                            onDelete(hod)
                        }
                        title="Delete HOD"
                        aria-label="Delete HOD"
                    >
                        <Trash2 size={17} />
                    </button>

                </div>

            </td>

        </tr>
    );
}