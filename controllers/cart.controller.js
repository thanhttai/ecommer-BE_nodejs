const Cart = require("../models/Cart");

const Product = require("../models/Product");
const sendResponse = require("../helpers/sendResponse");
const User = require("../models/User");
const Order = require("../models/Order");
const cartController = {};

cartController.createCart = async (req, res, next) => {
  //create a cart with the first product
 
  let test;
  let result;
  try {
    //get inputs
    const owner = req.currentUser._id;
    const { productId } = req.params;
    let { qty,color } = req.body[0];
    // console.log(qty,color, 'haha')
    qty = parseInt(qty);
    const body = req.body;
    // console.log(body, 'huhu')

    //check if input is enough
    if (!productId || typeof qty !== "number") {
      throw new Error("Missing info");
    }
    //check if qty is a positive number
    if (qty < 0) {
      throw new Error("qty invalid");
    }
    //check if user already have a cart active
    const activeCart = await Cart.findOne({owner, status: "active" });
    // console.log(activeCart, 'activeCart')  
    if (activeCart) {
   
        // if(product.productId) throw new Error("missing productId")
        // const qty = parseInt(product.qty); //check
        // const productId = product.productId; //check
        //check if valid in here
        activeCart.products.forEach((product,index) => {
          // console.log('-------')
          // console.log(body[0].productId === product.productId._id.toString(),'------')
          if(product.productId._id.toString() === body[0].productId){
            // console.log('success',  product.qty + body[0].qty)
            // console.log('success',  product)
            let amount = product.qty + body[0].qty
            // const index = activeCart.products.indexOf(product);
            // if (index > -1) {
            //   activeCart.products.splice(index, 1);
            //   console.log('sendResponse', activeCart.products)

            //   }
            activeCart.products =  activeCart.products.filter(item=>{
              // console.log( item, ,'success')
              return item.productId._id.toString() !== body[0].productId
            })
            // console.log(activeCart.products, 'success')
            activeCart.products.push({productId, qty: amount, color})
          }else{
            activeCart.products.push({ productId, qty,color });
          }
       
        })
        // activeCart.products.push({ productId, qty });
      
     
      // console.log(activeCart,'tai oiiii')
      result = await Cart.findByIdAndUpdate(activeCart._id, activeCart, {
        new: true,
      });
      // console.log(result, 'neeeeee')
      return sendResponse(
        res,
        200,
        true,
        { result, test },
        false,
        "Successfully update cart"
      );
     
    }
    //check if product id is true
    const found = await Product.findById(productId);
    if (!found) {
      throw new Error("product not found");
    }
    //create product choice object
    const productChoice = { productId, qty, color }; 
     
    //create new cart object to be add to db
    const newCart = {
      owner,
      products: [productChoice],
    };
    //create new cart in model
    result = await Cart.create(newCart);

    
    //get info from owner-User ref  and products.productId-Product ref
    // result = await result.populate([
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
    { result, test },
    false,
    "Successfully create shopping cart"
  );
};

cartController.addProductToCart = async (req, res, next) => {
  //INPUT: owner, productId and qty
  //Operation: find active cart => push new product to found
  // => Find by id and update by found
  const owner = req.currentUser._id; //safe
  const body = req.body;

  let result; //safe

  try {
    const cartToUpdate = await Cart.findOne({ owner, status: "active" });
    if(body[0].qty < 1) throw new Error("missing input qty");
    body.map((product) => {
      const qty = parseInt(product.qty); //check
      const productId = product.productId; //check
      //check if valid in here
      cartToUpdate.products.push({ productId, qty });
    });
    console.log(cartToUpdate)
    result = await Cart.findByIdAndUpdate(cartToUpdate._id, cartToUpdate, {
      new: true,
    });
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    body,
    false,
    "Successfully create shopping cart"
  );
};

cartController.removeProductFromCart = async (req, res, next) => {
  let result;
  let {cartId,productId, qty} = req.params
  console.log(cartId, 'cardId');
  console.log(productId, qty, 'productid qty ');

  // try {
  //  if(productId && qty && cartId) {
  //   qty = parseInt(qty);
  //   const cartFound = await Cart.findById(cartId);
  //   console.log(cartFound, 'hahaahahah')
  //   // const newProductsList = cartFound.products
  //   //   .map((existed) => {
  //   //     const newProduct = {
  //   //       productId: existed.productId,
  //   //       qty: existed.productId.equals(productId)
  //   //         ? existed.qty - qty
  //   //         : existed.qty,
  //   //     };
  //   //     return newProduct;
  //   //   })
  //   //   .filter((e) => e.qty > 0);
    

  //   const newProductsList = cartFound.products.filter((existed) => {
  //     if (existed.productId.equals(productId)) {
  //       existed.qty -= qty;
  //     }
  //     return existed.qty > 0;
  //   });
  //   cartFound.products = newProductsList;
  //   result = await Cart.findByIdAndUpdate(cartId, cartFound, { new: true });
  //  }
    
  // } catch (error) {
  //   return next(error);
  // }
  // return sendResponse(
  //   res,
  //   200,
  //   true,
  //   result,
  //   false,
  //   "Successfully remove product from cart"
  // );
  
};

cartController.getSingleCart = async (req, res, next) => {
  let result;
  const { cartId } = req.query;
  const owner = req.currentUser._id;
  
  try {
    result = await Cart.findOne({ owner, status:'active' }).populate(
      "products.productId"
      );
      
      console.log(result, 'owner')
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "Successfully get single shopping cart"
  );
};

cartController.getAll = async (req, res, next) => {
  let result = {};
  //pagination
  try {
    result.carts = await Cart.find({}).populate([
      "owner",
      "products.productId",
    ]);
    result.count = result.carts.length;
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "Successfully get all cart"
  );
};

cartController.getAllOwn = async (req, res, next) => {
  let result = {};
  //pagination
  let owner = req.currentUser._id;
  try {
    result.carts = await Cart.find({ owner }).populate("products.productId");
    result.count = result.carts.length;
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "Successfully get all cart"
  );
};
cartController. payCart = async (req, res, next) => {
  let result = {};
  let order;
  const { cartId } = req.params;
  const {city, country, address, postalCode,phoneNumber,paymentMethod , totalPrice} = req.body;
  const { currentBalance, _id } = req.currentUser;
  
  try {
    console.log(cartId);
    let found = await Cart.findById(cartId).populate("products.productId");
    console.log(found);
    const productsToUpdate = await Promise.all(
      found.products.map(async (request) => {
        const existed = await Product.findById(request.productId._id);
        let newStock = existed.stock;
        if (request.qty <= existed.stock) {
          newStock = existed.stock - request.qty;
        } else {
          console.log(
            "Sold out",
            request.productId.name,
            request.qty,
            existed.stock
          );
          throw new Error("Sold out product");
        }

        return { _id: existed._id, newStock };
      })
    );

    const total = found.products.reduce(
      (acc, cur) => acc + cur.qty * cur.productId.price,
      0
    );
    if (found.status === "paid")
      throw new Error("cart already pay, but i would appricate the charity");

    if (total > currentBalance) throw new Error("404 - Money not found");
    const newBalance = currentBalance - total;
    result.cart = await Cart.findByIdAndUpdate(
      cartId,
      { status: "paid" },
      { new: true }
    );
    const user = await User.findByIdAndUpdate(
      _id,
      { currentBalance: newBalance },
      { new: true }
    );
    result.currentBalance = user.currentBalance;

    //update the stock
    await Promise.all(
      productsToUpdate.map(async (product) => {
        await Product.findByIdAndUpdate(product._id, {
          stock: product.newStock,
        });
      })
    );

    //create product choice object
    let productChoice = await Cart.findById(cartId).populate([
      "owner",
      "products.productId",
    ]);

    let ownerChoice = await User.findById(_id)
    // const productChoice = { productId, qty, color }; 
     
    //create new cart object to be add to db
    const newCart = {
      cart: productChoice,
      owner: ownerChoice,
      address,
      city,
      country,
      phoneNumber,
      postalCode,
      paymentMethod,
      totalPrice
    };
    //create new cart in model
     order = await Order.create(newCart);



  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    [result, order],
    false,
    "Successfully  pay for cart shopping cart and order"
  );
};

cartController.deleteCart = async (req, res, next) => {
  let result;
  const { cartId } = req.params;
  const owner = req.currentUser._id;
  try {
    result = await Cart.findByIdAndDelete(cartId);
  } catch (error) {
    return next(error);
  }
  return sendResponse(res, 200, true, null, false, "Successfully delete cart");
};

module.exports = cartController;
