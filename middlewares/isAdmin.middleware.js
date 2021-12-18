const isAdmin = (req, res, next) => {
  //assume that i am authicated at least
  console.log(req.headers.role);
  try {
    if (req.headers.role !== "admin")
    throw new Error(
      "you need to be admin to destroy the world. now subribe to this channel for admin access"
      );
      console.log(req.headers.role === "admin"); 
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAdmin;
