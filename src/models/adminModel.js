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
    roles: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = model("admin", schema);
