import { useState } from "react";

import DepartmentStats from "./components/DepartmentStats";
import DepartmentDetails from "./components/DepartmentDetails";
import CreateDepartmentModal from "./components/CreateDepartmentModal";
import EditDepartmentModal from "./components/EditDepartmentModal";
import DeleteDepartmentModal from "./components/DeleteDepartmentModal";

import "../../../styles/dashboard/admin/department.css";


export default function Departments() {

    const [selectedDepartment, setSelectedDepartment] =
        useState(null);

    const [openModal, setOpenModal] =
        useState(false);

    const [editModalOpen, setEditModalOpen] =
        useState(false);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);


    return (

        <div className="department-page">


            {/* =========================================
                HERO
            ========================================= */}

            <div className="department-header">

                <div>

                    <h1>
                        Department Management
                    </h1>

                    <p>
                        Manage all departments in your college
                    </p>

                </div>


                <button
                    type="button"
                    className="department-add-btn"
                    onClick={() =>
                        setOpenModal(true)
                    }
                >
                    + Add Department
                </button>

            </div>


            {/* =========================================
                DEPARTMENT CARDS
            ========================================= */}

            <DepartmentStats
                selectedDepartment={
                    selectedDepartment
                }
                onDepartmentChange={
                    setSelectedDepartment
                }
            />


            {/* =========================================
                DEPARTMENT DETAILS
            ========================================= */}

            {selectedDepartment &&
                selectedDepartment !== "ALL" && (

                    <DepartmentDetails
                        department={
                            selectedDepartment
                        }

                        onEdit={() =>
                            setEditModalOpen(true)
                        }

                        onDelete={() =>
                            setDeleteModalOpen(true)
                        }
                    />

                )}


            {/* =========================================
                CREATE
            ========================================= */}

            <CreateDepartmentModal

                open={openModal}

                onClose={() =>
                    setOpenModal(false)
                }

                onSuccess={() =>
                    window.location.reload()
                }

            />


            {/* =========================================
                EDIT
            ========================================= */}

            <EditDepartmentModal

                open={editModalOpen}

                department={
                    selectedDepartment
                }

                onClose={() =>
                    setEditModalOpen(false)
                }

                onSuccess={() =>
                    window.location.reload()
                }

            />


            {/* =========================================
                DELETE
            ========================================= */}

            <DeleteDepartmentModal

                open={deleteModalOpen}

                department={
                    selectedDepartment
                }

                onClose={() =>
                    setDeleteModalOpen(false)
                }

                onSuccess={() =>
                    window.location.reload()
                }

            />

        </div>

    );

}