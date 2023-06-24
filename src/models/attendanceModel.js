const { model, Schema } = require("mongoose");

const schema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
    required: true,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "class",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    required: true,
  },
});
module.exports = model("attendance", schema);
