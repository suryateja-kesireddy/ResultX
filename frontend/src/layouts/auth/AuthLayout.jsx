import { Link } from "react-router-dom";


function AuthLayout({
  title,
  subtitle,
  backgroundClass,
  portalTitle,
  welcomeText,
  children,
}) {
  return (
    <section className={`auth-page ${backgroundClass}`}>

      <div className="auth-overlay"></div>

      <div className="auth-wrapper">

        <div className="auth-left">

          <div className="portal-badge">
            {portalTitle}
          </div>

          <h1 className="welcome-title">
            Welcome Back
          </h1>

          <p className="welcome-text">
            {welcomeText}
          </p>

        </div>

        <div className="login-area">

          <div className="login-content">

            <h1 className="auth-logo">
              ResultX
            </h1>

            <h2 className="auth-title">
              {title}
            </h2>

            <p className="auth-subtitle">
              {subtitle}
            </p>

            {children}

            <Link
              to="/login"
              className="back-home"
            >
              ← Back to Portal
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AuthLayout;