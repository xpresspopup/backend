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
}
