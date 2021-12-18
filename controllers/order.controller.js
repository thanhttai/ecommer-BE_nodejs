const sendResponse = require("../helpers/sendResponse");
const Order = require("../models/Order");

const orderController = {};

orderController.getAllOrder = async (req, res, next) => {
  let count = 0;
  let result;
  try {
    result = await Order.find({isDeleted: false}).populate([
      {path: 'owner', select: ["name", "email"]},
      {path: 'cart', select: ["products", "status"]}
    ]);
 
    count = result.length;
  } catch (error) {
    return next(error);
  }
  // return result;
  return sendResponse(
    res,
    200,
    true,
    { result, count },
    false,
    "Successfully get all order"
  );
};

orderController.getSingleOrder = async (req, res, next) => {
    let result = {};
   const id =  req.currentUser
    const { ownerId } = req.params;
   
    try {
      if (!ownerId && id !== ownerId) throw new Error("ownerId not found, or deleted");
      result = await Order.find({owner: ownerId}).populate([
          {path: 'owner', select: ["name", "email"]},
          {path: 'cart', select: ["products", "status"]}
      ]);
    //   comments = await Comment.find({ targetProduct: productId }).populate(
    //     "author",
    //     "name"
    //   );
    // .populate([
        //   { path: "owner", select: ["name", "email"] },
        //   { path: "products.productId", select: ["name", "colors"] },
        // ]);
    } catch (error) {
      return next(error);
    }
    return sendResponse(
      res,
      200,
      true,
      result,
      false,
      "Successfully get single order"
    );
  };

  orderController.getSingleOrderByAdmin = async (req, res, next) => {
    let result = {};
    const { orderId } = req.params;
   
    try {
      if (!orderId) throw new Error("orderId not found, or deleted");
      result = await Order.findById(orderId).populate([
          {path: 'owner', select: ["name", "email"]},
          {path: 'cart', select: ["products", "status"]}
      ]);
    } catch (error) {
      return next(error);
    }
    return sendResponse(
      res,
      200,
      true,
      result,
      false,
      "Successfully get single order by admin "
    );
  };
  

  module.exports = orderController;
