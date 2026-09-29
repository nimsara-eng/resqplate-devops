const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    foodName: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    pickupLocation: {
      type: String,
      required: true,
      trim: true
    },

    pickupDeadline: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["available", "reserved", "collected", "expired"],
      default: "available"
    }
  },
  {
    timestamps: true
  }

);