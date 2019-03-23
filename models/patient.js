var mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
  mrno: String,
  name: String,
  image: String,
  records: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Record"
    }
  ],
  added_by: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  added_on: String,
});

module.exports = mongoose.model("Patient", patientSchema);
