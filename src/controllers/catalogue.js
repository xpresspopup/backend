import catalogueService from '../services/catalogue';
import LoggerInstance from '../loaders/logger';
export default class Catalogue {
  // constructor({ authService, logger }) {
  //   this.authService = authService;
  // this.logger = logger;
  // }
  static async createCatalogue(req, res) {
    try {
      const data = req.body;
      const userDetails = req.user;
      await catalogueService.addCatalogue(data, userDetails, res);
      return res.status(201).json({ message: 'Catalogue created' });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async getAllCatalogueByUser(req, res) {
    try {
      const userDetails = req.user;
      const doc = await catalogueService.getCatalogue(userDetails, res);
      return res.status(200).json(doc);
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async updateCatalogue(req, res) {
    try {
      const userDetails = req.user;
      const { id } = req.params;
      const data = req.body;
      if (id === '' || id.trim().length !== 24) {
        throw new Error('Invalid id number');
      }

      const doc = await catalogueService.updateCatalogue(data, id);
      if (doc) return res.status(200).json({ message: 'Update successfully' });
      throw new Error('error updating catalogue');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async deleteCatalogue(req, res) {
    try {
      const userDetails = req.user;
      const { id } = req.params;
      if (id === '' || id.trim().length !== 24) {
        throw new Error('Invalid id number');
      }
      const doc = await catalogueService.deleteCatalogue(id);
      if (doc) return res.status(200).json({ message: 'Deleted successfully' });
      throw new Error('error deleting catalogue');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async getCatalogueById(req, res) {
    try {
      const userDetails = req.user;
      const { id } = req.params;
      if (id === '' || id.trim().length !== 24) {
        throw new Error('Invalid id number');
      }
      const doc = await catalogueService.getCatalogueById(id);
      if (doc) return res.status(200).json(doc);
      throw new Error('error retrieving catalogue');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async updateCatalogueImage(req, res) {
    try {
      if (!req.files) {
        return res.status(400).json('Please upload a file');
      }
      const profilePic = req.files[0].path;
      const userValue = req.user;
      const { id } = req.params;
      const result = await catalogueService.uploadPicture(
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
