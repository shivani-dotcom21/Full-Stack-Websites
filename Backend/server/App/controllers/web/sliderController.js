const Slider = require("../../models/sliderModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "furniture/sliders" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

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
    let imageUrl = "";
    if (req.file && req.file.buffer) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const newSlider = new Slider({
      imageUrl,
      title: req.body.title,
    });

    const savedSlider = await newSlider.save();
    res.status(201).json({
      success: true,
      message: "Slider created successfully!",
      slider: savedSlider,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { view, create };