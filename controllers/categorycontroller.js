const categoryService = require('../services/categoryservice');

async function getAllCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

async function getCategoryById(req, res) {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
}

async function createCategory(req, res) {
  try {
    // Expect req.body to contain: name
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') { // Prisma unique constraint violation
      return res.status(400).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: 'Failed to create category' });
  }
}

async function updateCategory(req, res) {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') { // Prisma record not found
      return res.status(404).json({ error: 'Category not found' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: 'Failed to update category' });
  }
}

async function deleteCategory(req, res) {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(500).json({ error: 'Failed to delete category' });
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
