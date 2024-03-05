import jwt from 'jsonwebtoken';
import User from '../mongodb/models/admin';

export const isLoggedIn = async (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please login to access resource',
    });
  }
  try {
    const userId = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(userId.id);
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};