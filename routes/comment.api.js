const express = require("express");
const { createComment, getAllComments,deleteComment,updateComment } = require("../controllers/comment.controller");

const authenticationMiddleware = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const router = express.Router();

/**
 * Description: Get all comment of 1 product
 * Access : public
 */
router.get("/:productId", getAllComments);

/**
 * Description: Update a comment
 * Access : public
 */
router.put("/:commentId", authenticationMiddleware, updateComment);
/**
 * Description:  Create comment
 * Access : Admin require
 */
router.post("/:productId", authenticationMiddleware, createComment);

/**
 * Description: Delete comment
 * Access : authenticated user
 */
router.delete("/:reviewId",authenticationMiddleware, deleteComment);

module.exports = router;