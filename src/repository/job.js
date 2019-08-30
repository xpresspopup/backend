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
      throw new Error('User not found');
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getJobsWithinDistance(
    { latitude, longitude },
    searchObject,
    maxDistance,
  ) {
    try {
      const job = await jobModel.find({
        $query: {
          isValid: true,
          ...searchObject,
        },
        location: {
          $near: {
            $maxDistance: maxDistance,
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
          },
        },
      });
      if (job) {
        return job;
      }
      throw new Error('No available job within this region');
    } catch (error) {
      throw new Error(error);
    }
  }

  static async searchJobsByCategory(category) {
    try {
      const job = await jobModel.find({
        category,
        isValid: true,
        jobType: 'whiteCollar',
      });
      if (job) {
        return job;
      }
      throw new Error('No job with this category');
    } catch (error) {
      throw new Error(error);
    }
  }
}
