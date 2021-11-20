const express = require("express");
const router = express.Router();
const authenticationMiddleware = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const passport = require("passport");
const {
  getAll,
  createByEmailPassword,
  updateById,
  deleteById,
  loginWithEmailPassword,
  createWithGoogle,
  createWithFacebook,
  verifyEmail,
  resetPassword,
} = require("../controllers/user.controller");
const imageUploadMiddleware = require("../middlewares/imageUpload.middleware");

/**
 * Description:  get all edas
 * Access : admin role required
 */
router.get("/", getAll);
/**
 * Description:  destroy the world
 * Access : public
 */
router.post("/", createByEmailPassword);

/**
 * Description:  destroy the world
 * Access : admin role required
 */
router.post("/login", loginWithEmailPassword);

/**
 * Description:  destroy the world
 * Access : authenticated user
 */
router.put(
  "/update-me",
  authenticationMiddleware,
  imageUploadMiddleware.single("image"),
  updateById
);

router.put("/reset-password", resetPassword);

router.get("/emailverification/:code", verifyEmail);
/**
 * Description:  destroy the world
 * Access : authenticated user
 */
router.delete("/delete-me", authenticationMiddleware, deleteById);

router.get(
  "/loginwithgoogle",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/login/googleok",
  passport.authenticate("google", { failureRedirect: "/notFound" }),
  createWithGoogle
);

router.get(
  "/loginwithfacebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/login/facebookok",
  passport.authenticate("facebook", {
    // failureMessage: "Cannot login to facebook",
    failureRedirect: "/notFound",
    // successRedirect: "/success",
  }),
  createWithFacebook
);

module.exports = router;