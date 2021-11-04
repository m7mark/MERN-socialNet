const mongoose = require("mongoose")

const OriginSchema = new mongoose.Schema({
  origins: { type: [String] }
})

module.exports = mongoose.model('Origin', OriginSchema)