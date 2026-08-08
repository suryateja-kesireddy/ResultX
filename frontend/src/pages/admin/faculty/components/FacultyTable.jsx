import { useEffect, useMemo, useState } from "react";

import { getAllFaculty } from "../../../../services/faculty/facultyService";

import FacultyRow from "./FacultyRow";

export default function FacultyTable({
  search,
  department,
  onEdit,
  onDelete,
}) {

  const [faculties, setFaculties] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {

      const data = await getAllFaculty();

      setFaculties(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const filteredFaculty = useMemo(() => {

    return faculties.filter((faculty) => {

      const matchesSearch =

        faculty.user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        faculty.employeeId
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        faculty.user.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        !department ||
        faculty.department.id === department.id;

      return matchesSearch && matchesDepartment;

    });

  }, [faculties, search, department]);

  if (loading) {

    return (
      <div className="faculty-empty">
        Loading Faculty...
      </div>
    );

  }

  if (filteredFaculty.length === 0) {

    return (
      <div className="faculty-empty">
        No Faculty Found
      </div>
    );

  }

  return (

    <div className="faculty-table-wrapper">

      <table className="faculty-table">

        <thead>

          <tr>

            <th>Faculty</th>

            <th>Employee ID</th>

            <th>Department</th>

            <th>Qualification</th>

            <th>Experience</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredFaculty.map((faculty) => (

            <FacultyRow
              key={faculty.id}
              faculty={faculty}
              onEdit={onEdit}
              onDelete={onDelete}
            />

          ))}

        </tbody>

      </table>

    </div>

  );

}