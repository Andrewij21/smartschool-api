const { model, Schema } = require("mongoose");
const attendance_schema = "attendance";
const attendance_student_schema = "student_attendance";

const schema = new Schema({
  year: {
    type: String,
  },
  semester: {
    type: String,
    enum: ["semester1", "semester2"],
  },
  class: {
    type: Schema.Types.ObjectId,
  },
  students: [
    {
      studentId: { type: Schema.Types.ObjectId },
      name: { type: String },
      image: { type: Buffer },
      time: {
        type: Date,
        default: () => Date.now(),
      },
      status: {
        type: String,
        enum: ["hadir", "alpha", "terlambat"],
        required: true,
      },
    },
  ],
});

module.exports = model("attendance", schema);
