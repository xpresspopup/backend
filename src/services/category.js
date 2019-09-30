import Joi from 'joi';
import LoggerInstance from '../loaders/logger';
import validation from './validations/listing';
import Category from '../models/Categories';
import errorHandler from '../helpers/errorHandler';
import emailService from './emailService2';
import emailTemplate from '../helpers/emailTemplates';
import config from '../config';
import functions from '../helpers/functions';
export default class categoryService {
  //   constructor ({userRepository, jobRepository logger}) {
  // this.userRepository = userRepository
  // this.logger = logger
  //   }
  static async addCategory(data, userDetails, res) {
    try {
      const { id } = userDetails;
      const obj = { ...data };
      obj.createdBy = id;
      const listing = new Category(obj);
      await listing.save();
      return true;
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async getCategory(userDetails, res) {
    try {
      const categories = Category.find({});
      return categories;
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async updateCategory(title, id) {
    try {
      const categories = Category.findOneAndUpdate({ _id: id }, { title });
      return categories;
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async deleteCategory(id) {
    try {
      const categories = Category.findOneAndDelete({ _id: id });
      return categories;
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }
}
