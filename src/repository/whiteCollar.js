import { Container } from 'typedi';
import userModel from '../models/User';
import whiteCollarModel from '../models/WhiteCollarUser';
import logger from '../loaders/logger';
export default class whiteCollarRepository {
  // constructor({ userModel, logger }) {
  //   // this.userModel = userModel;
  // this.logger = logger
  // }

  static async getVerifiedWhiteCollarByEmail(email) {
    try {
      const result = await whiteCollarModel.findOne({
        email,
        isVerified: true,
        isActive: true,
        userType: 'whiteCollar',
      });
      return result;
    } catch (error) {
      throw new Error('User not found');
    }
  }

  static async updateUser(userId, fieldsToUpdate) {
    try {
      const result = await whiteCollarModel.findOneAndUpdate(
        { userId },
        fieldsToUpdate,
      );
      if (result) {
        return result._doc;
      }
      throw new Error('User not found');
    } catch (error) {
      throw new Error(error);
    }
  }
}
