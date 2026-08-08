import { useEffect, useState } from "react";

import AcademicYearStats from "./components/AcademicYearStats";
import AcademicYearFilters from "./components/AcademicYearFilters";
import AcademicYearTable from "./components/AcademicYearTable";
import CreateAcademicYearModal from "./components/CreateAcademicYearModal";

import "../../../styles/dashboard/admin/academic-year.css";

import {
  getAcademicYears,
} from "../../../services/academicYear/academicYearService";

export default function AcademicYears() {

  const [academicYears, setAcademicYears] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    current: "",
  });

  useEffect(() => {
    loadAcademicYears();
  }, []);

  const loadAcademicYears = async () => {
    try {
      const data = await getAcademicYears();
      setAcademicYears(data);
    } catch (error) {
      console.error("Failed to load Academic Years", error);
    }
  };

  const filteredAcademicYears = academicYears.filter((academicYear) => {

    const matchesSearch =
      academicYear.year
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesCurrent =
      filters.current === ""
        ? true
        : String(academicYear.isCurrent) === filters.current;

    return matchesSearch && matchesCurrent;

  });

  return (

    <div className="academic-year-page">

      {/* ==========================================
          HERO
      ========================================== */}

      <div className="academic-year-hero">

        <div className="academic-year-hero-content">

          <h1>Academic Year Management</h1>

          <p>
            Manage academic years for SRK Institute of Technology.
            Create, update and organize academic sessions efficiently
            for students, faculty and examination management.
          </p>

        </div>

        <button
          className="academic-year-add-btn"
          onClick={() => setOpenModal(true)}
        >
          + Add Academic Year
        </button>

      </div>

      {/* ==========================================
          STATISTICS
      ========================================== */}

      <AcademicYearStats
        academicYears={academicYears}
      />

      {/* ==========================================
          FILTERS
      ========================================== */}

      <AcademicYearFilters
        filters={filters}
        setFilters={setFilters}
      />

      {/* ==========================================
          TABLE
      ========================================== */}

      <AcademicYearTable
        academicYears={filteredAcademicYears}
        onRefresh={loadAcademicYears}
      />

      {/* ==========================================
          CREATE MODAL
      ========================================== */}

      <CreateAcademicYearModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          loadAcademicYears();
          setOpenModal(false);
        }}
      />

    </div>

  );

}