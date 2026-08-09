const nodemailer = require("nodemailer");


// ==========================================================
// SMTP TRANSPORTER
// ==========================================================

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },

    family: 4,

    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
});

// ==========================================================
// VERIFY EMAIL CONNECTION
// ==========================================================

const verifyEmailConnection = async () => {
    try {
        await transporter.verify();

        console.log(
            "✅ ResultX Email Service Connected"
        );
    } catch (error) {
        console.error(
            "❌ ResultX Email Service Connection Failed:",
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
        const info = await transporter.sendMail({
            from:
                process.env.SMTP_FROM ||
                process.env.SMTP_USER,

            to,
            subject,
            html,
        });

        console.log(
            "✅ Email sent successfully:",
            info.messageId
        );

        return info;
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
    style="
        width:100%;
        max-width:600px;
        background:#ffffff;
        border-radius:18px;
        overflow:hidden;
        border:1px solid #e2e8f0;
    "
>

<tr>

<td
    style="
        padding:32px;
        text-align:center;
        background:
            linear-gradient(
                135deg,
                #2563eb,
                #4f46e5
            );
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
        color:#dbeafe;
        font-size:14px;
    "
>
    College Result Management System
</p>

</td>

</tr>


<tr>

<td style="padding:35px 30px;">

<h2
    style="
        margin:0 0 18px;
        color:#0f172a;
    "
>
    Account Created Successfully 🎉
</h2>

<p
    style="
        color:#334155;
        line-height:1.7;
    "
>
    Hello <strong>${name}</strong>,
</p>

<p
    style="
        color:#475569;
        line-height:1.7;
    "
>
    Your student account has been successfully
    created by the administrator of
    <strong>SRK Institute of Technology</strong>.
</p>


<div
    style="
        margin:25px 0;
        padding:22px;
        background:#f8fafc;
        border:1px solid #e2e8f0;
        border-radius:14px;
    "
>

<h3
    style="
        margin:0 0 18px;
        color:#0f172a;
    "
>
    Your Login Details
</h3>

<p>
    <strong>Login Type:</strong>
    Student
</p>

<p>
    <strong>Hall Ticket:</strong>
    ${hallTicket}
</p>

<p>
    <strong>Password:</strong>
    ${password}
</p>

</div>


<a
    href="${process.env.FRONTEND_URL || "#"}"
    style="
        display:inline-block;
        padding:13px 25px;
        background:#2563eb;
        color:#ffffff;
        text-decoration:none;
        border-radius:10px;
        font-weight:600;
    "
>
    Open ResultX
</a>


<p
    style="
        margin-top:25px;
        color:#64748b;
        font-size:13px;
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
    style="
        width:100%;
        max-width:600px;
        background:#ffffff;
        border-radius:18px;
        overflow:hidden;
        border:1px solid #e2e8f0;
    "
>

<tr>

<td
    style="
        padding:32px;
        text-align:center;
        background:
            linear-gradient(
                135deg,
                #2563eb,
                #4f46e5
            );
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
        color:#dbeafe;
        font-size:14px;
    "
>
    College Result Management System
</p>

</td>

</tr>


<tr>

<td style="padding:35px 30px;">

<h2
    style="
        margin:0 0 18px;
        color:#0f172a;
    "
>
    HOD Account Created Successfully 🎉
</h2>

<p
    style="
        color:#334155;
        line-height:1.7;
    "
>
    Hello <strong>${name}</strong>,
</p>

<p
    style="
        color:#475569;
        line-height:1.7;
    "
>
    Your Head of Department account has been
    successfully created by the administrator.
</p>


<div
    style="
        margin:25px 0;
        padding:22px;
        background:#f8fafc;
        border:1px solid #e2e8f0;
        border-radius:14px;
    "
>

<h3
    style="
        margin:0 0 18px;
        color:#0f172a;
    "
>
    Your Login Details
</h3>

<p>
    <strong>Login Type:</strong>
    HOD
</p>

<p>
    <strong>Employee ID:</strong>
    ${employeeId}
</p>

<p>
    <strong>Password:</strong>
    ${password}
</p>

</div>


<a
    href="${process.env.FRONTEND_URL || "#"}"
    style="
        display:inline-block;
        padding:13px 25px;
        background:#2563eb;
        color:#ffffff;
        text-decoration:none;
        border-radius:10px;
        font-weight:600;
    "
>
    Open ResultX
</a>


<p
    style="
        margin-top:25px;
        color:#64748b;
        font-size:13px;
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
    style="
        width:100%;
        max-width:600px;
        background:#ffffff;
        border-radius:18px;
        overflow:hidden;
        border:1px solid #e2e8f0;
    "
>


<!-- HEADER -->

<tr>

<td
    style="
        padding:32px;
        text-align:center;
        background:
            linear-gradient(
                135deg,
                #2563eb,
                #4f46e5
            );
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
        color:#dbeafe;
        font-size:14px;
    "
>
    College Result Management System
</p>

</td>

</tr>


<!-- CONTENT -->

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
        font-size:23px;
    "
>
    Faculty Account Created Successfully 🎉
</h2>


<p
    style="
        color:#334155;
        font-size:15px;
        line-height:1.7;
    "
>
    Hello <strong>${name}</strong>,
</p>


<p
    style="
        color:#475569;
        font-size:15px;
        line-height:1.7;
    "
>

    Your faculty account has been successfully
    created by the administrator of
    <strong>SRK Institute of Technology</strong>.

</p>


<!-- LOGIN DETAILS -->

<div
    style="
        margin:25px 0;
        padding:22px;
        background:#f8fafc;
        border:1px solid #e2e8f0;
        border-radius:14px;
    "
>


<h3
    style="
        margin:0 0 18px;
        color:#0f172a;
    "
>
    Your Login Details
</h3>


<p
    style="
        color:#475569;
        font-size:14px;
    "
>

    <strong>
        Login Type:
    </strong>

    Faculty

</p>


<p
    style="
        color:#475569;
        font-size:14px;
    "
>

    <strong>
        Faculty ID:
    </strong>

    ${employeeId}

</p>


<p
    style="
        color:#475569;
        font-size:14px;
    "
>

    <strong>
        Password:
    </strong>

    ${password}

</p>


</div>


<!-- LOGIN BUTTON -->

<div
    style="
        text-align:center;
        margin:30px 0;
    "
>

<a
    href="${process.env.FRONTEND_URL || "#"}"
    style="
        display:inline-block;
        padding:13px 25px;
        background:#2563eb;
        color:#ffffff;
        text-decoration:none;
        border-radius:10px;
        font-weight:600;
    "
>
    Open ResultX
</a>

</div>


<p
    style="
        color:#475569;
        font-size:14px;
        line-height:1.7;
    "
>

    You can now use your
    <strong>Faculty ID</strong>
    and
    <strong>Password</strong>
    to log in to the ResultX Faculty Portal.

</p>


<p
    style="
        margin-top:20px;
        padding:14px 16px;
        background:#fff7ed;
        border:1px solid #fed7aa;
        border-radius:10px;
        color:#9a3412;
        font-size:13px;
        line-height:1.6;
    "
>

    <strong>Security Notice:</strong>

    Please keep your login credentials secure
    and do not share your password with anyone.

</p>


</td>

</tr>


<!-- FOOTER -->

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
        line-height:1.6;
    "
>

    © ${new Date().getFullYear()}
    ResultX
    <br>
    SRK Institute of Technology

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

    transporter,

    verifyEmailConnection,

    sendEmail,

    sendStudentAccountCreatedEmail,

    sendHODAccountCreatedEmail,

    sendFacultyAccountCreatedEmail,

};