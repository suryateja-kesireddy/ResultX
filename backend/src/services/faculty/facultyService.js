const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");
const { Role } = require("@prisma/client");

const {
    sendFacultyAccountCreatedEmail,
} = require("../email/emailService");


// ==========================================================
// CREATE FACULTY
// ==========================================================

const createFaculty = async (facultyData) => {

    const {
        name,
        email,
        password,
        employeeId,
        phone,
        qualification,
        experience,
        departmentId,
    } = facultyData;


    // ======================================================
    // VALIDATE REQUIRED FIELDS
    // ======================================================

    if (
        !name ||
        !email ||
        !password ||
        !employeeId ||
        !departmentId
    ) {
        throw new Error(
            "Please provide all required fields"
        );
    }


    // ======================================================
    // CHECK EMAIL
    // ======================================================

    const existingUser =
        await prisma.user.findUnique({
            where: {
                email,
            },
        });

    if (existingUser) {
        throw new Error(
            "Email already exists"
        );
    }


    // ======================================================
    // CHECK EMPLOYEE ID
    // ======================================================

    const existingFaculty =
        await prisma.faculty.findUnique({
            where: {
                employeeId,
            },
        });

    if (existingFaculty) {
        throw new Error(
            "Employee ID already exists"
        );
    }


    // ======================================================
    // CHECK DEPARTMENT
    // ======================================================

    const department =
        await prisma.department.findUnique({
            where: {
                id: Number(departmentId),
            },
        });

    if (!department) {
        throw new Error(
            "Department not found"
        );
    }


    // ======================================================
    // HASH PASSWORD
    // ======================================================

    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );


    // ======================================================
    // CREATE USER + FACULTY
    // ======================================================

    const faculty =
        await prisma.$transaction(
            async (tx) => {

                // ==========================================
                // CREATE USER
                // ==========================================

                const user =
                    await tx.user.create({

                        data: {
                            name,
                            email,
                            password: hashedPassword,
                            role: Role.FACULTY,
                        },

                    });


                // ==========================================
                // CREATE FACULTY
                // ==========================================

                const newFaculty =
                    await tx.faculty.create({

                        data: {

                            userId: user.id,

                            employeeId,

                            phone,

                            qualification,

                            experience:
                                experience
                                    ? Number(experience)
                                    : null,

                            departmentId:
                                Number(departmentId),

                        },


                        include: {

                            user: {

                                select: {

                                    id: true,
                                    name: true,
                                    email: true,
                                    role: true,
                                    isActive: true,
                                    createdAt: true,

                                },

                            },


                            department: {

                                include: {

                                    course: true,

                                },

                            },

                        },

                    });


                return newFaculty;

            }
        );


    // ======================================================
    // SEND FACULTY ACCOUNT EMAIL
    // ======================================================

    try {

        await sendFacultyAccountCreatedEmail({

            name,

            email,

            employeeId,

            password,

        });


        console.log(
            `✅ Faculty account email sent to ${email}`
        );

    } catch (emailError) {

        /*
         * Faculty account has already been created.
         *
         * If email sending fails, we don't delete
         * the newly created Faculty account.
         */

        console.error(
            "⚠️ Faculty created successfully, but email could not be sent:",
            emailError.message
        );

    }


    // ======================================================
    // RETURN CREATED FACULTY
    // ======================================================

    return faculty;
};


// ==========================================================
// GET FACULTY STATISTICS
// ==========================================================

const getFacultyStats = async () => {

    const totalFaculty =
        await prisma.faculty.count();


    const departments =
        await prisma.department.findMany({

            include: {

                _count: {

                    select: {

                        faculties: true,

                    },

                },

            },

            orderBy: {

                name: "asc",

            },

        });


    return {

        totalFaculty,

        departments:
            departments.map(
                (department) => ({

                    id: department.id,

                    name: department.name,

                    code: department.code,

                    facultyCount:
                        department
                            ._count
                            .faculties,

                })
            ),

    };
};


// ==========================================================
// GET ALL FACULTY
// ==========================================================

const getAllFaculty = async () => {

    const faculties =
        await prisma.faculty.findMany({

            include: {

                // ==========================================
                // USER
                // ==========================================

                user: {

                    select: {

                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        isActive: true,
                        createdAt: true,

                    },

                },


                // ==========================================
                // DEPARTMENT + COURSE
                // ==========================================

                department: {

                    include: {

                        course: {

                            select: {

                                id: true,
                                name: true,
                                duration: true,

                            },

                        },

                    },

                },


                // ==========================================
                // FACULTY SUBJECTS
                // ==========================================

                facultySubjects: {

                    include: {

                        subject: {

                            select: {

                                id: true,
                                name: true,
                                code: true,

                            },

                        },

                    },

                },

            },


            orderBy: {

                id: "desc",

            },

        });


    return faculties;
};


// ==========================================================
// GET FACULTY BY ID
// ==========================================================

const getFacultyById = async (id) => {

    const faculty =
        await prisma.faculty.findUnique({

            where: {

                id: Number(id),

            },


            include: {

                // ==========================================
                // USER
                // ==========================================

                user: {

                    select: {

                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        isActive: true,
                        createdAt: true,

                    },

                },


                // ==========================================
                // DEPARTMENT + COURSE
                // ==========================================

                department: {

                    include: {

                        course: true,

                    },

                },

            },

        });


    if (!faculty) {

        throw new Error(
            "Faculty not found"
        );

    }


    return faculty;
};


// ==========================================================
// UPDATE FACULTY
// ==========================================================

const updateFaculty = async (
    id,
    facultyData
) => {

    const {
        name,
        email,
        phone,
        qualification,
        experience,
        departmentId,
        isActive,
    } = facultyData;


    // ======================================================
    // FIND FACULTY
    // ======================================================

    const faculty =
        await prisma.faculty.findUnique({

            where: {

                id: Number(id),

            },

            include: {

                user: true,

            },

        });


    if (!faculty) {

        throw new Error(
            "Faculty not found"
        );

    }


    // ======================================================
    // CHECK DEPARTMENT
    // ======================================================

    const department =
        await prisma.department.findUnique({

            where: {

                id: Number(departmentId),

            },

        });


    if (!department) {

        throw new Error(
            "Department not found"
        );

    }


    // ======================================================
    // UPDATE USER + FACULTY
    // ======================================================

    const updatedFaculty =
        await prisma.$transaction(
            async (tx) => {

                // ==========================================
                // UPDATE USER
                // ==========================================

                await tx.user.update({

                    where: {

                        id: faculty.userId,

                    },

                    data: {

                        name,

                        email,

                        isActive,

                    },

                });


                // ==========================================
                // UPDATE FACULTY
                // ==========================================

                const updated =
                    await tx.faculty.update({

                        where: {

                            id: Number(id),

                        },

                        data: {

                            phone,

                            qualification,

                            experience:
                                experience !== undefined &&
                                experience !== null &&
                                experience !== ""
                                    ? Number(experience)
                                    : null,

                            departmentId:
                                Number(departmentId),

                        },


                        include: {

                            user: true,

                            department: {

                                include: {

                                    course: true,

                                },

                            },

                        },

                    });


                return updated;

            }
        );


    return updatedFaculty;
};


// ==========================================================
// DELETE FACULTY
// ==========================================================

const deleteFaculty = async (id) => {

    // ======================================================
    // FIND FACULTY
    // ======================================================

    const faculty =
        await prisma.faculty.findUnique({

            where: {

                id: Number(id),

            },

        });


    if (!faculty) {

        throw new Error(
            "Faculty not found"
        );

    }


    // ======================================================
    // DELETE FACULTY + USER
    // ======================================================

    await prisma.$transaction(
        async (tx) => {

            // ==============================================
            // DELETE FACULTY
            // ==============================================

            await tx.faculty.delete({

                where: {

                    id: Number(id),

                },

            });


            // ==============================================
            // DELETE USER
            // ==============================================

            await tx.user.delete({

                where: {

                    id: faculty.userId,

                },

            });

        }
    );


    return {

        message:
            "Faculty deleted successfully",

    };
};


// ==========================================================
// EXPORTS
// ==========================================================

module.exports = {

    createFaculty,

    getFacultyStats,

    getAllFaculty,

    getFacultyById,

    updateFaculty,

    deleteFaculty,

};