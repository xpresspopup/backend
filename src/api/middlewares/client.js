const client = (req, res, next) => {
  if (req.user.userType === 'client') {
    return next();
  }
  return res.status(401).json({
    status: 401,
    message: 'You cannot make this call',
  });
};
export default client;
