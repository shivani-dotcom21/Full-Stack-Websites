const express = require("express");
const app = express(); // Yeh line add karni zaroori hai
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const adminRoutes = require("./App/routes/admin/adminRoutes");
const webRoutes = require("./App/routes/web/webRoutes");

app.use(cors());
app.use(express.json());

app.use("/uploads/category", express.static("uploads/category"));
app.use("/uploads/subcategory", express.static("uploads/subcategory"));
app.use("/uploads/subsubcategory", express.static("uploads/subsubcategory"));
app.use("/uploads/product", express.static("uploads/product"));
app.use("/uploads/whyChooseUs", express.static("uploads/whyChooseUs"));
app.use("/uploads/slider", express.static("uploads/slider"));
app.use("/uploads/chairCollection", express.static("uploads/chairCollection"));
app.use("/uploads/featureProduct", express.static("uploads/featureProduct"));

// app.use(checkToken);

app.use("/admin", adminRoutes); // Api Admin Routes Call
app.use("/web", webRoutes); // Api Website Routes Call

//Server Connect + DB Connect , Both are in one
mongoose
  .connect(`${process.env.CONNECTIONURL + process.env.DBNAME}`) //Promises
  .then((res) => {
    app.listen(8000, () => {
      console.log("server start");
    });
  });
