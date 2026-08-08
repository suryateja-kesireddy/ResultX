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

  backgroundClass="exam-bg"
  portalTitle="🏢 Exam Cell"
  welcomeText="Publish results, manage examinations and maintain academic records efficiently."
/>
  );
}

export default ExamCellLogin;