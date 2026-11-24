let express = require("express");
const authRoutes = require("./authRoutes");
const orderRoutes = require("./orderRoutes");
let webRoutes = express.Router();
const sliderRoutes = require("./sliderRoutes");
const chairCollectionRoutes = require("./chairCollectionRoutes");
const featureProductRoutes = require("./featureProductRoutes");

webRoutes.use("/auth", authRoutes);
webRoutes.use("/order", orderRoutes);
webRoutes.use("/", sliderRoutes);
webRoutes.use("/", chairCollectionRoutes);
webRoutes.use("/", featureProductRoutes);

module.exports = webRoutes;
