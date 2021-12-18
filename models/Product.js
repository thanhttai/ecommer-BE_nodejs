const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = Schema(

  {
    
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true},
    category: { type: String, required: true},
    image: {type: String, required: true},
    ratings: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User" },
        rate: { type: Number, enum: [1, 2, 3, 4, 5] },
        required:false
      },
    ],
    shipping: { type: String, required: false, default: true },
    feature: { type: String, required: false, default:true},
    averageRate: { type: Number, default: 0 , default: false },
    company:{ type:String, required: false},
    colors:[],
    isDeleted: { type: Boolean, default: false },
    reviews: { type: String, enum: [1, 2, 3, 4, 5], default:5 , required:false},
    stars:{ type: String,required: false, default:5},
    images: [
      {
        url: {type: String, required: false},
        width: {type: Number, required: false},
        height: {type: Number, required: false}
      }
    ]
  },
  { timestamps: true }
);


const Product = mongoose.model("Product", productSchema);
module.exports = Product;