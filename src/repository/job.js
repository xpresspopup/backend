import userModel from '../models/User';
import jobModel from '../models/Job';
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
      console.log(searchObject);
      const job = await jobModel.find({
        location: {
          $near: {
            $maxDistance: maxDistance,
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
          },
        },
        isValid: true,
        ...searchObject,
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

  static async findJobsById(id) {
    try {
      const job = await jobModel.findOne({
        _id: id,
      });
      if (job) {
        return job;
      }
      throw new Error('No job with this category');
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateJobsById(id, fieldsToUpdate) {
    try {
      const job = await jobModel.findOneAndUpdate(
        {
          _id: id,
        },
        fieldsToUpdate,
      );
      if (job) {
        return job;
      }
      throw new Error('No job to update');
    } catch (error) {
      throw new Error(error);
    }
  }
}
