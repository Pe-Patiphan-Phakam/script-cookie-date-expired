const mongoose = require("mongoose")

const Schema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password:  { type: String, required: true },
    details: []
  },
  { timestamps: true }
)

module.exports = mongoose.model("user", Schema)
