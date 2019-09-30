const isblueCollar = (req, res, next) => {
  if (req.user.userType === 'blueCollar') {
    return next();
  }
  return res.status(401).json({
    status: 401,
    message: 'You cannot make this call',
  });
};
export default isblueCollar;
