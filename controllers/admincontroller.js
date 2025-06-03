const { getAdminDashboardData } = require('../services/adminservice');

async function getDashboard(req, res) {
  try {
    const dashboardData = await getAdminDashboardData();
    res.status(200).json(dashboardData);
  } catch (err) {
    console.error("Admin Dashboard Error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
}

module.exports = {
  getDashboard,
};
