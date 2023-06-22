const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nis: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: Array,
      // enum: ["teacher", "student", "parent", "admin"],
      required: true,
      validate: {
        validator: function (value) {
          const validRoles = ["teacher", "student", "parent", "admin"];
          return value.every((role) => validRoles.includes(role));
        },
        message: "Invalid role",
      },
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    class: {
      type: String,
    },
    major: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    address: {
      type: String,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// const schema = new Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ["teacher", "student", "parent"],
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

module.exports = model("student", schema);
