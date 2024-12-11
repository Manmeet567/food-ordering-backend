const express = require("express");
const {
  signupUser,
  loginUser,
  addAddress,
  editAddress,
  removeAddress,
  addPaymentMethod,
  editPaymentMethod,
  removePaymentMethod,
  getUser,
} = require("../controllers/userController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/add-address", requireAuth, addAddress);

router.post("/add-payment-method", requireAuth, addPaymentMethod);

router.get("/:userId", requireAuth, getUser);

router.put("/address/:addressId", requireAuth, editAddress);
router.delete("/address/:addressId", requireAuth, removeAddress);

router.put("/payment-method/:paymentMethodId", requireAuth, editPaymentMethod);
router.delete(
  "/payment-method/:paymentMethodId",
  requireAuth,
  removePaymentMethod
);

module.exports = router;
