const Slider = require("../../models/sliderModel");

const view = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json({ success: true, sliders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const imagePath = req.file ? `uploads/slider/${req.file.filename}` : '';

    const newSlider = new Slider({
      imageUrl: imagePath,
      title: req.body.title
    });

    const savedSlider = await newSlider.save();
    res.status(201).json({ 
      success: true, 
      message: "Slider created successfully!", 
      slider: savedSlider 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { view, create };