const Info = require("../models/info");

exports.createInfo = async (req, res) => {
  const { name, age, weight, height, gender } = req.body;
  const newInfo = new Info({
    userId: req.userId,
    name,
    age,
    weight,
    height,
    gender,
  });

  try {
    await newInfo.save();
    res.status(201).json(newInfo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getInfos = async (req, res) => {
  try {
    const infos = await Info.find({ userId: req.userId });
    res.json(infos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const { name, age, weight, height, gender } = req.body;
    const updatedInfo = await UserInfo.findByIdAndUpdate(
      req.params.id,
      { name, age, weight, height, gender },
      { new: true }
    );
    res.status(200), json(updatedInfo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteInfo = async (req, res) => {
  try {
    const info = await Info.findByIdAndDelete(req.params.id);
    if (!info) return res.status(404).json({ message: "Info not found" });
    res.json({ message: "Info deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
