import { useEffect, useState } from "react";

import { getAllHODs } from "../../../../services/hod/hodService";

import HODRow from "./HODRow";

export default function HODTable({
  selectedDepartment,
  search,
  refreshKey,
  onEdit,
  onDelete,
}) {
  const [hods, setHODs] = useState([]);

  // ==========================================
  // Load HODs
  // ==========================================
  useEffect(() => {
    loadHODs();
  }, [refreshKey]);

  const loadHODs = async () => {
    try {
      const data = await getAllHODs();

      setHODs(data || []);
    } catch (error) {
      console.error(
        "Failed to load HODs:",
        error
      );
    }
  };

  // ==========================================
  // Filter HODs
  // ==========================================
  const filteredHODs = hods.filter((hod) => {

    const matchDepartment =
      selectedDepartment === "ALL" ||
      hod.department?.code ===
        selectedDepartment;

    const searchValue =
      search?.toLowerCase().trim() || "";

    const matchSearch =
      !searchValue ||
      hod.employeeId
        ?.toLowerCase()
        .includes(searchValue) ||
      hod.user?.name
        ?.toLowerCase()
        .includes(searchValue) ||
      hod.user?.email
        ?.toLowerCase()
        .includes(searchValue);

    return (
      matchDepartment &&
      matchSearch
    );
  });

  return (
    <div className="hod-table-wrapper">

      <table className="student-table">

        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredHODs.length > 0 ? (

            filteredHODs.map((hod) => (

              <HODRow
                key={hod.id}
                hod={hod}
                onEdit={onEdit}
                onDelete={onDelete}
              />

            ))

          ) : (

            <tr>
              <td colSpan="6">

                <div className="empty-table">
                  No HODs Found
                </div>

              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}