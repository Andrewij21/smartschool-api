const { model, Schema } = require("mongoose");

const schema = new Schema({
  subject: {
    type: String,
    required: true,
    unique: true,
  },

  teacher: {
    type: Schema.Types.ObjectId,
    ref: "teacher",
    required: true,
  },
});
module.exports = model("subject", schema);
