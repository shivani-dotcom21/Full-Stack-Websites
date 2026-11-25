const categoryModel = require("../../models/categoryModel");
const subCategoryModel = require("../../models/subCategoryModel");
const subSubCategoryModel = require("../../models/subSubCategoryModel");

let subSubCategoryController = {
  create: async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    let insertObj = { ...req.body };
    try {
      let checkSubCategory = await subSubCategoryModel.findOne({
        name: insertObj.name,
      });
      if (checkSubCategory) {
        return res.send({
          status: false,
          message: "Sub Sub Category Name Already Exist..",
        });
      } else {
        if (req.file) {
          if (req.file && req.file.filename) {
            insertObj["image"] = req.file.filename;
          }
        }
        let subSubCategory = await subSubCategoryModel(insertObj);
        let insertRes = await subSubCategory.save();
        //DataBase Insert
        res.send({
          status: true,
          message: "Sub Sub Category Added",
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
      message: "Sub Sub Category Added",
    });
  },

  view: async (req, res) => {
    let path = process.env.SUBSUBCATEGORYPATH;
    let data = await subSubCategoryModel
      .find()
      .populate("parent", "name")
      .populate("subCategory", "name");
    res.send({
      status: true,
      message: "Sub Sub Category View",
      path,
      data,
    });
  },

  details: async (req, res) => {
    let { id } = req.params;
    let path = process.env.SUBSUBCATEGORYPATH;
    let data = await categoryModel.findOne({ _id: id });
    res.send({
      status: true,
      message: " Sub Sub Category View",
      path,
      data,
    });
  },

  delete: async (req, res) => {
    let { ids } = req.body;
    let delRes = await subSubCategoryModel.deleteMany({ _id: ids });
    res.send({
      status: true,
      message: " Sub Sub Category Deleted",
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
};

module.exports = { subSubCategoryController };
