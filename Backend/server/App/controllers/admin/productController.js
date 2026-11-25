const categoryModel = require("../../models/categoryModel");
const colorModel = require("../../models/colorModel");
const materialModel = require("../../models/materialModel");
const productModel = require("../../models/productModel");
const subCategoryModel = require("../../models/subCategoryModel");
const subSubCategoryModel = require("../../models/subSubCategoryModel");

let productController = {
  create: async (req, res) => {
    let insertObj = { ...req.body };

    if (req.files.productImage) {
      insertObj["productImage"] = req.files.productImage[0].filename;
    }
    if (req.files.backImage) {
      insertObj["backImage"] = req.files.backImage[0].filename;
    }

    if (req.files.galleryImage) {
      insertObj["galleryImage"] = req.files.galleryImage.map(
        (obj) => obj.filename,
      );
    }
    try {
      let checkProduct = await productModel.findOne({
        name: insertObj.name,
      });
      if (checkProduct) {
        return res.send({
          status: false,
          message: "Product Name Already Exist..",
        });
      } else {
        let productRes = await productModel(insertObj);
        let insertRes = await productRes.save();
        //DataBase Insert
        res.send({
          status: true,
          message: "Product Added",
          insertRes,
        });
      }
    } catch (err) {
      let error = {};
      for (let key in err.errors) {
        error[key] = err.errors[key].message;
      }
      res.send({
        status: false,
        error,
      });
    }

    //   // console.log("================");
    //   // console.log(insertObj);
    //   // console.log("================");

    //   // res.send("hello");
  },

  view: async (req, res) => {
    let path = process.env.PRODUCTPATH;
    let data = await productModel
      .find()
      .populate("parent", "name")
      .populate("subCategory", "name")
      .populate("subSubCategory", "name")
      .populate("material", "name")
      .populate("color", "name");
    res.send({
      status: true,
      message: "Product Category View",
      path,
      data,
    });
  },

  details: async (req, res) => {
    let { id } = req.params;
    let path = process.env.PRODUCTPATH;
    let data = await productModel
      .findOne({ _id: id })
      .populate("parent", "name")
      .populate("subCategory", "name")
      .populate("subSubCategory", "name")
      .populate("material", "name")
      .populate("color", "name");
    res.send({
      status: true,
      message: "Product Category View",
      path,
      data,
    });
  },

  // update: async (req, res) => {
  //     let { id } = req.params;
  //
  //     let updateRes = await productModel.updateOne(
  //       {
  //         _id: id,
  //       },
  //       {
  //         $set: req.body,
  //       },
  //     );
  //     res.send({
  //       status: true,
  //       message: "  Product Updated",
  //       updateRes,
  //     });
  //   },

  // update: async (req, res) => {
  //   try {
  //     let { id } = req.params;
  //     let data = { ...req.body };

  //     // 1. Single Images (productImage aur backImage) Check
  //     if (req.files) {
  //       if (req.files.productImage) {
  //         data.productImage = req.files.productImage[0].filename;
  //       }
  //       if (req.files.backImage) {
  //         data.backImage = req.files.backImage[0].filename;
  //       }
  //       // 2. Multiple Gallery Images Check
  //       if (req.files.galleryImage && req.files.galleryImage.length > 0) {
  //         data.galleryImage = req.files.galleryImage.map(
  //           (file) => file.filename,
  //         );
  //       }
  //     }

  //     let updateRes = await productModel.updateOne({ _id: id }, { $set: data });

  //     res.send({
  //       status: true,
  //       message: "Product Updated",
  //       updateRes,
  //     });
  //   } catch (error) {
  //     res.status(500).send({
  //       status: false,
  //       message: error.message,
  //     });
  //   }
  // },

   delete: async (req, res) => {
      let { ids } = req.body;
      let delRes = await productModel.deleteMany({ _id: ids });
      res.send({
        status: true,
        message: " Product Deleted",
        delRes,
      });
    },

  parent: async (req, res) => {
    let data = await categoryModel.find({ status: true }).select("name");
    res.send({
      status: true,
      data,
    });
  },
  subCategory: async (req, res) => {
    let { parentId } = req.params;
    let data = await subCategoryModel
      .find({ status: true, parent: parentId })
      .select("name");
    res.send({
      status: true,
      data,
    });
  },
  subSubCategory: async (req, res) => {
    let { subCategoryId } = req.params;
    let data = await subSubCategoryModel
      .find({ status: true, subCategory: subCategoryId })
      .select("name");
    res.send({
      status: true,
      data,
    });
  },
  material: async (req, res) => {
    let data = await materialModel.find({ status: true }).select("name");
    res.send({
      status: true,
      data,
    });
  },
  color: async (req, res) => {
    let data = await colorModel.find({ status: true }).select("name");
    res.send({
      status: true,
      data,
    });
  },
};

module.exports = { productController };
