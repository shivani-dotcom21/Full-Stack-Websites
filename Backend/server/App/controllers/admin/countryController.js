const countryModel = require("../../models/countryModel");

let countryController = {
  create: async (req, res) => {
    console.log(req.body);
    let { name } = req.body;

    try {
      let checkCountry = await countryModel.findOne({ name });
      if (checkCountry) {
        return res.send({
          status: false,
          message: " Country Name Already Exist..",
        });
      }

      let insertRes = await countryModel.insertOne(req.body);
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
    let data = await countryModel.find();

    res.send({
      status: true,
      message: "country View",
      data,
    });
  },

  delete: async (req, res) => {
    let { ids } = req.body;
    let delRes = await countryModel.deleteMany({ _id: ids });
    res.send({
      status: true,
      message: "country Deleted",
      delRes,
    });
  },

  update: async (req, res) => {
    let { id } = req.params;
    let UpdateRes = await countryModel.updateOne(
      {
        _id: id,
      },
      {
        $set: req.body,
      },
    );
    res.send({
      status: true,
      message: "country Updated",
      UpdateRes,
    });
  },

  changeStatus: async (req, res) => {
    let { ids } = req.body;
    let oldStatus = await countryModel.find({ _id: ids });
    for (let obj of oldStatus) {
      await countryModel.updateOne(
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
      message: " country Change Status",
    });
  },
};

module.exports = countryController;
