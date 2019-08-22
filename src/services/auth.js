import Joi from 'joi';
import LoggerInstance from '../loaders/logger';
import validation from './validations/user';
import errorHandler from '../helpers/errorHandler';
import User from '../models/User';
import userRepository from '../repository/auth';
export default class AuthService {
  //   constructor ({userRepository, logger}) {
  // this.userRepository = userRepository
  // this.logger = logger
  //   }
  static async addUser(userInput, res) {
    try {
      const result = Joi.validate(userInput, validation.userSchema, {
        convert: false,
      });
      if (result.error === null) {
        const { email } = userInput;
        const existUser = await userRepository.getUserByEmail(email);
        if (existUser) {
          errorHandler.serverResponse(res, 'User already exist', 400);
        }
        const user = new User(userInput);
        await user.save();
        return { user };
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }

  static async verifyUserSignIn(userInput, res) {
    try {
      const { email, password } = userInput;
      const result = Joi.validate(userInput, validation.signInUser, {
        convert: false,
      });
      if (result.error === null) {
        const user = await userRepository.getUserByEmail(email);
        if (user) {
          const isMatch = await user.comparePassword(password);
          if (isMatch) {
            const { token, firstname, lastname } = await user.generateToken();
            return { firstname, lastname, token };
          }
          return errorHandler.serverResponse(
            res,
            'Password does not match',
            400,
          );
        }
        return errorHandler.serverResponse(
          res,
          'User is not yet registered with this email',
          404,
        );
      }
      return errorHandler.validationError(res, result);
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }

  static currentProfile(userDetails, res) {
    if (userDetails) {
      const user = { isAuth: true, ...userDetails._doc };
      Reflect.deleteProperty(user, 'password');
      return user;
    }
    return errorHandler.serverResponse(res, 'User does not exist', 400);
  }

  static async logOut(userDetails, res) {
    try {
      const result = await userRepository.updateUser(
        { _id: userDetails._id },
        { token: '' },
      );
      if (result) {
        return true;
      }
      return false;
    } catch (e) {
      LoggerInstance.error(e);
      throw e;
    }
  }
}
