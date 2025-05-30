const { PrismaClient } = require('../generated/prisma'); // ✅ correct
const prisma = new PrismaClient();
module.exports = prisma;
