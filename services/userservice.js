const prisma = require('../utils/prismaclient');

async function getUserProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      confirmed: true,
    },
  });

  if (!user) throw new Error('User not found');
  return user;
}

async function updateUserProfile(userId, data) {
  const updated = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    confirmed: updated.confirmed,
  };
}

module.exports = {
  getUserProfile,
  updateUserProfile,
};
