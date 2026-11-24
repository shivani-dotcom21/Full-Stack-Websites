const whyChooseUsModel = require("../../models/WhyChooseUsModel");

let whyChooseUsController = {
  create: async (req, res) => {
    let { name, order, description } = req.body;

    try {
      let checkWhyChooseUs = await whyChooseUsModel.findOne({ name });
      if (checkWhyChooseUs) {
        return res.send({
          status: false,
          message: " Title Already Exist..",
        });
      }

      let insertObj = {
        name,
        order,
        description,
      };
      if (req.file) {
        if (req.file && req.file.filename) {
          insertObj["image"] = req.file.filename;
        }
      }
      let whyChooseUs = new whyChooseUsModel(insertObj);
      let insertRes = await whyChooseUs.save();
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
    let path = process.env.WHYCHOOSEUSPATH;
    let data = await whyChooseUsModel.find();
    res.send({
      status: true,
      message: " Why Choose Us  View",
      path,
      data,
    });
  },

  details: async (req, res) => {
    let { id } = req.params;
    let path = process.env.WHYCHOOSEUSPATH;
    let data = await whyChooseUsModel.findOne({ _id: id });
    res.send({
      status: true,
      message: " Why Choose Us View",
      path,
      data,
    });
  },

  delete: async (req, res) => {
    let { ids } = req.body;
    let delRes = await whyChooseUsModel.deleteMany({ _id: ids });

    res.send({
      status: true,
      message: "  Why Choose Us  Deleted",
      delRes,
    });
  },

  getDetails: async (req, res) => {
    let { id } = req.params;
     let path = process.env.WHYCHOOSEUSPATH;
    let data = await whyChooseUsModel.findOne({ _id: id });
    res.send({
      status: true,
      message: "why Choose Us  View",
      data,
      
    });
  },

//   update: async (req, res) => {
//     let { id } = req.params;
//     let updateRes = await whyChooseUsModel.updateOne(
//       {
//         _id: id,
//       },
//       {
//         $set: req.body,
//       },
//     );
//     res.send({
//       status: true,
//       message: "  why Choose Us Updated",
//       updateRes,
//     });
//   },

  //   changeStatus: async (req, res) => {
  //     let { ids } = req.body;
  //     let oldStatus = await categoryModel.find({ _id: ids });
  //     for (let obj of oldStatus) {
  //       await categoryModel.updateOne(
  //         { _id: obj._id },
  //         {
  //           $set: {
  //             status: !obj.status,
  //           },
  //         },
  //       );
  //     }
  //     res.send({
  //       status: true,
  //       message: " Category Change Status",
  //     });
  //   },
};

module.exports = whyChooseUsController;
