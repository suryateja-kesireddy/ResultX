import LoginForm from "../../components/auth/LoginForm";

function HodLogin() {
  return (
    <LoginForm
  title="HOD Login"
  subtitle="Login using your Employee ID."
  fieldLabel="Employee ID"
  fieldName="employeeId"
  fieldPlaceholder="Enter Employee ID"
  role="HOD"
/>
  );
}

export default HodLogin;