require("dotenv").config({
    path: process.env.DOTENV_FILE || ".env",
});

const { Resend } = require("resend");

// ==========================================================
// RESEND EMAIL CLIENT
// ==========================================================

if (!process.env.RESEND_API_KEY) {
    throw new Error(
        "RESEND_API_KEY is missing from the environment"
    );
}

const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================================
// VERIFY EMAIL SERVICE CONFIGURATION
// ==========================================================

const verifyEmailConnection = async () => {
    try {
        if (!process.env.RESEND_API_KEY) {
            throw new Error(
                "RESEND_API_KEY is not configured"
            );
        }

        console.log("✅ ResultX Email Service Ready");
    } catch (error) {
        console.error(
            "❌ ResultX Email Service Configuration Failed:",
            error.message
        );
    }
};

// ==========================================================
// COMMON SEND EMAIL
// ==========================================================

const sendEmail = async ({
    to,
    subject,
    html,
}) => {
    try {
        console.log(
    "========== EMAIL URL DEBUG =========="
);

console.log(
    "FRONTEND_URL:",
    process.env.FRONTEND_URL
);

console.log(
    "NODE_ENV:",
    process.env.NODE_ENV
);

console.log(
    "======================================"
);
        const { data, error } = await resend.emails.send({
            from:
                process.env.EMAIL_FROM ||
                "onboarding@resend.dev",

            to: [to],

            subject,

            html,
        });

        if (error) {
            console.error(
                "❌ Failed to send email:",
                error.message
            );

            throw new Error(error.message);
        }

        console.log(
            "✅ Email sent successfully:",
            data?.id
        );

        return data;

    } catch (error) {
        console.error(
            "❌ Failed to send email:",
            error.message
        );

        throw error;
    }
};

// ==========================================================
// STUDENT ACCOUNT CREATED EMAIL
// ==========================================================

const sendStudentAccountCreatedEmail = async ({
    name,
    email,
    hallTicket,
    password,
}) => {

    await sendEmail({

        to: email,

        subject:
            "ResultX - Student Account Created Successfully",

        html: `

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        ResultX Student Account
    </title>

</head>

<body
    style="
        margin:0;
        padding:0;
        background:#f1f5f9;
        font-family:Arial,Helvetica,sans-serif;
    "
>

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#f1f5f9;
        padding:40px 15px;
    "
>

<tr>

<td align="center">

<table
    width="600"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        width:100%;
        max-width:600px;
        background:#ffffff;
        border-radius:16px;
        overflow:hidden;
        border:1px solid #e2e8f0;
    "
>

<!-- =====================================================
     HEADER
====================================================== -->

<tr>

<td
    style="
        padding:30px;
        text-align:center;
        background:#0f172a;
    "
>

<h1
    style="
        margin:0;
        color:#ffffff;
        font-size:30px;
        letter-spacing:-0.5px;
    "
>
    ResultX
</h1>

<p
    style="
        margin:8px 0 0;
        color:#cbd5e1;
        font-size:14px;
    "
>
    College Result Management System
</p>

</td>

</tr>

<!-- =====================================================
     CONTENT
====================================================== -->

<tr>

<td
    style="
        padding:35px 30px;
    "
>

<h2
    style="
        margin:0 0 18px;
        color:#0f172a;
        font-size:24px;
    "
>
    Account Created Successfully 🎉
</h2>

<p
    style="
        margin:0 0 15px;
        color:#334155;
        line-height:1.7;
        font-size:15px;
    "
>
    Hello <strong>${name}</strong>,
</p>

<p
    style="
        margin:0 0 20px;
        color:#475569;
        line-height:1.7;
        font-size:15px;
    "
>
    Your student account has been successfully
    created by the administrator of
    <strong>SRK Institute of Technology</strong>.
</p>

<!-- =====================================================
     LOGIN DETAILS
====================================================== -->

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        margin:25px 0;
        background:#f8fafc;
        border:1px solid #e2e8f0;
        border-radius:14px;
    "
>

<tr>

<td style="padding:24px;">

<h3
    style="
        margin:0 0 18px;
        color:#0f172a;
        font-size:18px;
    "
>
    Your Login Details
</h3>

<p
    style="
        margin:10px 0;
        color:#334155;
        font-size:14px;
    "
>
    <strong>Login Type:</strong>
    Student
</p>

<p
    style="
        margin:10px 0;
        color:#334155;
        font-size:14px;
    "
>
    <strong>Hall Ticket:</strong>
    ${hallTicket}
</p>

<p
    style="
        margin:10px 0;
        color:#334155;
        font-size:14px;
    "
>
    <strong>Password:</strong>
    ${password}
</p>

</td>

</tr>

</table>

<!-- =====================================================
     LOGIN BUTTON
====================================================== -->

<p
    style="
        margin:30px 0;
        text-align:center;
    "
>

<a
    href="${process.env.FRONTEND_URL || "#"}"
    style="
        display:inline-block;
        padding:14px 28px;
        background:#2563eb;
        color:#ffffff;
        text-decoration:none;
        border-radius:10px;
        font-weight:600;
        font-size:14px;
    "
>
    Open ResultX
</a>

</p>

<p
    style="
        margin:25px 0 0;
        color:#64748b;
        font-size:13px;
        line-height:1.6;
    "
>
    Please keep your login credentials secure.
    Do not share your password with anyone.
</p>

</td>

</tr>

<!-- =====================================================
     FOOTER
====================================================== -->

<tr>

<td
    style="
        padding:20px 30px;
        text-align:center;
        background:#f8fafc;
        border-top:1px solid #e2e8f0;
    "
>

<p
    style="
        margin:0;
        color:#64748b;
        font-size:12px;
    "
>
    © ${new Date().getFullYear()}
    ResultX · SRK Institute of Technology
</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>

        `,
    });
};

// ==========================================================
// HOD ACCOUNT CREATED EMAIL
// ==========================================================

const sendHODAccountCreatedEmail = async ({
    name,
    email,
    employeeId,
    password,
}) => {

    await sendEmail({

        to: email,

        subject:
            "ResultX - HOD Account Created Successfully",

        html: `

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        ResultX HOD Account
    </title>

</head>

<body
    style="
        margin:0;
        padding:0;
        background:#f1f5f9;
        font-family:Arial,Helvetica,sans-serif;
    "
>

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#f1f5f9;
        padding:40px 15px;
    "
>

<tr>

<td align="center">

<table
    width="600"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        width:100%;
        max-width:600px;
        background:#ffffff;
        border-radius:16px;
        overflow:hidden;
        border:1px solid #e2e8f0;
    "
>

<tr>

<td
    style="
        padding:30px;
        text-align:center;
        background:#0f172a;
    "
>

<h1
    style="
        margin:0;
        color:#ffffff;
        font-size:30px;
    "
>
    ResultX
</h1>

<p
    style="
        margin:8px 0 0;
        color:#cbd5e1;
        font-size:14px;
    "
>
    College Result Management System
</p>

</td>

</tr>

<tr>

<td
    style="
        padding:35px 30px;
    "
>

<h2
    style="
        margin:0 0 18px;
        color:#0f172a;
        font-size:24px;
    "
>
    HOD Account Created Successfully 🎉
</h2>

<p
    style="
        color:#334155;
        line-height:1.7;
        font-size:15px;
    "
>
    Hello <strong>${name}</strong>,
</p>

<p
    style="
        color:#475569;
        line-height:1.7;
        font-size:15px;
    "
>
    Your HOD account has been successfully
    created by the administrator of
    <strong>SRK Institute of Technology</strong>.
</p>

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        margin:25px 0;
        background:#f8fafc;
        border:1px solid #e2e8f0;
        border-radius:14px;
    "
>

<tr>

<td style="padding:24px;">

<h3
    style="
        margin:0 0 18px;
        color:#0f172a;
        font-size:18px;
    "
>
    Your Login Details
</h3>

<p
    style="
        margin:10px 0;
        color:#334155;
        font-size:14px;
    "
>
    <strong>Login Type:</strong>
    HOD
</p>

<p
    style="
        margin:10px 0;
        color:#334155;
        font-size:14px;
    "
>
    <strong>Employee ID:</strong>
    ${employeeId}
</p>

<p
    style="
        margin:10px 0;
        color:#334155;
        font-size:14px;
    "
>
    <strong>Password:</strong>
    ${password}
</p>

</td>

</tr>

</table>

<p
    style="
        margin:30px 0;
        text-align:center;
    "
>

<a
    href="${process.env.FRONTEND_URL || "#"}"
    style="
        display:inline-block;
        padding:14px 28px;
        background:#2563eb;
        color:#ffffff;
        text-decoration:none;
        border-radius:10px;
        font-weight:600;
        font-size:14px;
    "
>
    Open ResultX
</a>

</p>

<p
    style="
        margin-top:25px;
        color:#64748b;
        font-size:13px;
        line-height:1.6;
    "
>
    Please keep your login credentials secure.
</p>

</td>

</tr>

<tr>

<td
    style="
        padding:20px 30px;
        text-align:center;
        background:#f8fafc;
        border-top:1px solid #e2e8f0;
    "
>

<p
    style="
        margin:0;
        color:#64748b;
        font-size:12px;
    "
>
    © ${new Date().getFullYear()}
    ResultX · SRK Institute of Technology
</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>

        `,
    });
};

// ==========================================================
// FACULTY ACCOUNT CREATED EMAIL
// ==========================================================

const sendFacultyAccountCreatedEmail = async ({
    name,
    email,
    employeeId,
    password,
}) => {

    await sendEmail({

        to: email,

        subject:
            "ResultX - Faculty Account Created Successfully",

        html: `

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        ResultX Faculty Account
    </title>

</head>

<body
    style="
        margin:0;
        padding:0;
        background:#f1f5f9;
        font-family:Arial,Helvetica,sans-serif;
    "
>

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        background:#f1f5f9;
        padding:40px 15px;
    "
>

<tr>

<td align="center">

<table
    width="600"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        width:100%;
        max-width:600px;
        background:#ffffff;
        border-radius:16px;
        overflow:hidden;
        border:1px solid #e2e8f0;
    "
>

<tr>

<td
    style="
        padding:30px;
        text-align:center;
        background:#0f172a;
    "
>

<h1
    style="
        margin:0;
        color:#ffffff;
        font-size:30px;
    "
>
    ResultX
</h1>

<p
    style="
        margin:8px 0 0;
        color:#cbd5e1;
        font-size:14px;
    "
>
    College Result Management System
</p>

</td>

</tr>

<tr>

<td
    style="
        padding:35px 30px;
    "
>

<h2
    style="
        margin:0 0 18px;
        color:#0f172a;
        font-size:24px;
    "
>
    Faculty Account Created Successfully 🎉
</h2>

<p
    style="
        color:#334155;
        line-height:1.7;
        font-size:15px;
    "
>
    Hello <strong>${name}</strong>,
</p>

<p
    style="
        color:#475569;
        line-height:1.7;
        font-size:15px;
    "
>
    Your faculty account has been successfully
    created by the administrator of
    <strong>SRK Institute of Technology</strong>.
</p>

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="
        margin:25px 0;
        background:#f8fafc;
        border:1px solid #e2e8f0;
        border-radius:14px;
    "
>

<tr>

<td style="padding:24px;">

<h3
    style="
        margin:0 0 18px;
        color:#0f172a;
        font-size:18px;
    "
>
    Your Login Details
</h3>

<p
    style="
        margin:10px 0;
        color:#334155;
        font-size:14px;
    "
>
    <strong>Login Type:</strong>
    Faculty
</p>

<p
    style="
        margin:10px 0;
        color:#334155;
        font-size:14px;
    "
>
    <strong>Employee ID:</strong>
    ${employeeId}
</p>

<p
    style="
        margin:10px 0;
        color:#334155;
        font-size:14px;
    "
>
    <strong>Password:</strong>
    ${password}
</p>

</td>

</tr>

</table>

<p
    style="
        margin:30px 0;
        text-align:center;
    "
>

<a
    href="${process.env.FRONTEND_URL || "#"}"
    style="
        display:inline-block;
        padding:14px 28px;
        background:#2563eb;
        color:#ffffff;
        text-decoration:none;
        border-radius:10px;
        font-weight:600;
        font-size:14px;
    "
>
    Open ResultX
</a>

</p>

<p
    style="
        margin-top:25px;
        color:#64748b;
        font-size:13px;
        line-height:1.6;
    "
>
    Please keep your login credentials secure.
</p>

</td>

</tr>

<tr>

<td
    style="
        padding:20px 30px;
        text-align:center;
        background:#f8fafc;
        border-top:1px solid #e2e8f0;
    "
>

<p
    style="
        margin:0;
        color:#64748b;
        font-size:12px;
    "
>
    © ${new Date().getFullYear()}
    ResultX · SRK Institute of Technology
</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>

        `,
    });
};

// ==========================================================
// EXPORTS
// ==========================================================

module.exports = {
    resend,
    verifyEmailConnection,
    sendEmail,
    sendStudentAccountCreatedEmail,
    sendHODAccountCreatedEmail,
    sendFacultyAccountCreatedEmail,
};