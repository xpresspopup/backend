import { Container } from 'typedi';
import userModel from '../models/User';
import jobModel from '../models/Job';
import logger from '../loaders/logger';
export default class jobRepository {
  // constructor({ userModel, jobModel, logger }) {
  //   // this.userModel = userModel;
  // this.logger = logger
  // }

  static async getJobs(searchObject) {
    try {
      const result = await jobModel.find(searchObject);
      if (result) {
        return result;
      }
      return false;
    } catch (error) {
      throw new Error('User not found');
    }
  }
}
