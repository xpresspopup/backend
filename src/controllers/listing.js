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

  static async updateCatalogue(req, res) {
    try {
      const { catalogue } = req.body;
      const userDetails = req.user;
      const { id } = req.params;
      await listingService.updateListingCatalogue(
        catalogue,
        userDetails,
        id,
        res,
      );
      return res
        .status(201)
        .json({ message: 'Listing Catalogue updated successfully' });
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

  static async within(req, res) {
    try {
      const {
        distance, latitude, longitude, category,
      } = req.query;
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

  static async searchByCategory(req, res) {
    try {
      const { category } = req.query;
      const doc = await listingService.listingByCategory(res, category);
      return res.status(200).json({ doc });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async updateListingImage(req, res) {
    try {
      if (!req.files) {
        return res.status(400).json('Please upload a file');
      }
      const profilePic = req.files[0].path;
      const userValue = req.user;
      const { id } = req.params;
      const result = await listingService.uploadPicture(
        profilePic,
        userValue,
        id,
        res,
      );
      if (result) {
        return res.status(200).json({ message: 'Image uploaded successfully' });
      }
      throw new Error('Error uploading image');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }
}
