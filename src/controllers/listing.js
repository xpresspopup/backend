/* eslint-disable no-restricted-globals */
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

  static async updateListing(req, res) {
    try {
      const data = req.body;
      const userDetails = req.user;
      const { id } = req.params;
      await listingService.updateBusiness(data, userDetails, id, res);
      return res.status(201).json({ message: 'Business updated successfully' });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async approveListing(req, res) {
    try {
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

  static async getAllListing(req, res) {
    try {
      const { type } = req.query;
      const doc = await listingService.getAllListing(type, res);
      if (doc) {
        return res.status(201).json({ doc });
      }
      throw new Error('error getting business listing');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async getListingById(req, res) {
    try {
      const { id } = req.params;
      const doc = await listingService.getListingById(id, res);
      if (doc) {
        return res.status(201).json({ doc });
      }
      throw new Error('error getting business listing');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  // response is not giving me the right response by distance
  static async within(req, res) {
    try {
      const {
        distance, latitude, longitude, category,
      } = req.query;
      if (
        isNaN(parseInt(distance, 10))
				|| isNaN(parseFloat(latitude, 10))
				|| isNaN(parseFloat(longitude, 10))
      ) {
        return res.status(400).json({
          message: 'distance, longitude or latitude must be a number',
        });
      }
      const listingDetails = {
        distance: parseInt(distance, 10),
        latitude: parseFloat(latitude, 10),
        longitude: parseFloat(longitude, 10),
        category,
      };
      const doc = await listingService.listingWithin(listingDetails, res);
      if (doc) {
        return res.status(201).json({ doc });
      }
      throw new Error('error getting business listing');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }
}
