export default function StudentAvatar({
  name,
  email,
}) {

  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (

    <div className="student-avatar">

      {/* Avatar */}

      <div className="student-avatar-circle">

        {initials}

      </div>

      {/* Student Details */}

      <div className="student-avatar-info">

        <h4>{name}</h4>

        <p>{email}</p>

      </div>

    </div>

  );

}