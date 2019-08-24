import Joi from 'joi';
import LoggerInstance from '../loaders/logger';
import validation from './validations/employer';
import errorHandler from '../helpers/errorHandler';
import User from '../models/User';
import Employer from '../models/Employer';
import userRepository from '../repository/auth';
import employerRepository from '../repository/employer';
import userService from './auth';
export default class jobService {
  //   constructor ({userRepository, jobRepository logger}) {
  // this.userRepository = userRepository
  // this.logger = logger
  //   }
  static async addEmployer(userInput, res) {
    // not in use anymore
    try {
      const user = await userService.addUser(userInput, res);
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }
}
