const { model, Schema } = require("mongoose");

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
    role: {
      type: String,
      // enum: ["teacher", "student", "parent", "admin"],
      required: true,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("admin", schema);
