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
      await jobService.addJob(jobData, res);
      return res.status(201).json({ message: 'Job created succesfully' });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error();
    }
  }

  static async getJob(req, res) {
    try {
      const { jobType } = req.query;
      const doc = await jobService.allJobs(res, jobType);
      return res.status(201).json({ doc });
    } catch (error) {
      LoggerInstance.error(error);
      throw new Error();
    }
  }
}
