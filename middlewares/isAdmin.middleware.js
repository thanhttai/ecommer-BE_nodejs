const isAdmin = (req, res, next) => {
  //assume that i am authicated at least
  try {
    if (req.currentUser.role !== "admin")
      throw new Error(
        "you need to be admin to destroy the world. now subribe to this channel for admin access"
      );
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAdmin;
