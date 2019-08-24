import Joi from 'joi';
import LoggerInstance from '../loaders/logger';
import validation from './validations/job';
import errorHandler from '../helpers/errorHandler';
import Job from '../models/Job';
import User from '../models/User';
import jobRepository from '../repository/job';
import employerRepository from '../repository/employer';
import userRepository from '../repository/auth';
export default class jobService {
  //   constructor ({userRepository, jobRepository logger}) {
  // this.userRepository = userRepository
  // this.logger = logger
  //   }
  static async addJob(jobInput, res) {
    try {
      const result = Joi.validate(jobInput, validation.jobSchema, {
        convert: false,
      });
      if (result.error === null) {
        const { email } = jobInput;
        // check if an employer is registered, verified and active by email now but should switch to id
        const user = await employerRepository.getVerifiedEmployerByEmail(email);
        if (user) {
          const jobObject = { ...jobInput };
          jobObject.created_by = user._id;
          const job = new Job(jobObject);
          await job.save();
          return true;
        }
        errorHandler.serverResponse(res, 'Employer cannot create a job', 400);
        return false;
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw new Error(e);
    }
  }

  static async allJobs(res, jobType) {
    try {
      let searchObject;
      if (jobType === 'all') {
        searchObject = {};
      } else {
        searchObject = {
          jobType,
        };
      }
      const result = await jobRepository.getJobs(searchObject);
      if (result) {
        return result;
      }
      return errorHandler.serverResponse(res, 'Job not found', 400);
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }
}
