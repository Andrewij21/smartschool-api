const { model, Schema } = require("mongoose");

// const schema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     class: {
//       type: String,
//       required: true,
//     },
//     major: {
//       type: String,
//       required: true,
//     },
//     gender: {
//       type: String,
//       enum: ["Male", "Female"],
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("student", schema);
