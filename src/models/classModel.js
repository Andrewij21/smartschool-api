const { model, Schema } = require("mongoose");

const schema = new Schema({
  class: {
    type: String,
    unique: true,
  },
  classType: {
    type: String,
    unique: true,
  },
  major: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subject",
    },
  ],
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "teacher",
  },
});

// schema.virtual("students", {
//   ref: "student",
//   localField: "_id",
//   foreignField: "class",
//   justOne: false,
// });

// PERLUDI HAPUS KEK NYA DARI CLOUD BARU COBA LAGI BIAR JALAN NI CODE DI BAWAH

schema.index(
  { subject: 1 },
  { unique: true, partialFilterExpression: { subject: { $ne: null } } }
);

module.exports = model("class", schema);
