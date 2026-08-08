import { useState } from "react";

import FacultyStats from "./components/FacultyStats";
import FacultyFilters from "./components/FacultyFilters";
import FacultyTable from "./components/FacultyTable";
import CreateFacultyModal from "./components/CreateFacultyModal";
import EditFacultyModal from "./components/EditFacultyModal";
import DeleteFacultyModal from "./components/DeleteFacultyModal";

import "../../../styles/dashboard/admin/faculty.css";

export default function Faculty() {

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedFaculty, setSelectedFaculty] = useState(null);

  return (
    <div className="faculty-page">

      {/* Header */}

      <div className="faculty-header">

        <div>

          <h1>Faculty Management</h1>

          <p>
            Manage all faculty members in your college
          </p>

        </div>

        <button
          className="faculty-add-btn"
          onClick={() => setCreateOpen(true)}
        >
          + Add Faculty
        </button>

      </div>

      {/* Statistics */}

      <FacultyStats
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
      />

      {/* Filters */}

      <FacultyFilters
        search={search}
        setSearch={setSearch}
      />

      {/* Table */}

      <FacultyTable
        search={search}
        department={selectedDepartment}
        onEdit={(faculty) => {
          setSelectedFaculty(faculty);
          setEditOpen(true);
        }}
        onDelete={(faculty) => {
          setSelectedFaculty(faculty);
          setDeleteOpen(true);
        }}
      />

      {/* Create */}

      <CreateFacultyModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={() => window.location.reload()}
      />

      {/* Edit */}

      <EditFacultyModal
        open={editOpen}
        faculty={selectedFaculty}
        onClose={() => setEditOpen(false)}
        onSuccess={() => window.location.reload()}
      />

      {/* Delete */}

      <DeleteFacultyModal
        open={deleteOpen}
        faculty={selectedFaculty}
        onClose={() => setDeleteOpen(false)}
        onSuccess={() => window.location.reload()}
      />

    </div>
  );
}