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
      return result;
    } catch (error) {
      throw new Error('User not found');
    }
  }

  static async updateUser(searchObject, fieldsToUpdate) {
    try {
      const result = await userModel.findOneAndUpdate(
        searchObject,
        fieldsToUpdate,
      );
      return result;
    } catch (error) {
      throw new Error('User not found');
    }
  }
}
