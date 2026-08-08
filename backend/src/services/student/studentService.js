const prisma = require("../../config/prisma");

const bcrypt = require("bcrypt");

const { Role } = require("@prisma/client");

const {
    sendStudentAccountCreatedEmail,
} = require("../email/emailService");


// ==========================================================
// CREATE STUDENT
// ==========================================================

const createStudent = async (studentData) => {

    const {
        name,
        email,
        password,
        hallTicket,
        phone,
        departmentId,
        semesterId,
        section = "A",
    } = studentData;


    // ======================================================
    // VALIDATION
    // ======================================================

    if (
        !name ||
        !email ||
        !password ||
        !hallTicket ||
        !departmentId ||
        !semesterId
    ) {

        throw new Error(
            "Please provide all required fields"
        );

    }


    // ======================================================
    // CHECK EMAIL
    // ======================================================

    const existingEmail =
        await prisma.user.findUnique({

            where: {
                email,
            },

        });


    if (existingEmail) {

        throw new Error(
            "Email already exists"
        );

    }


    // ======================================================
    // CHECK HALL TICKET
    // ======================================================

    const existingStudent =
        await prisma.student.findUnique({

            where: {
                hallTicket,
            },

        });


    if (existingStudent) {

        throw new Error(
            "Hall Ticket already exists"
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
    // CHECK SEMESTER
    // ======================================================

    const semester =
        await prisma.semester.findUnique({

            where: {
                id: Number(semesterId),
            },

        });


    if (!semester) {

        throw new Error(
            "Semester not found"
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
    // CREATE USER + STUDENT
    // ======================================================

    const student =
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

                            password:
                                hashedPassword,

                            role:
                                Role.STUDENT,

                        },

                    });


                // ==========================================
                // CREATE STUDENT
                // ==========================================

                const newStudent =
                    await tx.student.create({

                        data: {

                            userId:
                                user.id,

                            hallTicket,

                            phone,

                            departmentId:
                                Number(
                                    departmentId
                                ),

                            semesterId:
                                Number(
                                    semesterId
                                ),

                            section,

                        },


                        include: {

                            // ==============================
                            // USER
                            // ==============================

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


                            // ==============================
                            // DEPARTMENT
                            // ==============================

                            department: true,


                            // ==============================
                            // SEMESTER
                            // ==============================

                            semester: {

                                include: {

                                    academicYear:
                                        true,

                                },

                            },

                        },

                    });


                return newStudent;

            }
        );


    // ======================================================
    // SEND ACCOUNT CREATION EMAIL
    // ======================================================

    try {

        await sendStudentAccountCreatedEmail({

            name,

            email,

            hallTicket,

            password,

        });


        console.log(
            `✅ Student account email sent to ${email}`
        );


    } catch (emailError) {

        console.error(
            "⚠️ Student created successfully, but email could not be sent:",
            emailError.message
        );

    }


    // ======================================================
    // RETURN STUDENT
    // ======================================================

    return student;

};


// ==========================================================
// GET ALL STUDENTS
// ==========================================================

const getAllStudents = async (
    filters = {}
) => {

    const {
        search,
        department,
        semester,
        status,
    } = filters;


    const where = {
        AND: [],
    };


    // ======================================================
    // SEARCH
    // Name OR Hall Ticket
    // ======================================================

    if (search) {

        where.AND.push({

            OR: [

                {
                    hallTicket: {

                        contains: search,

                    },
                },

                {
                    user: {

                        name: {

                            contains: search,

                        },

                    },

                },

            ],

        });

    }


    // ======================================================
    // DEPARTMENT FILTER
    // ======================================================

    if (department) {

        where.AND.push({

            department: {

                code: department,

            },

        });

    }


    // ======================================================
    // SEMESTER FILTER
    // ======================================================

    if (semester) {

        where.AND.push({

            semester: {

                number:
                    Number(semester),

            },

        });

    }


    // ======================================================
    // STATUS FILTER
    // ======================================================

    if (status === "ACTIVE") {

        where.AND.push({

            user: {

                isActive: true,

            },

        });

    }


    if (status === "INACTIVE") {

        where.AND.push({

            user: {

                isActive: false,

            },

        });

    }


    // ======================================================
    // REMOVE EMPTY AND
    // ======================================================

    if (
        where.AND.length === 0
    ) {

        delete where.AND;

    }


    // ======================================================
    // FETCH STUDENTS
    // ======================================================

    const students =
        await prisma.student.findMany({

            where,


            include: {

                // ==============================
                // USER
                // ==============================

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


                // ==============================
                // DEPARTMENT
                // ==============================

                department: {

                    select: {

                        id: true,

                        name: true,

                        code: true,

                    },

                },


                // ==============================
                // SEMESTER
                // ==============================

                semester: {

                    include: {

                        academicYear: true,

                    },

                },

            },


            orderBy: {

                id: "desc",

            },

        });


    // ======================================================
    // FORMAT RESPONSE
    // ======================================================

    return students.map(
        (student) => ({

            id:
                student.id,

            name:
                student.user.name,

            email:
                student.user.email,

            hallTicket:
                student.hallTicket,

            phone:
                student.phone,

            section:
                student.section,

            department:
                student.department,

            semester:
                student.semester,

            status:
                student.user.isActive
                    ? "Active"
                    : "Inactive",

            createdAt:
                student.user.createdAt,

        })
    );

};


// ==========================================================
// GET STUDENT STATISTICS
// ==========================================================

const getStudentStats = async () => {

    const total =
        await prisma.student.count();


    const departments =
        await prisma.department.findMany({

            select: {

                id: true,

                name: true,

                code: true,

                _count: {

                    select: {

                        students: true,

                    },

                },

            },


            orderBy: {

                code: "asc",

            },

        });


    return {

        total,

        departments:
            departments.map(
                (department) => ({

                    id:
                        department.id,

                    name:
                        department.name,

                    code:
                        department.code,

                    count:
                        department
                            ._count
                            .students,

                })
            ),

    };

};


// ==========================================================
// GET STUDENT BY ID
// ==========================================================

const getStudentById = async (
    id
) => {

    const student =
        await prisma.student.findUnique({

            where: {

                id:
                    Number(id),

            },


            include: {

                // ==============================
                // USER
                // ==============================

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


                // ==============================
                // DEPARTMENT
                // ==============================

                department: true,


                // ==============================
                // SEMESTER
                // ==============================

                semester: {

                    include: {

                        academicYear: true,

                    },

                },

            },

        });


    if (!student) {

        throw new Error(
            "Student not found"
        );

    }


    return student;

};


// ==========================================================
// UPDATE STUDENT
// ==========================================================

const updateStudent = async (
    id,
    studentData
) => {

    const {
        name,
        email,
        phone,
        departmentId,
        semesterId,
        section,
        isActive,
    } = studentData;


    // ======================================================
    // CHECK STUDENT
    // ======================================================

    const student =
        await prisma.student.findUnique({

            where: {

                id:
                    Number(id),

            },


            include: {

                user: true,

            },

        });


    if (!student) {

        throw new Error(
            "Student not found"
        );

    }


    // ======================================================
    // UPDATE USER + STUDENT
    // ======================================================

    const updatedStudent =
        await prisma.$transaction(
            async (tx) => {

                // ==========================================
                // UPDATE USER
                // ==========================================

                await tx.user.update({

                    where: {

                        id:
                            student.userId,

                    },


                    data: {

                        name,

                        email,

                        isActive,

                    },

                });


                // ==========================================
                // UPDATE STUDENT
                // ==========================================

                return await tx.student.update({

                    where: {

                        id:
                            Number(id),

                    },


                    data: {

                        phone,

                        departmentId:
                            Number(
                                departmentId
                            ),

                        semesterId:
                            Number(
                                semesterId
                            ),

                        section,

                    },


                    include: {

                        user: true,

                        department: true,

                        semester: {

                            include: {

                                academicYear:
                                    true,

                            },

                        },

                    },

                });

            }
        );


    return updatedStudent;

};


// ==========================================================
// DELETE STUDENT
// ==========================================================

const deleteStudent = async (
    id
) => {

    // ======================================================
    // FIND STUDENT
    // ======================================================

    const student =
        await prisma.student.findUnique({

            where: {

                id:
                    Number(id),

            },

        });


    if (!student) {

        throw new Error(
            "Student not found"
        );

    }


    // ======================================================
    // DELETE STUDENT + USER
    // ======================================================

    await prisma.$transaction(
        async (tx) => {

            // ==============================================
            // DELETE STUDENT
            // ==============================================

            await tx.student.delete({

                where: {

                    id:
                        Number(id),

                },

            });


            // ==============================================
            // DELETE USER
            // ==============================================

            await tx.user.delete({

                where: {

                    id:
                        student.userId,

                },

            });

        }
    );


    return {

        message:
            "Student deleted successfully",

    };

};


// ==========================================================
// GET LOGGED-IN STUDENT PROFILE
// ==========================================================

const getStudentProfile = async (
    userId
) => {

    const student =
        await prisma.student.findUnique({

            where: {

                userId:
                    Number(userId),

            },


            include: {

                // ==============================
                // USER
                // ==============================

                user: {

                    select: {

                        id: true,

                        name: true,

                        email: true,

                        role: true,

                        isActive: true,

                    },

                },


                // ==============================
                // DEPARTMENT
                // ==============================

                department: {

                    select: {

                        id: true,

                        name: true,

                        code: true,

                    },

                },


                // ==============================
                // SEMESTER
                // ==============================

                semester: {

                    include: {

                        academicYear:
                            true,

                    },

                },

            },

        });


    if (!student) {

        throw new Error(
            "Student not found"
        );

    }


    return student;

};


// ==========================================================
// EXPORTS
// ==========================================================

module.exports = {

    createStudent,

    getAllStudents,

    getStudentStats,

    getStudentById,

    getStudentProfile,

    updateStudent,

    deleteStudent,

};