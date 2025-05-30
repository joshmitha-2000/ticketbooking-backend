const prisma = require('../backend/utils/prismaclient');

async function main() {
  try {
    // Fetch all users (should be empty initially)
    const users = await prisma.user.findMany();
    console.log('Users:', users);

    // Create a test user
    const newUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'hashedpassword', // you can use bcrypt later
        role: 'USER',
      },
    });
    console.log('Created User:', newUser);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
