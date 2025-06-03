const prisma = require('../utils/prismaclient');

async function getAllCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

async function getCategoryById(id) {
  return await prisma.category.findUnique({
    where: { id: Number(id) },
  });
}

async function createCategory(data) {
    console.log("🔵 [Service] createCategory with data:", data);
    return prisma.category.create({
      data: {
        name: data.name,
      }
    });
  }
  
async function updateCategory(id, data) {
  return await prisma.category.update({
    where: { id: Number(id) },
    data,
  });
}

async function deleteCategory(id) {
  return await prisma.category.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
