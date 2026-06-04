const Order = require("../Models/OrderModel");

// ── Helper: generate a unique order ID ───────────────────────────────────────
async function generateOrderId() {
  const count = await Order.countDocuments();
  return `EZ-${10001 + count}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/orders  — place a new order
// ─────────────────────────────────────────────────────────────────────────────
const PlaceOrder = async (req, res) => {
  try {
    const { userEmail, items, address, paymentMethod, subtotal, deliveryFee, total } = req.body;

    if (!userEmail || !items?.length || !address || !total) {
      return res.status(400).json({ message: "Missing required order fields." });
    }

    const orderId = await generateOrderId();

    const order = new Order({
      orderId,
      userEmail: userEmail.toLowerCase(),
      items,
      address,
      paymentMethod: paymentMethod || "COD",
      subtotal,
      deliveryFee: deliveryFee || 0,
      total,
      status: "Confirmed",
      placedAt: new Date(),
    });

    const saved = await order.save();
    res.status(201).json({ message: "Order placed successfully.", order: saved });
  } catch (error) {
    res.status(500).json({ message: "Error placing order.", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/orders/user/:email  — get all orders for a user
// ─────────────────────────────────────────────────────────────────────────────
const GetUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userEmail: req.params.email.toLowerCase(),
    }).sort({ placedAt: -1 });

    res.status(200).json({ orders, count: orders.length });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders.", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/orders/:orderId  — get a single order by orderId string
// ─────────────────────────────────────────────────────────────────────────────
const GetOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order.", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/orders/:orderId/status  — update order status (admin)
// ─────────────────────────────────────────────────────────────────────────────
const UpdateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Choose from: ${validStatuses.join(", ")}` });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found." });
    res.status(200).json({ message: "Order status updated.", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status.", error: error.message });
  }
};

module.exports = { PlaceOrder, GetUserOrders, GetOrderById, UpdateOrderStatus };
