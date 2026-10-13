const Donation = require("../models/donation");

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch donations"
    });
  }
};

module.exports = {
  getDonations
};