export default function FacultyAvatar({
  faculty,
}) {

  const initials = faculty.user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (

    <div className="faculty-avatar">

      <div className="faculty-avatar-circle">

        {initials}

      </div>

      <div className="faculty-avatar-info">

        <h4>

          {faculty.user.name}

        </h4>

        <p>

          {faculty.user.email}

        </p>

      </div>

    </div>

  );

}