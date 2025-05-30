const { registerUser, confirmUserEmail, loginUser } = require('../services/authservice');

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const user = await registerUser(name, email, password, role);
    res.status(201).json({ message: 'User registered. Please check email to confirm.', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function confirmEmail(req, res) {
  try {
    const { token } = req.params;
    await confirmUserEmail(token);
    res.status(200).json({ message: 'Email confirmed. You can now login.' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired confirmation token.' });
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password); // ⬅️ destructure the result
    res.status(200).json({ token, user }); // ✅ send token and user
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = {
  register,
  confirmEmail,
  login,
};
