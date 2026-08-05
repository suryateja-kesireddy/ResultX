import { useEffect, useState } from "react";

import { getAllSubjects } from "../../../../services/subject/subjectService";

import SubjectRow from "./SubjectRow";

export default function SubjectTable({
  selectedDepartment,
  search,
  semester,
}) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const data = await getAllSubjects();
      setSubjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredSubjects = subjects.filter((subject) => {

    const matchDepartment =
      selectedDepartment === "ALL" ||
      subject.department.code === selectedDepartment;

    const matchSearch =
      !search ||
      subject.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      subject.code
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchSemester =
      !semester ||
      subject.semester.number === Number(semester);

    return (
      matchDepartment &&
      matchSearch &&
      matchSemester
    );
  });

  return (
    <div className="student-table-wrapper">

      <table className="student-table">

        <thead>

          <tr>

            <th>Code</th>

            <th>Subject Name</th>

            <th>Department</th>

            <th>Semester</th>

            <th>Credits</th>

          </tr>

        </thead>

        <tbody>

          {filteredSubjects.length > 0 ? (

            filteredSubjects.map((subject) => (

              <SubjectRow
                key={subject.id}
                subject={subject}
              />

            ))

          ) : (

            <tr>

              <td colSpan="5">

                <div className="empty-table">

                  No Subjects Found

                </div>

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}