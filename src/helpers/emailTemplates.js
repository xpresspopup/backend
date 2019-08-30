export default class emailTemplate {
  static registerationEmail(code) {
    const html = `
    <h1>Welcome to PopExpress</h1>
    <p> We are delighted to have you on board</p>
    ,p>Please use this activation code <span> <b>${code}</b> </span> to finalize your registration</p>
    `;
    return html;
  }

  static successfulJobCreated(job) {
    const html = `
    <p>You have successfully created a job with Reference id ${job.reference}</p>
    
    `;
    return html;
  }
}
