import LoginForm from "../../components/auth/LoginForm";

function StudentLogin() {
  return (
    <LoginForm
      title="Student Login"
      subtitle="Enter your Hall Ticket Number and password."
      fieldLabel="Hall Ticket Number"
      fieldName="hallTicket"
      fieldPlaceholder="Enter Hall Ticket Number"
      role="STUDENT"
    />
  );
}

export default StudentLogin;