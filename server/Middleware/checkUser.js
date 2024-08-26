import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import HandleError from "../Utils/handleError.js";

// Middleware to check if the user is authenticated
export const checkUser = async (req, res, next) => {
  let token;

  // Check if the authorization header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Extract the token from the authorization header
  }

  // If no token is found, send an unauthorized error
  if (!token) {
    return next(
      new HandleError(
        "You are not logged in! Please log in to get access.",
        401
      )
    );
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user by ID from the decoded token
    const currentUser = await User.findById(decoded.id);

    // If the user does not exist, send an unauthorized error
    if (!currentUser) {
      return next(
        new HandleError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    // Attach the user object to the request object for later use
    req.user = currentUser;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // If the token is invalid or any other error occurs, send an unauthorized error
    return next(new HandleError("Invalid token. Please log in again!", 401));
  }
};
