import { useState } from "react";

import SubjectStats from "./components/SubjectStats";
import SubjectFilters from "./components/SubjectFilters";
import SubjectTable from "./components/SubjectTable";
import CreateSubjectModal from "./components/CreateSubjectModal";

import "../../../styles/dashboard/admin/subject.css";

export default function Subjects() {
    // ==========================================================
    // STATE
    // ==========================================================

    const [selectedDepartment, setSelectedDepartment] =
        useState("ALL");

    const [search, setSearch] = useState("");

    const [semester, setSemester] = useState("");

    const [showCreateModal, setShowCreateModal] =
        useState(false);

    // ==========================================================
    // OPEN CREATE SUBJECT MODAL
    // ==========================================================

    const handleOpenCreateModal = () => {
        if (showCreateModal) {
            return;
        }

        setShowCreateModal(true);
    };

    // ==========================================================
    // CLOSE CREATE SUBJECT MODAL
    // ==========================================================

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };

    // ==========================================================
    // SUBJECT CREATED SUCCESSFULLY
    // ==========================================================

    const handleSubjectCreated = () => {
        /*
         * SubjectTable can be refreshed here later
         * when its refresh functionality is connected.
         */
    };

    // ==========================================================
    // RENDER
    // ==========================================================

    return (
        <div className="subject-page">

            {/* ==================================================
                SUBJECT HEADER
            ================================================== */}

            <div className="subject-page-header">

                <div className="subject-page-header-content">

                    <h1>
                        Subject Management
                    </h1>

                    <p>
                        Manage subjects, credits,
                        departments and semester-wise
                        academic information of
                        SRK Institute of Technology.
                    </p>

                </div>

                <button
                    type="button"
                    className="subject-add-btn"
                    onClick={handleOpenCreateModal}
                >
                    Add Subject
                </button>

            </div>

            {/* ==================================================
                SUBJECT STATISTICS
            ================================================== */}

            <SubjectStats
                selectedDepartment={selectedDepartment}
                onDepartmentChange={setSelectedDepartment}
            />

            {/* ==================================================
                SUBJECT FILTERS
            ================================================== */}

            <SubjectFilters
                search={search}
                setSearch={setSearch}
                semester={semester}
                setSemester={setSemester}
            />

            {/* ==================================================
                SUBJECT TABLE
            ================================================== */}

            <SubjectTable
                selectedDepartment={selectedDepartment}
                search={search}
                semester={semester}
            />

            {/* ==================================================
                CREATE SUBJECT MODAL
            ================================================== */}

            <CreateSubjectModal
                open={showCreateModal}
                onClose={handleCloseCreateModal}
                onSuccess={handleSubjectCreated}
            />

        </div>
    );
}