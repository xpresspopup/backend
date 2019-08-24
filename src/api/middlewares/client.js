const client = (req, res, next) => {
  if (req.user.userType === 'client') {
    return res.status(401).json({
      status: 401,
      message: 'You cannot make this call',
    });
  }
  return next();
};
export default client;
