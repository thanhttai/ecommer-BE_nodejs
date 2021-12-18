const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    status: { type: String, enum: ["pending", "success"], default: "pending" },
    owner:{ type: Schema.Types.ObjectId, ref: "User", required: true },
    cart: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Cart",
    },
    isDeleted: { type: Boolean, default: false },
    country: { type: String, required: true},
    city: { type: String, required: true},
    phoneNumber: { type: String, required: true},
    postalCode: { type: String, required: true},
    address: { type: String, required: true},
    paymentMethod: { type: String, required: true},
    totalPrice: { type: String, required: true},
    
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
