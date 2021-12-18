// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const JWT_MY_SECRET = process.env.JWT_MY_SECRET;
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_MY_SECRET = process.env.JWT_MY_SECRET;
const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ["admin", "guest"], default: "guest" },
    currentBalance: { type: Number, default: 0 },
    emailVerificationCode: String,
    isEmailVerified: { type: Boolean, default: false },
    avatar: { type: String, default: "https://s199.imacdn.com/ta/2016/10/28/256321b11748bca2_8551d96990e1683b_27534214776658784154671.jpg"}
  },
  {
    timestamps: true,
  }
);
// userSchema.statics.findOrCreate = async (profile)=>{
//   try {
//     let user = await User.findOne({ email: profile.email })
//     if (!user) {
//       let newPassword =
//         profile.password || "123";
//       const salt = await bcrypt.genSalt(10);
//       newPassword = await bcrypt.hash(newPassword, salt);

//       user = await User.create({
//         name: profile.name,
//         email: profile.email,
//         password: newPassword,
//         avatar: profile.avatarUrl,
//         googleId: profile.googleId,
//         facebookId: profile.facebookId,
//         displayName: profile.displayName
//       })
//     }
//     return user
//   } catch(err){
//     console.log(err)
//   }
// }

// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj._id;
//   delete obj.__v;
//   delete obj.googleId;
//   delete obj.password;
//   delete obj.createdAt;
//   delete obj.updatedAt;  
//   delete obj.facebookId;
//   return obj;
// };

// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password, function (_, isMatch) {
//     return isMatch;
//   });
// };

// userSchema.methods.generateToken = async function () {
//   console.log(JWT_MY_SECRET,'huhuhu')
//   const accessToken = await jwt.sign({ _id: this._id }, 'hello', {
//     expiresIn: "365d",
//   });
//   return accessToken;
// };

// const User = mongoose.model("User", userSchema);
// module.exports = User;


userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_MY_SECRET);
  return accessToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;