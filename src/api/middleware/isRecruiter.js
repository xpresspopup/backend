const isRecruiter = (req, res, next) => {
  if (req.user.userType === 'recruiter') {
    return next();
  }
  return res.status(401).json({
    status: 401,
    message: 'You cannot make this call',
  });
};
export default isRecruiter;
