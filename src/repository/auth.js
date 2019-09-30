import { Container } from 'typedi';
import userModel from '../models/User';
import logger from '../loaders/logger';
export default class userRepository {
  // constructor({ userModel, logger }) {
  //   // this.userModel = userModel;
  // this.logger = logger
  // }

  static async getUserByEmail(email) {
    try {
      const result = await userModel.findOne({ email });
      if (result) {
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getActiveUserByEmail(email) {
    try {
      const result = await userModel.findOne({
        email,
        isActive: true,
        accountConfirm: true,
      });
      if (result) {
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateUser(searchObject, fieldsToUpdate) {
    try {
      const result = await userModel.findOneAndUpdate(
        searchObject,
        fieldsToUpdate,
      );
      if (result) {
        return result._doc;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
