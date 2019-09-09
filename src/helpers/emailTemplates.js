export default class emailTemplate {
  static registrationEmail() {
    const html = `
    <h1>Welcome to PopExpress</h1>
    <p> We are delighted to have you on board</p>
    <p>Explore our different jobs within your locality</p>
    `;
    return html;
  }

  static successfulJobCreated(job) {
    const html = `
    <p>You have successfully created a job with Reference id ${job.reference}</p>
    
    `;
    return html;
  }

  static confirmEmail(code) {
    const html = `
    <p>Please use this confirmation code <span style= 'color: orange; font-weight: bold' >${code}</span> to continue your registation </p>
    
    `;
    return html;
  }
}
