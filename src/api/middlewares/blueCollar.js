const isblueCollar = (req, res, next) => {
  if (req.user.userType === 'blueCollar') {
    return res.status(401).json({
      status: 401,
      message: 'You cannot make this call',
    });
  }
  return next();
};
export default isblueCollar;