import { useState } from "react";
import { Pencil, Trash2, CalendarDays } from "lucide-react";

import EditAcademicYearModal from "./EditAcademicYearModal";
import DeleteAcademicYearModal from "./DeleteAcademicYearModal";

export default function AcademicYearTable({
  academicYears,
  onRefresh,
}) {

  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  return (

    <div className="academic-table-card">

      <div className="academic-table-header">

        <div>

          <h2>Academic Years</h2>

          <p>
            Manage all academic years for SRK Institute of Technology.
          </p>

        </div>

      </div>

      <div className="table-responsive">

        <table className="academic-table">

          <thead>

            <tr>

              <th>#</th>

              <th>Academic Year</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {academicYears.length === 0 ? (

              <tr>

                <td colSpan="4">

                  <div className="academic-empty">

                    <CalendarDays size={52} />

                    <h3>No Academic Years Found</h3>

                    <p>
                      Click "Add Academic Year" to create your first record.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              academicYears.map((academicYear, index) => (

                <tr key={academicYear.id}>

                  <td>{index + 1}</td>

                  <td>

                    <div className="academic-year-name">

                      {academicYear.year}

                    </div>

                  </td>

                  <td>

                    {academicYear.isCurrent ? (

                      <span className="status-active">

                        <span className="status-dot"></span>

                        Current

                      </span>

                    ) : (

                      <span className="status-inactive">

                        <span className="status-dot"></span>

                        Inactive

                      </span>

                    )}

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() => {
                          setSelectedAcademicYear(academicYear);
                          setOpenEdit(true);
                        }}
                      >

                        <Pencil size={18} />

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => {
                          setSelectedAcademicYear(academicYear);
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

      <EditAcademicYearModal
        open={openEdit}
        academicYear={selectedAcademicYear}
        onClose={() => setOpenEdit(false)}
        onSuccess={onRefresh}
      />

      <DeleteAcademicYearModal
        open={openDelete}
        academicYear={selectedAcademicYear}
        onClose={() => setOpenDelete(false)}
        onSuccess={onRefresh}
      />

    </div>

  );

}