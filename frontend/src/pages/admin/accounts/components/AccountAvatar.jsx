export default function AccountAvatar({ name, email }) {
  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="account-user">
      <div className="account-avatar">
        {initials}
      </div>

      <div className="account-user-info">
        <h4>{name}</h4>
        <p>{email}</p>
      </div>
    </div>
  );
}