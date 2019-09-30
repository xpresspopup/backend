const isAdminOrEmployer = (req, res, next) => {
  if (req.userType === 'admin') {
    return next();
  }
  return res.status(401).json({
    status: 401,
    message: 'You cannot make this call',
  });
};
export default isAdminOrEmployer;
