const categoryModel = require("../../models/CategoryModel");
const subCategoryModel = require("../../models/subCategoryModel");

let subCategoryController = {
  create: async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    let insertObj = { ...req.body };
    try {
      let checkSubCategory = await subCategoryModel.findOne({
        name: insertObj.name,
      });
      if (checkSubCategory) {
        return res.send({
          status: false,
          message: "Sub Category Name Already Exist..",
        });
      } else {
        if (req.file) {
          if (req.file && req.file.filename) {
            insertObj["image"] = req.file.filename;
          }
        }
        let subCategory = await subCategoryModel(insertObj);
        let insertRes = await subCategory.save();
        //DataBase Insert
        res.send({
          status: true,
          message: "Sub Category Added",
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
    res.send({
      status: true,
      message: "Sub Category Added",
    });
  },

  view: async (req, res) => {
    let path = process.env.SUBCATEGORYPATH;
    let data = await subCategoryModel.find().populate("parent", "name");
    res.send({
      status: true,
      message: "Sub Category View",
      path,
      data,
    });
  },

  delete: async (req, res) => {
    let { ids } = req.body;
    let delRes = await subCategoryModel.deleteMany({ _id: ids });

    res.send({
      status: true,
      message: " Sub Category Deleted",
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
};

module.exports = { subCategoryController };
