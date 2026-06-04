const express = require("express");
const router  = express.Router();
const {
  GetAllProducts,
  GetProductById,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../Controllers/ProductController");
const { verifyToken, verifyAdmin } = require("../Utils/authMiddleware");

// Public — anyone can browse products
router.get("/",    GetAllProducts);
router.get("/:id", GetProductById);

// Admin only — requires JWT + admin role
router.post("/",    verifyToken, verifyAdmin, AddProduct);
router.put("/:id",  verifyToken, verifyAdmin, UpdateProduct);
router.delete("/:id", verifyToken, verifyAdmin, DeleteProduct);

module.exports = router;
