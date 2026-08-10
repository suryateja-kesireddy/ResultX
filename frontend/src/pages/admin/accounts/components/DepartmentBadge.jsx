export default function DepartmentBadge({ department }) {
    return (
        <span className="department-badge">
            {department?.code || "—"}
        </span>
    );
}