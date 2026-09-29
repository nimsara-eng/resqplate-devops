const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["reserved", "collected", "cancelled"],
      default: "reserved"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Reservation", reservationSchema);