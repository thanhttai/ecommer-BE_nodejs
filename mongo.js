const mongoose = require("mongoose");
const fakeProduct = require("./createProduct");
const fakeUser = require("./createUser");
const emailHelper = require("./helpers/email.helper");

const MONGO_URI = process.env.MONGO_URI
// const MONGO_URI = `mongodb+srv://localhost:21707`;

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Atlas Connection Succeeded.");
      // fakeUser();
      // fakeProduct();
      // fakeProduct(); comment out to no longer run
      // emailHelper.createTemplatesIfNotExists();
      // emailHelper.createResetPasswordTemplate();
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);