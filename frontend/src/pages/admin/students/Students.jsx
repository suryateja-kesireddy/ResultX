import { useEffect, useState } from "react";

import StudentStats from "./components/StudentStats";
import StudentFilters from "./components/StudentFilters";
import StudentTable from "./components/StudentTable";

import { getStudents } from "../../../services/student/studentService";

export default function Students() {

  const [students, setStudents] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    semester: "",
    status: "",
  });

  useEffect(() => {
    loadStudents();
  }, [filters]);

  const loadStudents = async () => {
    try {
      const data = await getStudents(filters);

      setStudents(data);
    } catch (error) {
      console.error("Failed to load students:", error);
    }
  };

  return (
    <>
      <StudentStats
        onDepartmentClick={(department) =>
          setFilters((prev) => ({
            ...prev,
            department,
          }))
        }
      />

      <StudentFilters
        filters={filters}
        setFilters={setFilters}
      />

      <StudentTable
        students={students}
      />
    </>
  );
}