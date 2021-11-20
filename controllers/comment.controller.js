const sendResponse = require("../helpers/sendResponse");
const Cart = require("../models/Cart");
const Comment = require("../models/Comment");

const commentController = {};

commentController.createComment = async (req, res, next) => {
    let result;
    try {
        const author = req.currentUser._id;
        let { content } = req.body;
        const { productId } = req.params;
        if (!author || !productId || !content) throw new Error("Need inputs");
        //a comment content should be at least 50 words
        content.split(" ")
        if (content.trim().split(" ").length < 10) {
            throw new Error("Please add content at lease 10 words")
        };

        //user bought product
        const found = await Cart.findOne(
            {
                owner: author,
                status: "paid",
                "products.productId": productId,
                
            }
        );
        if (!found) throw new Error("Please pay before comment");
        
        const newComment = {
            author,
            content,
            targetProduct: productId,
        }
        result = await Comment.create(newComment);

    } catch (error) {
        return next(error);
    }
    sendResponse(res, 200, true, result, false, "Successfully create comment")
}
module.exports = commentController;
