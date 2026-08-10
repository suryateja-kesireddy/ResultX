
require("dotenv").config({
    path: process.env.DOTENV_FILE || ".env",
});

const { Resend } = require("resend");

// ==========================================================
// RESEND EMAIL CLIENT
// ==========================================================

const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================================
// VERIFY EMAIL SERVICE CONFIGURATION
// ==========================================================

const verifyEmailConnection = async () => {
    try {
        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is not configured");
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

<!-- ======================================================
     YOUR EXISTING STUDENT EMAIL HTML
     ====================================================== -->

<!--
    KEEP YOUR EXISTING STUDENT EMAIL TEMPLATE HERE.
    The template from your original emailService.js
    does not need to change.
-->

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

<!-- ======================================================
     YOUR EXISTING HOD EMAIL HTML
     ====================================================== -->

<!--
    KEEP YOUR EXISTING HOD EMAIL TEMPLATE HERE.
    The template from your original emailService.js
    does not need to change.
-->

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

<!-- ======================================================
     YOUR EXISTING FACULTY EMAIL HTML
     ====================================================== -->

<!--
    KEEP YOUR EXISTING FACULTY EMAIL TEMPLATE HERE.
    The template from your original emailService.js
    does not need to change.
-->

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