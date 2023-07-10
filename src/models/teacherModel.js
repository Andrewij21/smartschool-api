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
  email: {
    type: String,
  },
  nik: {
    type: String,
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
  birth_date: {
    type: Date,
  },
  birth_place: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  religion: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  citizenship: {
    type: String,
  },
  active: {
    type: Boolean,
    required: true,
  },
});
module.exports = model("teacher", schema);
