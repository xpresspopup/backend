import { Container } from 'typedi';
import userModel from '../models/User';
import employerModel from '../models/Employer';
import logger from '../loaders/logger';
export default class employerRepository {
  // constructor({ userModel, logger }) {
  //   // this.userModel = userModel;
  // this.logger = logger
  // }

  static async getVerifiedEmployerByEmail(email) {
    try {
      const result = await userModel.findOne({
        email,
        isVerified: true,
        isActive: true,
        $and: [{ $or: [{ userType: 'employer' }, { userType: 'admin' }] }],
      });
      return result;
    } catch (error) {
      throw new Error('User not found');
    }
  }

  // static async getVerifiedEmployerById(userId) {
  //   try {
  //     const result = await userModel.findOne({
  //       userId,
  //       isVerified: true,
  //       isActive: true,
  //       $and: [{ $or: [{ userType: 'employer' }, { userType: 'admin' }] }],
  //     });
  //     return result;
  //   } catch (error) {
  //     throw new Error('User not found');
  //   }
  // }

  static async updateUser(userId, fieldsToUpdate) {
    try {
      const result = await employerModel.findOneAndUpdate(
        { userId },
        fieldsToUpdate,
      );
      if (result) {
        return result._doc;
      }
      return false;
    } catch (error) {
      throw new Error('User not found');
    }
  }
}
