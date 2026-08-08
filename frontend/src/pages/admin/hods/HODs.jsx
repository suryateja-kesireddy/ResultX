import { useState } from "react";

import HODStats from "./components/HODStats";
import HODFilters from "./components/HODFilters";
import HODTable from "./components/HODTable";

import CreateHODModal from "./components/CreateHODModal";
import EditHODModal from "./components/EditHODModal";
import DeleteHODModal from "./components/DeleteHODModal";

import "../../../styles/dashboard/admin/hod.css";

export default function HODs() {

    // ==========================================
    // Department Filter
    // ==========================================

    const [selectedDepartment, setSelectedDepartment] =
        useState("ALL");


    // ==========================================
    // Search
    // ==========================================

    const [search, setSearch] =
        useState("");


    // ==========================================
    // Create Modal
    // ==========================================

    const [showCreateModal, setShowCreateModal] =
        useState(false);


    // ==========================================
    // Edit Modal
    // ==========================================

    const [showEditModal, setShowEditModal] =
        useState(false);


    // ==========================================
    // Delete Modal
    // ==========================================

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);


    // ==========================================
    // Selected HOD
    // ==========================================

    const [selectedHOD, setSelectedHOD] =
        useState(null);


    // ==========================================
    // Refresh Table
    // ==========================================

    const [refreshKey, setRefreshKey] =
        useState(0);


    // ==========================================
    // Open Create Modal
    // ==========================================

    const handleOpenCreate = () => {

        console.log(
            "ADD HOD BUTTON CLICKED"
        );

        setShowCreateModal(true);
    };


    // ==========================================
    // Create Success
    // ==========================================

    const handleCreateSuccess = () => {

        console.log(
            "HOD CREATED SUCCESSFULLY"
        );

        setRefreshKey(
            (prev) => prev + 1
        );

        setShowCreateModal(false);
    };


    // ==========================================
    // Open Edit Modal
    // ==========================================

    const handleEdit = (hod) => {

        setSelectedHOD(hod);

        setShowEditModal(true);
    };


    // ==========================================
    // Edit Success
    // ==========================================

    const handleEditSuccess = () => {

        setRefreshKey(
            (prev) => prev + 1
        );

        setShowEditModal(false);

        setSelectedHOD(null);
    };


    // ==========================================
    // Open Delete Modal
    // ==========================================

    const handleDelete = (hod) => {

        setSelectedHOD(hod);

        setShowDeleteModal(true);
    };


    // ==========================================
    // Delete Success
    // ==========================================

    const handleDeleteSuccess = () => {

        setRefreshKey(
            (prev) => prev + 1
        );

        setShowDeleteModal(false);

        setSelectedHOD(null);
    };


    // ==========================================
    // PAGE
    // ==========================================

    return (
        <div className="hod-page">


            {/* ==================================
                HERO
            ================================== */}

            <div className="hod-hero">

                <div className="hod-hero-content">

                    <h1>
                        HOD Management
                    </h1>

                    <p>
                        Manage Heads of Departments,
                        department assignments,
                        contact information and
                        academic responsibilities
                        of SRK Institute of Technology.
                    </p>

                </div>


                <button
                    type="button"
                    className="hod-add-btn"
                    onClick={handleOpenCreate}
                >
                    + Add HOD
                </button>

            </div>


            {/* ==================================
                STATS
            ================================== */}

            <HODStats
                selectedDepartment={
                    selectedDepartment
                }
                onDepartmentChange={
                    setSelectedDepartment
                }
                refreshKey={refreshKey}
            />


            {/* ==================================
                FILTERS
            ================================== */}

            <HODFilters
                search={search}
                setSearch={setSearch}
            />


            {/* ==================================
                TABLE
            ================================== */}

            <HODTable
                selectedDepartment={
                    selectedDepartment
                }
                search={search}
                refreshKey={refreshKey}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />


            {/* ==================================
                CREATE HOD MODAL
            ================================== */}

            <CreateHODModal
                open={showCreateModal}
                onClose={() => {
                    setShowCreateModal(false);
                }}
                onSuccess={
                    handleCreateSuccess
                }
            />


            {/* ==================================
                EDIT HOD MODAL
            ================================== */}

            <EditHODModal
                open={showEditModal}
                hod={selectedHOD}
                onClose={() => {

                    setShowEditModal(false);

                    setSelectedHOD(null);

                }}
                onSuccess={
                    handleEditSuccess
                }
            />


            {/* ==================================
                DELETE HOD MODAL
            ================================== */}

            <DeleteHODModal
                open={showDeleteModal}
                hod={selectedHOD}
                onClose={() => {

                    setShowDeleteModal(false);

                    setSelectedHOD(null);

                }}
                onSuccess={
                    handleDeleteSuccess
                }
            />

        </div>
    );
}