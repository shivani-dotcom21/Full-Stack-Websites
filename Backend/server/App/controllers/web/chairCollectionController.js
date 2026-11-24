const chairCollectionModel = require("../../models/chairCollectionModel");

const create = async (req, res) => {
  try {
    const imagePath = req.file
      ? `uploads/chairCollection/${req.file.filename}`
      : "";

    const newChairCollection = new chairCollectionModel({
      imageUrl: imagePath,
      title: req.body.title,
    });

    // Yahan theek karein: 'newChairCollection' ko save karna hai
    const savedChairCollection = await newChairCollection.save();

    res.status(201).json({
      success: true,
      message: "Chair Collection created successfully!",
      chairCollection: savedChairCollection,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const view = async (req, res) => {
  try {
    const chairCollection = await chairCollectionModel.find();
    res.status(200).json({ success: true, chairCollection });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { create, view };
