const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nuptk: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    // enum: ["teacher", "student", "parent", "admin"],
    required: true,
    default: "teacher",
  },
  password: {
    type: String,
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
    default: null,
  },
});
module.exports = model("teacher", schema);
