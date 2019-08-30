import Joi from 'joi';
import LoggerInstance from '../loaders/logger';
import validation from './validations/job';
import errorHandler from '../helpers/errorHandler';
import Job from '../models/Job';
import User from '../models/User';
import jobRepository from '../repository/job';
import employerRepository from '../repository/employer';
import userRepository from '../repository/auth';
import whiteCollarRepository from '../repository/whiteCollar';
import blueCollarRepository from '../repository/blueCollar';
import emailService from './emailService';
import emailTemplate from '../helpers/emailTemplates';
import config from '../config';
import functions from '../helpers/functions';
export default class jobService {
  //   constructor ({userRepository, jobRepository logger}) {
  // this.userRepository = userRepository
  // this.logger = logger
  //   }
  static async addJob(jobInput, res) {
    try {
      const { email, longitude, latitude } = jobInput;
      const jobObject = { ...jobInput };
      jobObject.longitude = parseFloat(longitude, 10);
      jobObject.latitude = parseFloat(latitude, 10);
      const result = Joi.validate(jobObject, validation.jobSchema, {
        convert: false,
      });
      if (result.error === null) {
        // check if an employer is registered, verified and active by email now but should switch to id
        const user = await employerRepository.getVerifiedEmployerByEmail(email);
        if (user) {
          jobObject.created_by = user._id;
          jobObject.location = {
            type: 'Point',
            coordinates: [jobObject.longitude, jobObject.latitude],
          };
          const job = new Job(jobObject);
          await job.save();
          /** check why this email service not sending emails */
          // await emailService.sendText(
          //   email,
          //   'Sucessful Job creation',
          //   emailTemplate.successfulJobCreated(job),
          // );
          return true;
        }
        errorHandler.serverResponse(res, 'User is not an employer', 400);
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

  /** get all jobs within a specific distance in kilometer */
  static async jobsWithin(res, jobDetails, user) {
    try {
      const { userType, _id } = user;
      let maxDistance;
      let searchObject = {};
      switch (userType) {
        case 'whiteCollar':
          searchObject = {
            jobType: userType,
          };
          maxDistance = await functions.calculateDistance('whiteCollar', _id);
          break;
        case 'blueCollar':
          searchObject = {
            jobType: userType,
          };
          maxDistance = await functions.calculateDistance('blueCollar', _id);
          break;
        case 'employer':
          // await calculateDistance('others');
          break;

        default:
          break;
      }
      const result = await jobRepository.getJobsWithinDistance(
        jobDetails,
        searchObject,
        maxDistance,
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async jobsByCategory(res, category) {
    try {
      if (category === '') {
        return errorHandler.serverResponse(res, 'no category supplied', 400);
      }
      const job = await jobRepository.searchJobsByCategory(category);
      if (job) {
        return job;
      }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }
}
