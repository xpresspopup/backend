import listingService from '../services/listing';
import LoggerInstance from '../loaders/logger';
export default class Listing {
  // constructor({ authService, logger }) {
  //   this.authService = authService;
  // this.logger = logger;
  // }
  static async createListing(req, res) {
    try {
      const data = req.body;
      const userDetails = req.user;
      await listingService.addBusiness(data, userDetails, res);
      return res.status(201).json({ message: 'Business awaiting approval' });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }
}
