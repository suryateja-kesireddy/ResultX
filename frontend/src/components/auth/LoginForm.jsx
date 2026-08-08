import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import AuthLayout from "../../layouts/auth/AuthLayout";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";

import useAuth from "../../hooks/auth/useAuth";
import { login } from "../../services/auth/authService";

function LoginForm({
  title,
  subtitle,
  fieldLabel,
  fieldName,
  fieldPlaceholder,
  role,

  backgroundClass,
  portalTitle,
  welcomeText,
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
  <AuthLayout
    title={title}
    subtitle={subtitle}
    backgroundClass={backgroundClass}
    portalTitle={portalTitle}
    welcomeText={welcomeText}
  >
    <form
      className="auth-form"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        label="Password"
        placeholder="Enter Password"
        autoComplete="new-password"
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
          className="forgot-password"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        className="auth-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  </AuthLayout>
);
}

export default LoginForm;