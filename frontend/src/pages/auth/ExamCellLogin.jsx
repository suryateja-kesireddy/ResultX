import LoginForm from "../../components/auth/LoginForm";

function ExamCellLogin() {
  return (
    <LoginForm
  title="Exam Cell Login"
  subtitle="Login using your Employee ID."
  fieldLabel="Employee ID"
  fieldName="employeeId"
  fieldPlaceholder="Enter Employee ID"
  role="EXAM_CELL"
/>
  );
}

export default ExamCellLogin;