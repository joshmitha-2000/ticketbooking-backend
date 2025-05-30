const { getUserProfile, updateUserProfile } = require('../services/userservice');

async function getProfile(req, res) {
  try {
    const userId = req.user.userId; // comes from JWT middleware
    const user = await getUserProfile(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user.userId;
    const updatedUser = await updateUserProfile(userId, req.body);
    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
