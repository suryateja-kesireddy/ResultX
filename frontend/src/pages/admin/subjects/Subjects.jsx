import { useState } from "react";

import SubjectStats from "./components/SubjectStats";
import SubjectFilters from "./components/SubjectFilters";
import SubjectTable from "./components/SubjectTable";
import CreateSubjectModal from "./components/CreateSubjectModal";

import "../../../styles/dashboard/admin/subject.css";

export default function Subjects() {
    const [selectedDepartment, setSelectedDepartment] =
        useState("ALL");

    const [search, setSearch] = useState("");
    const [semester, setSemester] = useState("");

    return (
        <div className="subject-page">

            {/* Subject Header */}
            <div className="subject-page-header">

                <div className="subject-page-header-content">
                    <h1>Subject Management</h1>

                    <p>
                        Manage subjects, credits, departments
                        and semester-wise academic information
                        of SRK Institute of Technology.
                    </p>
                </div>

                <button className="subject-add-btn">
                    + Add Subject
                </button>

            </div>

            <SubjectStats
                selectedDepartment={selectedDepartment}
                onDepartmentChange={setSelectedDepartment}
            />

            <SubjectFilters
                search={search}
                setSearch={setSearch}
                semester={semester}
                setSemester={setSemester}
            />

            <SubjectTable
                selectedDepartment={selectedDepartment}
                search={search}
                semester={semester}
            />

        </div>
    );
}
