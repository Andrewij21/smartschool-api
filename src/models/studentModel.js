const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    nis: {
      type: String,
      required: true,
      unique: true,
    },
    nisn: {
      type: String,
      required: true,
      unique: true,
    },
    school_origin: {
      type: String,
    },
    role: {
      type: String,
      // enum: ["teacher", "student", "parent", "admin"],
      required: true,
      default: "student",
    },
    password: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
    },
    birth_place: {
      type: String,
    },
    class: {
      type: Schema.Types.ObjectId,
      // ref: "class",
    },
    major: {
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
    active: {
      type: Boolean,
      required: true,
    },

    // BAPAK
    father_data: {
      nik: String,
      name: String,
      birthDate: String,
      religion: String,
      last_education: String,
      job: String,
      income: String,
      birthPlace: String,
      citizenship: String,
      phone_number: {
        type: String,
        default: "-",
      },
    },
    // EMAK
    mother_data: {
      nik: String,
      name: String,
      birthDate: String,
      religion: String,
      last_education: String,
      job: String,
      income: String,
      birthPlace: String,
      citizenship: String,
      phone_number: {
        type: String,
        default: "-",
      },
    },
    // WALI
    guardian_data: {
      nik: String,
      name: String,
      relationship: String,
      birthDate: String,
      religion: String,
      last_education: String,
      job: String,
      income: String,
      birthPlace: String,
      citizenship: String,
      phone_number: {
        type: String,
        default: "-",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
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
