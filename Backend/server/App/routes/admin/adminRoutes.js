let express = require("express");
const colorRoutes = require("./colorRoutes");
const materialRoutes = require("./materialRoutes");
const authRoutes = require("./authRoutes");
const sliderRoutes = require("./sliderRoutes");
const faqRoutes = require("./faqRoutes");
const countryRoutes = require("./countryRoutes");
const categoryRoutes = require("./categoryRoutes");
const subCategoryRoutes = require("./subCategoryRoutes");
const subSubCategoryRoutes = require("./subSubCategoryRoutes");
const productRoutes = require("./productRoutes");
const whyChooseUsRoutes = require("./whyChooseUsRoutes");

let adminRoutes = express.Router();

//http://localhost:8000/admin/color
adminRoutes.use("/color", colorRoutes);

//http://localhost:8000/admin/material
adminRoutes.use("/material", materialRoutes);

//http://localhost:8000/admin/auth
adminRoutes.use("/auth", authRoutes);

//http://localhost:8000/admin/slider
adminRoutes.use("/slider", sliderRoutes);

// http://localhost/admin/faq
adminRoutes.use("/faq", faqRoutes);

// http://localhost/admin/faq
adminRoutes.use("/country", countryRoutes);

// http://localhost/admin/category
adminRoutes.use("/category", categoryRoutes);

adminRoutes.use("/subCategory", subCategoryRoutes);

adminRoutes.use("/sub-sub-category", subSubCategoryRoutes);

adminRoutes.use("/product", productRoutes);

adminRoutes.use("/why-choose-us", whyChooseUsRoutes)

module.exports = adminRoutes;
