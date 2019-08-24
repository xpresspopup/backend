import { Container } from 'typedi';
import userModel from '../models/User';
import blueCollarModel from '../models/BlueCollarUser';
import logger from '../loaders/logger';
export default class blueColarRepository {
  // constructor({ userModel, logger }) {
  //   // this.userModel = userModel;
  // this.logger = logger
  // }

  static async getVerifiedBlueCollarByEmail(email) {
    try {
      const result = await blueCollarModel.findOne({
        email,
        isVerified: true,
        isActive: true,
        userType: 'blueCollar',
      });
      return result;
    } catch (error) {
      throw new Error('User not found');
    }
  }

  static async updateUser(userId, fieldsToUpdate) {
    try {
      const result = await blueCollarModel.findOneAndUpdate(
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
