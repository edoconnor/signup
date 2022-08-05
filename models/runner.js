const mongoose = require("mongoose");
 

const runnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Runner", runnerSchema);