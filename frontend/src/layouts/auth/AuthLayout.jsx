function AuthLayout({
    title,
    subtitle,
    children,
}) {
    return (
        <section className="auth-page">

            <div className="auth-container">

                {/* Dynamic Login Title */}
                <h2 className="auth-title">
                    {title}
                </h2>

                {/* Subtitle */}
                <p className="auth-subtitle">
                    {subtitle}
                </p>

                {/* Login Form */}
                {children}

            </div>

        </section>
    );
}

export default AuthLayout;