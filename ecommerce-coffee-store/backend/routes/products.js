const router = require("express").Router();
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, bestseller, featured, sort } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }
    if (category && category !== "All") filter.category = category;
    if (bestseller === "true") filter.isBestseller = true;
    if (featured === "true") filter.isFeatured = true;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortObj = { createdAt: -1 };
    if (sort === "price-asc") sortObj = { price: 1 };
    else if (sort === "price-desc") sortObj = { price: -1 };
    else if (sort === "rating") sortObj = { rating: -1 };
    else if (sort === "name") sortObj = { name: 1 };

    res.json(await Product.find(filter).sort(sortObj));
  } catch (e) { res.status(500).json({ message: e.message }); }
});


router.get("/:id", async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post("/", protect, adminOnly, async (req, res) => {
  try { res.status(201).json(await Product.create(req.body)); }
  catch (e) { res.status(400).json({ message: e.message }); }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
