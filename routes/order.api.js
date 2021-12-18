const express = require("express");
const {
    getSingleOrder,
    getAllOrder,
    getSingleOrderByAdmin,
} = require("../controllers/order.controller");
const authenticationMiddleware = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const router = express.Router();





/**
 * Description: Get single order by id 
 * Access : owner
 */

router.get("/", isAdmin, getAllOrder);
router.get("/admin/:orderId", isAdmin, getSingleOrderByAdmin);
router.get("/:ownerId", authenticationMiddleware, getSingleOrder);


 module.exports = router;
 