import { useState } from "react";
import {
    Pencil,
    Trash2,
} from "lucide-react";

import EditSubjectModal from "./EditSubjectModal";
import DeleteSubjectModal from "./DeleteSubjectModal";

export default function SubjectRow({
    subject,
    index,
    onRefresh,
}) {

    const [openEdit, setOpenEdit] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            <tr>

                {/* ================= # ================= */}

                <td>
                    {index + 1}
                </td>

                {/* ================= CODE ================= */}

                <td>
                    <span className="subject-code">
                        {subject.code}
                    </span>
                </td>

                {/* ================= NAME ================= */}

                <td>
                    <strong>
                        {subject.name}
                    </strong>
                </td>

                {/* ================= DEPARTMENT ================= */}

                <td>
                    <span className="subject-department-badge">
                        {subject.department?.code || "-"}
                    </span>
                </td>

                {/* ================= SEMESTER ================= */}

                <td>
                    <span className="subject-semester-badge">
                        {subject.semester?.number
                            ? `Semester ${subject.semester.number}`
                            : "-"}
                    </span>
                </td>

                {/* ================= CREDITS ================= */}

                <td>
                    <span className="subject-credit">
                        {subject.credits}
                    </span>
                </td>

                {/* ================= ACTIONS ================= */}

                <td>

                    <div className="subject-action-buttons">

                        {/* EDIT */}

                        <button
                            type="button"
                            className="subject-edit-btn"
                            onClick={() => setOpenEdit(true)}
                            title="Edit Subject"
                        >
                            <Pencil size={18} />
                        </button>

                        {/* DELETE */}

                        <button
                            type="button"
                            className="subject-delete-btn"
                            onClick={() => setOpenDelete(true)}
                            title="Delete Subject"
                        >
                            <Trash2 size={18} />
                        </button>

                    </div>

                </td>

            </tr>

            {/* ================= EDIT MODAL ================= */}

            <EditSubjectModal
                open={openEdit}
                subject={subject}
                onClose={() => setOpenEdit(false)}
                onSuccess={onRefresh}
            />

            {/* ================= DELETE MODAL ================= */}

            <DeleteSubjectModal
                open={openDelete}
                subject={subject}
                onClose={() => setOpenDelete(false)}
                onSuccess={onRefresh}
            />

        </>
    );
}