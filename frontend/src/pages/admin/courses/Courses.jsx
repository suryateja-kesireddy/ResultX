import { useState } from "react";

import CourseStats from "./components/CourseStats";
import CourseDetails from "./components/CourseDetails";
import CreateCourseModal from "./components/CreateCourseModal";
import EditCourseModal from "./components/EditCourseModal";
import DeleteCourseModal from "./components/DeleteCourseModal";

import "../../../styles/dashboard/admin/course.css";

export default function Courses() {

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  const [editModalOpen, setEditModalOpen] =
    useState(false);
  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  return (
    <div className="course-page">

      {/* ==================================================
                HERO SECTION
            ================================================== */}

      <div className="course-hero">

        <div className="course-header">

          {/* Hero Content */}

          <div className="course-header-content">

            <h1>
              Course Management
            </h1>

            <p>
              Manage all courses in your college
            </p>

          </div>


          {/* Add Course */}

          <button
            type="button"
            className="course-add-btn"
            onClick={() =>
              setOpenModal(true)
            }
          >
            + Add Course
          </button>

        </div>

      </div>


      {/* ==================================================
                COURSE STATISTICS
            ================================================== */}

      <CourseStats
        selectedCourse={selectedCourse}
        onCourseChange={setSelectedCourse}
      />


      {/* ==================================================
                COURSE DETAILS
            ================================================== */}

      {selectedCourse && (
        <CourseDetails
          course={selectedCourse}
          onEdit={() => setEditModalOpen(true)}
          onDelete={() => setDeleteModalOpen(true)}
        />
      )}


      {/* ==================================================
                CREATE COURSE MODAL
            ================================================== */}

      <CreateCourseModal
        open={openModal}

        onClose={() =>
          setOpenModal(false)
        }

        onSuccess={() =>
          window.location.reload()
        }
      />


      {/* ==================================================
                EDIT COURSE MODAL
            ================================================== */}

      <EditCourseModal
        open={editModalOpen}

        course={selectedCourse}

        onClose={() =>
          setEditModalOpen(false)
        }

        onSuccess={() =>
          window.location.reload()
        }
      />
      <DeleteCourseModal
        open={deleteModalOpen}
        course={selectedCourse}
        onClose={() => setDeleteModalOpen(false)}
        onSuccess={() => {
          setSelectedCourse(null);
          window.location.reload();
        }}
      />

    </div>
  );
}