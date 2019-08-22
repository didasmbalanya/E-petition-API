import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
export default (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.json({ status: 401, message: 'Access denied, No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.json({ status: 400, message: 'invalid token' });
  }
};
