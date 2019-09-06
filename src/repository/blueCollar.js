import { Container } from 'typedi';
import userModel from '../models/User';
import blueCollarModel from '../models/BlueCollarUser';
import blueCollarJob from '../models/BlueCollarJob';
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

  static async getVerifiedBlueCollarByUserId(_id) {
    try {
      const result = await blueCollarModel.findOne({
        userId: _id,
      });

      if (result) {
        return result;
      }
      throw new Error('User not found');
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getBlueCollarJobById(id) {
    try {
      const result = await blueCollarJob
        .findOne({
          jobId: id,
        })
        .populate('Job');
      if (result) {
        return result;
      }
      throw new Error('Job not found');
    } catch (error) {
      throw new Error(error);
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
