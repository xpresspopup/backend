import categoryService from '../services/category';
import LoggerInstance from '../loaders/logger';
export default class Category {
  // constructor({ authService, logger }) {
  //   this.authService = authService;
  // this.logger = logger;
  // }
  static async createCategory(req, res) {
    try {
      const data = req.body;
      const userDetails = req.user;
      await categoryService.addCategory(data, userDetails, res);
      return res.status(201).json({ message: 'Category created' });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async getAllCategory(req, res) {
    try {
      const userDetails = req.user;
      const doc = await categoryService.getCategory();
      return res.status(200).json(doc);
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async updateCategory(req, res) {
    try {
      const userDetails = req.user;
      const { id } = req.params;
      const { title } = req.body;
      if (id === '' || id.trim().length !== 24) {
        throw new Error('Invalid id number');
      }

      const doc = await categoryService.updateCategory(title, id);
      if (doc) return res.status(200).json({ message: 'Update successfully' });
      throw new Error('error updating category');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async deleteCategory(req, res) {
    try {
      const userDetails = req.user;
      const { id } = req.params;
      if (id === '' || id.trim().length !== 24) {
        throw new Error('Invalid id number');
      }
      const doc = await categoryService.deleteCategory(id);
      if (doc) return res.status(200).json({ message: 'Deleted successfully' });
      throw new Error('error deleting category');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }
}
