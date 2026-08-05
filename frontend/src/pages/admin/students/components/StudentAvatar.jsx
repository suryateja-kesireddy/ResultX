export default function StudentAvatar({
  name,
  email,
}) {
  return (
    <div className="student-avatar">
      <div className="student-avatar-circle">
        {name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
      </div>

      <div className="student-avatar-info">
        <h4>{name}</h4>
        <p>{email}</p>
      </div>
    </div>
  );
}