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

  backgroundClass="hod-bg"
  portalTitle="👨‍🏫 HOD Portal"
  welcomeText="Manage department performance, approve results and monitor students through the ResultX dashboard."
/>
  );
}

export default HodLogin;