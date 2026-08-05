import { useState } from "react";

import SubjectStats from "./components/SubjectStats";
import SubjectFilters from "./components/SubjectFilters";
import SubjectTable from "./components/SubjectTable";

import "../../../styles/dashboard/admin/subject.css";

export default function Subjects() {

  const [selectedDepartment, setSelectedDepartment] =
    useState("ALL");

  const [search, setSearch] = useState("");

  const [semester, setSemester] = useState("");

  return (
    <div className="admin-page subject-page">

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