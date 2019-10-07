import { Container } from 'typedi';
import userModel from '../models/User';
import whiteCollarModel from '../models/WhiteCollarUser';
import whiteCollarJob from '../models/WhiteCollarJob';
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

      if (result) {
        return result;
      }
      throw new Error('User not found');
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getVerifiedWhiteCollarByUserId(_id) {
    try {
      const result = await whiteCollarModel.findOne({
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

  static async getWhiteCollarJobById(id) {
    try {
      const result = await whiteCollarJob
        .findOne({
          jobId: id,
        })
        .populate('jobId');
      if (result) {
        return result;
      }
      throw new Error('White collar Job not found');
    } catch (error) {
      throw new Error(error);
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

  static async updateWhiteCollarJob(jobId, fieldsToUpdate) {
    try {
      console.log(jobId);
      const result = await whiteCollarJob.findOneAndUpdate(
        { jobId },
        fieldsToUpdate,
      );
      if (result) {
        return result._doc;
      }
      throw new Error('Job not found');
    } catch (error) {
      throw new Error(error);
    }
  }
}
