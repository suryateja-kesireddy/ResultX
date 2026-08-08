const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");
const { Role } = require("@prisma/client");

// ==========================================
// Validate Common Fields
// ==========================================
const validateCommonFields = (data) => {
  const {
    role,
    name,
    email,
    password,
  } = data;

  if (!role) {
    throw new Error("Role is required");
  }

  if (!name) {
    throw new Error("Name is required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  // Check valid role
  const validRoles = [
    Role.STUDENT,
    Role.HOD,
    Role.EXAM_CELL,
    Role.ADMIN,
    Role.FACULTY,
  ];

  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }
};

// ==========================================
// Check Email Exists
// ==========================================
const checkEmailExists = async (email) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }
};

// ==========================================
// Hash Password
// ==========================================
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};


// ==========================================
// Create User
// ==========================================
const createUser = async (tx, userData) => {
  const {
    name,
    email,
    password,
    role,
  } = userData;

  const user = await tx.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });

  return user;
};


// ==========================================
// Create Student Profile
// ==========================================
const createStudentProfile = async (tx, user, data) => {
  const {
    hallTicket,
    phone,
    departmentId,
    semesterId,
    section = "A",
  } = data;

  console.log("▶ createStudentProfile started");

  if (!hallTicket) {
    throw new Error("Hall Ticket is required");
  }

  if (!departmentId) {
    throw new Error("Department is required");
  }

  if (!semesterId) {
    throw new Error("Semester is required");
  }

  console.log("Checking existing hall ticket...");

  const existingStudent = await tx.student.findUnique({
    where: {
      hallTicket,
    },
  });

  if (existingStudent) {
    throw new Error("Hall Ticket already exists");
  }

  console.log("Hall ticket OK");

  console.log("Checking department...");

  const department = await tx.department.findUnique({
    where: {
      id: Number(departmentId),
    },
  });

  console.log("Department:", department);

  if (!department) {
    throw new Error("Department not found");
  }

  console.log("Checking semester...");

  const semester = await tx.semester.findUnique({
    where: {
      id: Number(semesterId),
    },
  });

  console.log("Semester:", semester);

  if (!semester) {
    throw new Error("Semester not found");
  }

  console.log("Creating student...");

  const student = await tx.student.create({
    data: {
      userId: user.id,
      hallTicket,
      phone,
      departmentId: Number(departmentId),
      semesterId: Number(semesterId),
      section,
    },
    include: {
      user: true,
      department: true,
      semester: {
        include: {
          academicYear: true,
        },
      },
    },
  });

  console.log("Student created successfully");

  return student;
};

// ==========================================
// Create HOD Profile
// ==========================================
const createHODProfile = async (tx, user, data) => {
  const {
    employeeId,
    phone,
    departmentId,
  } = data;

  // Validate Required Fields
  if (!employeeId) {
    throw new Error("Employee ID is required");
  }

  if (!departmentId) {
    throw new Error("Department is required");
  }

  // Check Employee ID
  const existingHOD = await tx.hOD.findUnique({
    where: {
      employeeId,
    },
  });

  if (existingHOD) {
    throw new Error("Employee ID already exists");
  }

  // Check Department
  const department = await tx.department.findUnique({
    where: {
      id: Number(departmentId),
    },
  });

  if (!department) {
    throw new Error("Department not found");
  }

  // Create HOD
  return await tx.hOD.create({
    data: {
      userId: user.id,
      employeeId,
      phone,
      departmentId: Number(departmentId),
    },
    include: {
      user: true,
      department: true,
    },
  });
};

// ==========================================
// Create Exam Cell Profile
// ==========================================
const createExamCellProfile = async (tx, user, data) => {
  const {
    employeeId,
    phone,
  } = data;

  // Validate Required Fields
  if (!employeeId) {
    throw new Error("Employee ID is required");
  }

  // Check Employee ID
  const existingExamCell = await tx.examCell.findUnique({
    where: {
      employeeId,
    },
  });

  if (existingExamCell) {
    throw new Error("Employee ID already exists");
  }

  // Create Exam Cell
  return await tx.examCell.create({
    data: {
      userId: user.id,
      employeeId,
      phone,
    },
    include: {
      user: true,
    },
  });
};
// ==========================================
// Create Faculty Profile
// ==========================================
const createFacultyProfile = async (tx, user, data) => {
    const {
        employeeId,
        phone,
        qualification,
        experience,
        departmentId,
    } = data;

    // Validate Required Fields
    if (!employeeId) {
        throw new Error("Employee ID is required");
    }

    if (!departmentId) {
        throw new Error("Department is required");
    }

    // Check Employee ID
    const existingFaculty = await tx.faculty.findUnique({
        where: {
            employeeId,
        },
    });

    if (existingFaculty) {
        throw new Error("Employee ID already exists");
    }

    // Check Department
    const department = await tx.department.findUnique({
        where: {
            id: Number(departmentId),
        },
    });

    if (!department) {
        throw new Error("Department not found");
    }

    // Create Faculty
    return await tx.faculty.create({
        data: {
            userId: user.id,
            employeeId,
            phone,
            qualification,
            experience:
                experience !== undefined &&
                experience !== ""
                    ? Number(experience)
                    : null,
            departmentId: Number(departmentId),
        },

        include: {
            user: true,
            department: true,
        },
    });
};

// ==========================================
// Create Account
// ==========================================
const createAccount = async (data) => {

  // Validate Common Fields
  validateCommonFields(data);

  // Check Email
  await checkEmailExists(data.email);

  // Hash Password
  const hashedPassword = await hashPassword(data.password);

  // Transaction
  return await prisma.$transaction(
  async (tx) => {

    const user = await createUser(tx, {
      ...data,
      password: hashedPassword,
    });

    switch (data.role) {
      case Role.STUDENT:
        return await createStudentProfile(tx, user, data);

      case Role.HOD:
        return await createHODProfile(tx, user, data);

      case Role.EXAM_CELL:
        return await createExamCellProfile(tx, user, data);
        
      case Role.FACULTY:
        return await createFacultyProfile(tx, user, data);

      default:
        throw new Error("Invalid role");
    }
  },
  {
    timeout: 15000,     // 15 seconds
    maxWait: 10000      // wait up to 10 seconds for a connection
  }
);

};
// ==========================================
// Get Account Statistics
// ==========================================
// ==========================================
// Get Account Statistics
// ==========================================
const getAccountStats = async () => {
  const [
    totalAccounts,
    students,
    hods,
    examCells,
    faculty,
    admins,
] = await Promise.all([

    prisma.user.count({
      where: {
        deletedAt: null,
      },
    }),

    prisma.user.count({
      where: {
        role: Role.STUDENT,
        deletedAt: null,
      },
    }),

    prisma.user.count({
      where: {
        role: Role.HOD,
        deletedAt: null,
      },
    }),

    prisma.user.count({
      where: {
        role: Role.EXAM_CELL,
        deletedAt: null,
      },
    }),
    prisma.user.count({
    where: {
        role: Role.FACULTY,
        deletedAt: null,
    },
}),

    prisma.user.count({
      where: {
        role: Role.ADMIN,
        deletedAt: null,
      },
    }),

  ]);

  return {
    totalAccounts,
    students,
    hods,
    examCells,
    admins,
    faculty,
  };
};
// ==========================================
// Get All Accounts
// ==========================================
const getAccounts = async (filters = {}) => {
  const {
    search,
    role,
    department,
    status,
  } = filters;

  const where = {
  AND: [
    {
      deletedAt: null,
    },
  ],
};

  // ------------------------------------------
  // Search
  // ------------------------------------------
  if (search) {
    where.AND.push({
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
      ],
    });
  }

  // ------------------------------------------
  // Role
  // ------------------------------------------
  if (role) {
    where.AND.push({
      role,
    });
  }

  // ------------------------------------------
  // Status
  // ------------------------------------------
  if (status === "ACTIVE") {
    where.AND.push({
      isActive: true,
    });
  }

  if (status === "INACTIVE") {
    where.AND.push({
      isActive: false,
    });
  }

  // ------------------------------------------
  // Department
  // ------------------------------------------
  if (department) {
  where.AND.push({
    OR: [
      {
        student: {
          department: {
            code: department,
          },
        },
      },
      {
        hod: {
          department: {
            code: department,
          },
        },
      },
      {
        faculty: {
          department: {
            code: department,
          },
        },
      },
    ],
  });
}

  // Remove empty AND
  if (where.AND.length === 0) {
    delete where.AND;
  }

  // ------------------------------------------
  // Fetch Users
  // ------------------------------------------
  const users = await prisma.user.findMany({
    where,

    orderBy: {
      createdAt: "desc",
    },

    include: {
      student: {
        include: {
          department: true,
        },
      },

      hod: {
        include: {
          department: true,
        },
      },
      faculty: {
    include: {
      department: true,
    },
  },

      examCell: true,
    },
  });

  // ------------------------------------------
  // Format Response
  // ------------------------------------------
  return users.map((user) => {
    let phone = "";
    let department = "-";

    if (user.role === Role.STUDENT && user.student) {
      phone = user.student.phone;
      department = user.student.department?.name || "-";
    }

    if (user.role === Role.HOD && user.hod) {
      phone = user.hod.phone;
      department = user.hod.department?.name || "-";
    }

    if (user.role === Role.EXAM_CELL && user.examCell) {
      phone = user.examCell.phone;
      department = "Exam Cell";
    }
    if (user.role === Role.FACULTY && user.faculty) {
  phone = user.faculty.phone || "";
  department = user.faculty.department?.name || "-";
}

    if (user.role === Role.ADMIN) {
      department = "Administration";
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone,
      department,
      role: user.role,
      status: user.isActive ? "Active" : "Inactive",
      createdAt: user.createdAt,
    };
  });
};
// ==========================================
// Get Account By ID
// ==========================================
const getAccountById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      student: {
        include: {
          department: true,
          semester: true,
        },
      },

      hod: {
        include: {
          department: true,
        },
      },

      examCell: true,
    },
  });

  if (!user) {
    throw new Error("Account not found");
  }

  let account = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.isActive,
  };

  if (user.student) {
    account = {
      ...account,
      phone: user.student.phone,
      hallTicket: user.student.hallTicket,
      section: user.student.section,
      department: user.student.department?.name,
      semester: user.student.semester?.name,
    };
  }

  if (user.hod) {
    account = {
      ...account,
      phone: user.hod.phone,
      employeeId: user.hod.employeeId,
      department: user.hod.department?.name,
    };
  }

  if (user.examCell) {
    account = {
      ...account,
      phone: user.examCell.phone,
      employeeId: user.examCell.employeeId,
      department: "Exam Cell",
    };
  }

  return account;
};
// ==========================================
// Update Account
// ==========================================
// ==========================================
// Update Account
// ==========================================
const updateAccount = async (id, data) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      student: true,
      hod: true,
      examCell: true,
    },
  });

  if (!user) {
    throw new Error("Account not found");
  }

  // ---------------------------------------
  // Update User Table
  // ---------------------------------------
  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name: data.name,
      email: data.email,
      isActive: data.status,
    },
  });

  // ---------------------------------------
  // Update Student
  // ---------------------------------------
  if (user.student) {
    await prisma.student.update({
      where: {
        userId: Number(id),
      },
      data: {
        phone: data.phone,
      },
    });
  }

  // ---------------------------------------
  // Update HOD
  // ---------------------------------------
  if (user.hod) {
    await prisma.hOD.update({
      where: {
        userId: Number(id),
      },
      data: {
        phone: data.phone,
      },
    });
  }

  // ---------------------------------------
  // Update Exam Cell
  // ---------------------------------------
  if (user.examCell) {
    await prisma.examCell.update({
      where: {
        userId: Number(id),
      },
      data: {
        phone: data.phone,
      },
    });
  }

  // ---------------------------------------
  // Return Updated Account
  // ---------------------------------------
  return await getAccountById(id);
};

// ==========================================
// Soft Delete Account
// ==========================================
const deleteAccount = async (id) => {

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!user) {
    throw new Error("Account not found");
  }

  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      isActive: false,
      deletedAt: new Date(),
    },
  });

};
module.exports = {
    createAccount,
    getAccountStats,
    getAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,

    validateCommonFields,
    checkEmailExists,
    hashPassword,
    createUser,
    createStudentProfile,
    createHODProfile,
    createExamCellProfile,
    createFacultyProfile,
    

};