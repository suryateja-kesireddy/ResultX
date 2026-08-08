import { useState } from "react";
import {
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";

import EditSemesterModal from "./EditSemesterModal";
import DeleteSemesterModal from "./DeleteSemesterModal";

export default function SemesterTable({
  semesters,
  onRefresh,
}) {

  const [selectedSemester, setSelectedSemester] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  return (

    <div className="semester-table-card">

      {/* Header */}

      <div className="semester-table-header">

        <div>

          <h2>Semester List</h2>

          <p>

            Manage all semesters of SRK Institute of Technology.

          </p>

        </div>

      </div>

      {/* Table */}

      <div className="table-responsive">

        <table className="semester-table">

          <thead>

            <tr>

              <th>#</th>

              <th>Semester</th>

              <th>Type</th>

              <th>Academic Year</th>

              <th>Subjects</th>

              <th>Students</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {semesters.length === 0 ? (

              <tr>

                <td colSpan="7">

                  <div className="semester-empty">

                    <CalendarDays size={56} />

                    <h3>No Semesters Found</h3>

                    <p>

                      Create your first semester to get started.

                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              semesters.map((semester, index) => (

                <tr key={semester.id}>

                  <td>{index + 1}</td>

                  <td>

                    <div className="semester-name">

                      Semester {semester.number}

                    </div>

                  </td>

                  <td>

                    <span
                      className={
                        semester.type === "ODD"
                          ? "semester-odd"
                          : "semester-even"
                      }
                    >

                      <span className="semester-dot"></span>

                      {semester.type}

                    </span>

                  </td>

                  <td>

                    {semester.academicYear?.year}

                  </td>

                  <td>

                    {semester._count?.subjects ?? 0}

                  </td>

                  <td>

                    {semester._count?.students ?? 0}

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() => {

                            console.log(semester);

                          setSelectedSemester(semester);

                          setOpenEdit(true);

                        }}
                      >

                        <Pencil size={18} />

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => {

                          setSelectedSemester(semester);

                          setOpenDelete(true);

                        }}
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Edit */}

      <EditSemesterModal
        open={openEdit}
        semester={selectedSemester}
        onClose={() => setOpenEdit(false)}
        onSuccess={onRefresh}
      />

      {/* Delete */}

      <DeleteSemesterModal
        open={openDelete}
        semester={selectedSemester}
        onClose={() => setOpenDelete(false)}
        onSuccess={onRefresh}
      />

    </div>

  );

}