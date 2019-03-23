var mongoose = require('mongoose');

var recordSchema = new mongoose.Schema({
  title: String,
  image: String,
  added_by: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  added_on: String
});

module.exports = mongoose.model("Record", recordSchema);
