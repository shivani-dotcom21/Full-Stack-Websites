const faqModel = require("../../models/faqModel");

let faqController = {
  create: async (req, res) => {
    console.log(req.body);
    let { name } = req.body;
    try {
      let checkFaq = await faqModel.findOne({ name });
      if (checkFaq) {
        return res.send({
          status: false,
          message: " Faq Name Already Exist..",
        });
      }

      let insertRes = await faqModel.insertOne(req.body);
      res.send({
        status: true,
        message: "Login Done",
        insertRes,
      });
    } catch (err) {
      let error = {};
      for (let key in err.errors) {
        error[key] = err.errors[key].message;
      }

      res.send({
        status: false,
        err,
      });
    }
  },

  view: async (req, res) => {
    let data = await faqModel.find();
    res.send({
      status: true,
      message: "faq View",
      data,
    });
  },

  delete: async (req, res) => {
    let { ids } = req.body;
    let delRes = await faqModel.deleteMany({ _id: ids });
    res.send({
      status: true,
      message: "faq Deleted",
      delRes,
    });
  },

  update: async (req, res) => {
    let { id } = req.params;
    let updateRes = await faqModel.updateOne(
      {
        _id: id,
      },
      {
        $set: req.body,
      },
    );
    res.send({
      status: true,
      message: "faq Updated",
      updateRes,
    });
  },

  changeStatus: async (req, res) => {
    let { ids } = req.body;
    let oldStatus = await faqModel.find({ _id: ids });
    for (let obj of oldStatus) {
      await faqModel.updateOne(
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
      message: " Faq Change Status",
    });
  },
};
module.exports = faqController;
