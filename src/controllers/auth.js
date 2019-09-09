/* eslint-disable no-tabs */
import authService from '../services/auth';
import LoggerInstance from '../loaders/logger';
export default class authController {
  // constructor({ authService, logger }) {
  //   this.authService = authService;
  // this.logger = logger;
  // }

  static async userSignUp(req, res) {
    try {
      const userData = req.body;
      const ipAddress =				(req.headers['x-forwarded-for'] || '').split(',').pop()
				|| req.connection.remoteAddress
				|| req.socket.remoteAddress
				|| req.connection.socket.remoteAddress;
      userData.ipAddress = ipAddress;
      await authService.addUser(userData, res);
      return res.status(201).json({ message: 'User registered succesfully' });
    } catch (error) {
      LoggerInstance.error(error);
    }
  }

  static async userSignIn(req, res) {
    try {
      const userData = req.body;
      const { firstname, lastname, token } = await authService.verifyUserSignIn(
        userData,
        res,
      );
      return res.status(201).json({
        message: 'Login successfully',
        firstname,
        lastname,
        token,
      });
    } catch (error) {
      LoggerInstance.error(error);
    }
  }

  static async userCurrentProfile(req, res) {
    const userDetails = req.user;
    const user = await authService.currentProfile(userDetails, res);
    return res.status(200).json({
      ...user,
    });
  }

  static async userLogOut(req, res) {
    const userDetails = req.user;
    const token = await authService.logOut(userDetails, res);
    if (token) {
      return res.status(200).json({
        message: 'Logout success',
      });
    }
    return LoggerInstance.error('Unable to logout');
  }

  static async updateUser(req, res) {
    try {
      const userDetails = req.body;
      const userValue = req.user;
      const result = await authService.updateUserProfile(
        userDetails,
        res,
        userValue,
      );
      if (result) {
        return res.status(200).json({ message: 'User updated successfully' });
      }
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async updateProfilePicture(req, res) {
    try {
      const profilePic = req.files[0].path;
      const userValue = req.user;
      const result = await authService.uploadPicture(
        profilePic,
        userValue,
        res,
      );
      if (result) {
        return res
          .status(200)
          .json({ message: 'profile picture uploaded succesfully' });
      }
      return false;
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async verifySignUp(req, res) {
    try {
      const { confirmCode, email } = req.body;
      const result = await authService.verifyRegUser(confirmCode, email, res);
      if (result) {
        return res
          .status(200)
          .json({ message: 'User registration completed, Please login' });
      }
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async uploadPicture(req, res) {
    try {
      const profilePic = req.files[0].path;
      const userValue = req.user;
      const result = await authService.uploadPicture(
        profilePic,
        userValue,
        res,
      );
      if (result) {
        return res.status(200).json({ mesage: 'Image uploaded successfully' });
      }
      return false;
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }
}
