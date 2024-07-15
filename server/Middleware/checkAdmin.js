import jwt from 'jsonwebtoken';
import HandleError from '../Utils/handleError.js';
import User from '../Models/userModel.js';

export const checkAdmin = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new HandleError('You are not logged in! Please log in to get access.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new HandleError('The user belonging to this token does no longer exist.', 401));
    }

    if (currentUser.role !== 'admin') {
      return next(new HandleError('You do not have permission to perform this action.', 403));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return next(new HandleError('Invalid token. Please log in again!', 401));
  }
};
