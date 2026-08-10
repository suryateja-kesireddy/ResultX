import { Link } from "react-router-dom";

function AuthLayout({
    title,
    subtitle,
    children,
}) {
    return (
        <section className="auth-page">

            <div className="auth-container">

                {/* Logo */}
                

                {/* Dynamic Login Title */}
                <h2 className="auth-title">
                    {title}
                </h2>

                {/* Subtitle */}
                <p className="auth-subtitle">
                    {subtitle}
                </p>

                {/* Existing Login Form */}
                {children}

                {/* Back */}
                <Link
                    to="/login"
                    className="back-home"
                >
                    ← Back to Home
                </Link>

            </div>

        </section>
    );
}

export default AuthLayout;