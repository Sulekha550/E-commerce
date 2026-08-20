const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress, couponCode, paymentMethod } = req.body;
    if (!items?.length) return res.status(400).json({ message: "Cart is empty" });

    let subtotal = 0;
    const normalized = [];

    for (const item of items) {
      const p = await Product.findById(item.product);
      if (!p) return res.status(404).json({ message: `Product not found: ${item.name}` });
      if (p.stock < item.quantity) return res.status(400).json({ message: `Not enough stock for ${p.name}` });
      subtotal += p.price * item.quantity;
      normalized.push({ product: p._id, name: p.name, image: p.image, price: p.price, quantity: item.quantity });
      p.stock -= item.quantity;
      await p.save();
    }

    let discount = 0;
    if (couponCode?.trim().toUpperCase() === "BREW20") {
      discount = Math.round(subtotal * 0.20);
    }

    const shippingFee = subtotal > 500 ? 0 : 50;
    const totalAmount = Math.max(0, subtotal - discount + shippingFee);

    const order = await Order.create({
      user: req.user.id,
      items: normalized,
      subtotal,
      discount,
      shippingFee,
      totalAmount,
      couponCode: couponCode || "",
      paymentMethod: paymentMethod || "Credit Card",
      shippingAddress,
      status: "Placed"
    });

    res.status(201).json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get("/my-orders", protect, async (req, res) => {
  try { res.json(await Order.find({ user: req.user.id }).sort({ createdAt: -1 })); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get("/", protect, adminOnly, async (req, res) => {
  try { res.json(await Order.find().populate("user", "name email").sort({ createdAt: -1 })); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const allowed = ["Order Placed", "Placed", "Confirmed", "Preparing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid status" });
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;

