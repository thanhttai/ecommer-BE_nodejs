// const {
//     AppError,
//     catchAsync,
//     sendResponse,
//   } = require("../helpers/utils.helper");
const catchAsync = require("../helpers/catchAsync.js");
  const sendResponse = require("../helpers/sendResponse");
  const User = require("../models/User");
  const bcrypt = require("bcryptjs");
  const authController = {};
  const {OAuth2Client} = require('google-auth-library');
  const fetch =  require("node-fetch");

  function toSlug(str) {
	// Chuyển hết sang chữ thường
	str = str.toLowerCase();     
	// xóa dấu
	str = str
		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, 'd');
	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, '');
	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, '-');
	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, '-');
	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, '');
	return str;
}
  
  // authController.loginWithEmail = catchAsync(async (req, res, next) => {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ email });
  //   if (!user)
  //     return next(new AppError(400, "Invalid credentials", "Login Error"));
  
  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) throw new Error("Wrong password Login Error")
  
  //   accessToken = await user.generateToken();
  //   return sendResponse(
  //     res,
  //     200,
  //     true,
  //     { user, accessToken },
  //     null,
  //     "Login successful"
  //   );
  // });
  
  // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  
  // authController.loginWithGoogle = catchAsync (async (req, res, next) => {
  //   const {idToken} = req.body;
  //   console.log("idToken", idToken);
  //   const ticket = await client.verifyIdToken ({
  //     idToken: idToken,
  //     audience: process.env.GOOGLE_CLIENT_ID,
  //     });
  //   console.log("ticket nè", ticket);
  //   const {name, family_name, picture, sub,email} = ticket.getPayload();
  //   let user = await User.findOne({email});
  //   if(!user) {
  //     user = await User.create({
  //       name,
  //       email, 
  //       avatar: picture, 
  //       googleId: sub,
  //       password:123,
  //       displayName:toSlug(name),
    
  //   });
  //   }
  //   const accessToken = await user.generateToken();
  
  //   return sendResponse(
  //     res, 
  //     200,
  //     true,
  //     {user, accessToken},
  //     null,
  //     "Successfully sign up with google"
  //   );
  // });
  
  // authController.loginWithFacebook = catchAsync(async (req, res, next) => {
  //   const {userId, access_token} = req.body
  //   console.log("userId", userId, access_token)
  //   let graphUrl = `https://graph.facebook.com/v2.11/${userId}?fields=id,email,name,picture&access_token=${access_token}`
  
  //   const response = await fetch(graphUrl,{
  //     method:"GET"
  //   })
  //   const data = await response.json()
  //   console.log("response", data)
  
  //   const {id, email, name, picture:{data:{url}}} = data
  
  //   let user = await User.findOrCreate(
  //     { email, 
  //       name,
  //       facebookId: id,
  //       avatar: url,
  //       displayName: toSlug(name),
  //       password:123
  //     }) 
  //   const accessToken = await user.generateToken()
  
  //   return sendResponse(
  //     res,
  //     200,
  //     true,
  //     { user, accessToken },
  //     null,
  //     "Login successful"
  //   );
  // });
  
  module.exports = authController;
  