const  mongoose = require('mongoose') 
const  jwt = require("jsonwebtoken") 
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  token: {
    type: String,
    unique: true,
  },
});

tokenSchema.methods.clearExpiredTokens = async function () {
  try {
    const tokens = await Token.find({});
    for (const token of tokens) {
      const { exp } = jwt.decode(token.token);
      if (Date.now() >= exp * 1000) {
        await Token.findOneAndDelete({ token: token.token });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;