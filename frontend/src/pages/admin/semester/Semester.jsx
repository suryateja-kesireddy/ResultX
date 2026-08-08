import { useEffect, useState } from "react";

import SemesterStats from "./components/SemesterStats";
import SemesterFilters from "./components/SemesterFilters";
import SemesterTable from "./components/SemesterTable";
import CreateSemesterModal from "./components/CreateSemesterModal";

import "../../../styles/dashboard/admin/semester.css";

import {
  getSemesters,
} from "../../../services/semester/semesterService";

export default function Semester() {

  const [semesters, setSemesters] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    type: "",
    academicYear: "",
  });

  useEffect(() => {
    loadSemesters();
  }, []);

  const loadSemesters = async () => {

    try {

      const data = await getSemesters();

      setSemesters(data);

    } catch (error) {

      console.error("Failed to load semesters", error);

    }

  };

  const filteredSemesters = semesters.filter((semester) => {

    const matchesSearch =
      `Semester ${semester.number}`
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesType =
      filters.type === ""
        ? true
        : semester.type === filters.type;

    const matchesAcademicYear =
      filters.academicYear === ""
        ? true
        : semester.academicYear.year === filters.academicYear;

    return (
      matchesSearch &&
      matchesType &&
      matchesAcademicYear
    );

  });

  return (

    <div className="semester-page">

      {/* ==========================================
          HERO
      ========================================== */}

      <div className="semester-hero">

        <div className="semester-hero-content">

          <h1>Semester Management</h1>

          <p>
            Manage semesters for SRK Institute of Technology.
            Create, update and organize semesters
            for academic years, students and subjects.
          </p>

        </div>

        <button
          className="semester-add-btn"
          onClick={() => setOpenModal(true)}
        >
          + Add Semester
        </button>

      </div>

      {/* ==========================================
          STATISTICS
      ========================================== */}

      <SemesterStats
        semesters={semesters}
      />

      {/* ==========================================
          FILTERS
      ========================================== */}

      <SemesterFilters
        semesters={semesters}
        filters={filters}
        setFilters={setFilters}
      />

      {/* ==========================================
          TABLE
      ========================================== */}

      <SemesterTable
        semesters={filteredSemesters}
        onRefresh={loadSemesters}
      />

      {/* ==========================================
          CREATE MODAL
      ========================================== */}

      <CreateSemesterModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          loadSemesters();
          setOpenModal(false);
        }}
      />

    </div>

  );

}