require("dotenv").config({ path: ".env.aiven" });

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        where: {
            role: "ADMIN"
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            deletedAt: true
        }
    });

    console.log("\n========== AIVEN ADMIN USERS ==========\n");
    console.table(users);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
