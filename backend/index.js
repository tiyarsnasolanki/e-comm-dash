require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();
const PORT = process.env.PORT || 5000;
const jwtKey = process.env.JWT_KEY || "e-comm-secret";

/* ─────────────── Middleware ─────────────── */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ───────────── Auth Middleware ───────────── */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

/* ───────────── Multer Config ───────────── */
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads/"),
  filename: (_, file, cb) =>
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

/* ───────────── Flexible Multipart Handler ───────────── */
const handleMultipartOrJson = (req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data")) {
    upload.single("image")(req, res, (err) => {
      if (err) return res.status(400).json({ error: "File upload failed." });
      next();
    });
  } else {
    express.json()(req, res, next);
  }
};

/* ───────────── Admin Seeder ───────────── */
const createDefaultAdmin = async () => {
  const adminEmail = "admin@ecomm.com";
  try {
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const hash = await bcrypt.hash("Admin@123", 10);
      await new User({
        username: "Admin",
        email: adminEmail,
        password: hash,
        role: "admin",
      }).save();
      console.log(" Admin created: admin@ecomm.com / Admin@123");
    } else {
      console.log("Admin already exists");
    }
  } catch (err) {
    console.error(" Admin creation failed:", err.message);
  }
};

/* ───────────── Auth Routes ───────────── */

// Register
app.post("/register", async (req, res) => {
  const { username, email, password, role = "user" } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields are required." });

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ error: "Email already registered." });

    const hash = await bcrypt.hash(password, 10);
    const user = await new User({ username, email, password: hash, role }).save();

    const token = jwt.sign({ id: user._id, role: user.role }, jwtKey, {
      expiresIn: "2h",
    });

    res.status(201).json({ token, username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Registration failed." });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "Email, password, and role are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // 3. Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // 4. Restrict admin access to specific email + role
    if (
      role === "admin" &&
      (user.email !== "admin@ecomm.com" || user.role !== "admin")
    ) {
      return res.status(403).json({ error: "Invalid admin credentials." });
    }

    // 5. Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, jwtKey, {
      expiresIn: "2h",
    });

    // 6. Send response
    res.json({ token, username: user.username, role: user.role });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed." });
  }
});


/* ───────────── Product Routes ───────────── */

// Add product
app.post("/add-product", verifyToken, upload.single("image"), async (req, res) => {
  const { name, price, category, company, userId } = req.body;
  const image = req.file?.filename;

  if (!name || !price || !category || !company || !userId || !image)
    return res.status(400).json({ error: "All product fields + image required." });

  try {
    const product = await new Product({ name, price, category, company, userId, image }).save();
    res.status(201).json(product);
  } catch {
    res.status(500).json({ error: "Failed to add product." });
  }
});

// Get all products
app.get("/products", verifyToken, async (_, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

// Get single product by ID
app.get("/product/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send({ error: "Product not found" });
    res.send(product);
  } catch (error) {
    console.error("Fetch product error:", error);
    res.status(500).send({ error: "Failed to fetch product" });
  }
});

// Search products
app.get("/search/:key", verifyToken, async (req, res) => {
  const regex = { $regex: req.params.key, $options: "i" };
  try {
    const results = await Product.find({
      $or: [{ name: regex }, { category: regex }, { company: regex }],
    });
    res.json(results);
  } catch {
    res.status(500).json({ error: "Search failed." });
  }
});

// Delete product
app.delete("/product/:id", verifyToken, async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch {
    res.status(500).json({ error: "Delete failed." });
  }
});

// ✅ Update product with or without new image
app.put("/product/:id", verifyToken, handleMultipartOrJson, async (req, res) => {
  try {
    const { name, price, category, company } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateFields = {
      ...(name && { name }),
      ...(price && { price }),
      ...(category && { category }),
      ...(company && { company }),
    };

    if (image) {
      updateFields.image = image;
    }

    const result = await Product.updateOne(
      { _id: req.params.id },
      { $set: updateFields }
    );

    res.send(result);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).send({ error: "Failed to update product" });
  }
});

/* ───────────── Users & Profile ───────────── */

// Get all users
app.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// Get logged-in user's profile
app.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to fetch user." });
  }
});

/* ───────────── Start Server ───────────── */
app.listen(PORT, async () => {
  await createDefaultAdmin();
  console.log(` Server running at http://localhost:${PORT}`);
});
