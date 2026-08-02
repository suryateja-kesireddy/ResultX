import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import Checkbox from "../ui/Checkbox";
import useAuth from "../../hooks/useAuth";
import { login } from "../../services/authService";

function LoginForm({
  title,
  subtitle,
  fieldLabel,
  fieldName,
  fieldPlaceholder,
  role,
}) {
  const auth = useAuth();
  const navigate = useNavigate();
  const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm({
  mode: "onBlur",
  defaultValues: {
    remember: false,
  },
});

  const onSubmit = async (data) => {
  try {
    const response = await login(role, data);

    auth.login(
      response.user,
      response.token,
      data.remember
    );

    toast.success(`Welcome ${response.user.name}!`);

    switch (response.user.role) {
      case "ADMIN":
        navigate("/ui/admin");
        break;

      case "STUDENT":
        navigate("/dashboard");
        break;

      case "HOD":
        navigate("/hod/dashboard");
        break;

      case "EXAM_CELL":
        navigate("/examcell/dashboard");
        break;

      default:
        navigate("/login");
    }

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Login Failed"
    );
  }
};
  return (
    <AuthLayout title={title} subtitle={subtitle}>
      <form
       autoComplete="off"
       onSubmit={handleSubmit(onSubmit)}>

        <Input
  label={fieldLabel}
  placeholder={fieldPlaceholder}
  autoComplete="off"
  error={errors[fieldName]}
  {...register(fieldName, {
    required: `${fieldLabel} is required`,
  })}
/>

        <PasswordInput
        autoComplete="new-password"
          label="Password"
          placeholder="Enter Password"
          error={errors.password}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <div className="checkbox-row">
  <Checkbox
    label="Remember Me"
    {...register("remember")}
  />

  <Link
    to="/forgot-password"
    className="forgot-link"
  >
    Forgot Password?
  </Link>
</div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

      </form>

      <p style={{ marginTop: "20px" }}>
        <Link to="/">← Back to Home</Link>
      </p>
    </AuthLayout>
  );
}

export default LoginForm;