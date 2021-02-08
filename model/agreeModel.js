const mongoose = require("mongoose")

const Schema = mongoose.Schema(
  {
    cookieId: { type: String, required: true },
    data: []
  },
  { timestamps: true }
)

module.exports = mongoose.model("data_agree", Schema)
