import jobService from '../services/job';
import LoggerInstance from '../loaders/logger';
export default class jobController {
  // constructor({ authService, logger }) {
  //   this.authService = authService;
  // this.logger = logger;
  // }

  static async postJob(req, res) {
    try {
      const jobData = req.body;
      const userDetails = req.user;
      await jobService.addJob(jobData, userDetails, res);
      return res.status(201).json({ message: 'Job created succesfully' });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async getJob(req, res) {
    try {
      const { jobType } = req.query;
      const doc = await jobService.allJobs(res, jobType);
      return res.status(201).json({ doc, count: doc.length });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async getJobWithin(req, res) {
    try {
      const jobDetails = req.query;
      const { user } = req;
      const doc = await jobService.jobsWithin(res, jobDetails, user);
      if (doc) return res.status(201).json({ doc });
      return false;
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async searchByCategory(req, res) {
    try {
      const { category } = req.query;
      const doc = await jobService.jobsByCategory(res, category);
      return res.status(200).json({ doc });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async getJobById(req, res) {
    try {
      const { id } = req.params;
      const doc = await jobService.jobById(res, id);
      if (doc) return res.status(200).json(doc);
      throw new Error('Error getting jobs');
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }

  static async updateJobById(req, res) {
    try {
      const { id } = req.params;
      const doc = await jobService.jobUpdateById(res, id);
      return res.status(200).json(doc);
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error(error);
    }
  }
}
