const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  role: { type: String, required: true },
  nameRole: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Address = mongoose.model("Role", addressSchema);

module.exports = Address;