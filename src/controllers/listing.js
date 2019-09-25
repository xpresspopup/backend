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

  static async approveListing(req, res) {
    try {
      const userDetails = req.user;
      const { id } = req.params;
      const result = await listingService.approveListing(id, res);
      if (result) {
        return res
          .status(201)
          .json({ message: 'Business approved successfully' });
      }
      throw new Error('Error updating business');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }
}
