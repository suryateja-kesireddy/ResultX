import LoginForm from "../../components/auth/LoginForm";

function AdminLogin() {
  return (
    <LoginForm
      title="Admin Login"
      subtitle="Login using your Admin Email."
      fieldLabel="Email"
      fieldName="email"
      fieldPlaceholder="Enter Admin Email"
      role="ADMIN"
    />
  );
}

export default AdminLogin;