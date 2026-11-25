const categoryModel = require("../../models/categoryModel");

let categoryController = {
  create: async (req, res) => {
    let { name, order } = req.body;
    // console.log(req.body);
    // console.log(req.file);

    try {
      let checkCategory = await categoryModel.findOne({ name });
      if (checkCategory) {
        return res.send({
          status: false,
          message: " Category Name Already Exist..",
        });
      }

      let insertObj = {
        name,
        order,
      };
      if (req.file) {
        if (req.file && req.file.filename) {
          insertObj["image"] = req.file.filename;
        }
      }
      //   console.log(insertObj);
      //   res.send("hello");

      //   let insertRes = await categoryModel.insertOne(req.body);
      //   res.send({
      //     status: true,
      //     message: " Category Added",
      //     insertRes,
      //   });
      let category = await categoryModel(insertObj);
      let insertRes = await category.save();
      //DataBase Insert
      res.send({
        status: true,
        message: "Category Added",
        insertRes,
      });
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
  },

  view: async (req, res) => {
    let path = process.env.CATEGORYPATH;
    let data = await categoryModel.find();
    res.send({
      status: true,
      message: " Category View",
      path,
      data,
    });
  },

  details: async (req, res) => {
    let { id } = req.params;
    let path = process.env.CATEGORYPATH;
    let data = await categoryModel.findOne({ _id: id });
    res.send({
      status: true,
      message: " Category View",
      path,
      data,
    });
  },

  delete: async (req, res) => {
    let { ids } = req.body;
    let delRes = await categoryModel.deleteMany({ _id: ids });

    res.send({
      status: true,
      message: "  Category Deleted",
      delRes,
    });
  },

  getDetails: async (req, res) => {
    let { id } = req.params;
    let data = await categoryModel.findOne({ _id: id });
    res.send({
      status: true,
      message: "Category View",
      data,
    });
  },

  update: async (req, res) => {
    let { id } = req.params;
    let updateRes = await categoryModel.updateOne(
      {
        _id: id,
      },
      {
        $set: req.body,
      },
    );
    res.send({
      status: true,
      message: "  Category Updated",
      updateRes,
    });
  },

  changeStatus: async (req, res) => {
    let { ids } = req.body;
    let oldStatus = await categoryModel.find({ _id: ids });
    for (let obj of oldStatus) {
      await categoryModel.updateOne(
        { _id: obj._id },
        {
          $set: {
            status: !obj.status,
          },
        },
      );
    }
    res.send({
      status: true,
      message: " Category Change Status",
    });
  },
};

module.exports = categoryController;
