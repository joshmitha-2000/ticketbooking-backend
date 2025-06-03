const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prismaclient');
const { sendConfirmationEmail } = require('../utils/email');

async function registerUser(name, email, password, role) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      confirmed: false,
    },
  });

  // create confirmation token valid for 24 day
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24d' });
  const confirmUrl = `http://localhost:5000/api/auth/confirm/${token}`;

  await sendConfirmationEmail(email, confirmUrl);

  return user;
}

async function confirmUserEmail(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  await prisma.user.update({
    where: { id: userId },
    data: { confirmed: true },
  });
}
async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  if (!user.confirmed) throw new Error('Please confirm your email before logging in');

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error('Invalid email or password');

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24d' }
  );

  // ✅ Return both token and essential user info
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  };
}


module.exports = {
  registerUser,
  confirmUserEmail,
  loginUser,
};
