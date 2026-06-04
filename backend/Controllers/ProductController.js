const Product = require("../Models/ProductModel");

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/products  — get all products
// ─────────────────────────────────────────────────────────────────────────────
const GetAllProducts = async (req, res) => {
  try {
    const { category, brand, search, sort } = req.query;
    let query = {};

    if (category && category !== "All Products") {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }
    if (search) {
      query.$or = [
        { name:     { $regex: search, $options: "i" } },
        { brand:    { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    let sortOption = { createdAt: -1 }; // newest first by default
    if (sort === "price_asc")  sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };

    const products = await Product.find(query).sort(sortOption);
    res.status(200).json({ products, count: products.length });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products.", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/products/:id
// ─────────────────────────────────────────────────────────────────────────────
const GetProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product.", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/products  — admin only
// ─────────────────────────────────────────────────────────────────────────────
const AddProduct = async (req, res) => {
  try {
    const { name, category, brand, price, mrp, unit, badge, image } = req.body;

    if (!name || !category || price == null) {
      return res.status(400).json({ message: "Name, category and price are required." });
    }

    const product = new Product({ name, category, brand, price, mrp, unit, badge, image });
    const saved = await product.save();
    res.status(201).json({ message: "Product added successfully.", product: saved });
  } catch (error) {
    res.status(500).json({ message: "Error adding product.", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/products/:id  — admin only
// ─────────────────────────────────────────────────────────────────────────────
const UpdateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ message: "Product updated.", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating product.", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/products/:id  — admin only
// ─────────────────────────────────────────────────────────────────────────────
const DeleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product.", error: error.message });
  }
};

module.exports = { GetAllProducts, GetProductById, AddProduct, UpdateProduct, DeleteProduct };
