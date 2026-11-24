sliderCreate = (req, res) => {
  res.send({
    status: true,
    message: "Login Done",
  });
};
sliderView = (req, res) => {
  res.send({
    status: true,
    message: "Slider View",
  });
};
sliderDelete = (req, res) => {
  res.send({
    status: true,
    message: "Slider Deleted",
  });
};
sliderUpdate = (req, res) => {
  res.send({
    status: true,
    message: "Slider Updated",
  });
};
module.exports = { sliderCreate, sliderView, sliderDelete, sliderUpdate };
