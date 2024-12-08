const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const homeRoutes = require("./routes/home_page_routes");
const productRoutes = require("./routes/product_page_routes");
const cartRoutes = require("./routes/cart_routes");
const app = express();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());

app.get("/test-server", (req, res) => {
  res.send("Server is working");
});

app.use("/api/user", userRoutes);
app.use("/api/home-page", homeRoutes);
app.use("/api/product-page", productRoutes);
app.use("/api/cart", cartRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("connected to DB and server listening on port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
