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
}
