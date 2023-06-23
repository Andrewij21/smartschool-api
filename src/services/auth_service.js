const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel.js");
const Admin = require("../models/adminModel.js");
const { requestResponse } = require("../utils/requestResponse.js");
const { SECRET_TOKEN } = process.env;

// const TOKEN = {
//   admin: SECRET_TOKEN_ADMIN,
//   student: SECRET_TOKEN_STUDENT,
// };

class AuthService {
  createToken(_id, role) {
    return jwt.sign({ _id, role }, SECRET_TOKEN, {
      expiresIn: "3d",
    });
  }
  async login(data, role) {
    // Check if the user with the given username and role 'student' exists
    // const error = "Invalid username or password";
    let user;
    switch (role) {
      case "student":
        user = await Student.findOne({ nis: data.nis });
        break;
      case "teacher":
        // BELUM ADA
        // user = await Teacher.findOne({ nis, role: "teacher" });
        break;
      case "admin":
        user = await Admin.findOne({ email: data.email });
        break;
      case "parent":
        // BELUM ADA
        // user = await parent.findOne({ nis, role: "student" });
        break;
      default:
        throw { ...requestResponse.not_found, message: "Role not found" };
    }

    if (!user) {
      throw requestResponse.unauthorized;
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw requestResponse.unauthorized;
    }

    // Generate a JWT token
    const token = this.createToken(user._id, user.role);

    return {
      ...requestResponse.success,
      name: user.name,
      role,
      token,
    };
  }

  async register(data, role) {
    let user;

    switch (role) {
      case "student":
        user = await Student.findOne({ nis: data.nis });
        break;
      case "teacher":
        // BELUM ADA
        // user = await Teacher.findOne({ nis, role: "teacher" });
        break;
      case "admin":
        user = await Admin.findOne({ email: data.email });
        break;
      case "parent":
        // BELUM ADA
        // user = await parent.findOne({ nis, role: "student" });
        break;
      default:
        throw { ...requestResponse.not_found, message: "Role not found" };
    }
    // const exist = await Student.findOne({ nis: data.nis });
    if (user) throw requestResponse.conflict;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    const item = {
      ...data,
      password: hash,
    };
    let newUser;
    switch (role) {
      case "student":
        newUser = await Student.create(item);
        break;
      case "teacher":
        // BELUM ADA
        // user = await Teacher.findOne({ nis, role: "teacher" });
        break;
      case "admin":
        newUser = await Admin.create(item);
        break;
      case "parent":
        // BELUM ADA
        // user = await parent.findOne({ nis, role: "student" });
        break;
      default:
        throw { ...requestResponse.not_found, message: "Role not found" };
    }

    const token = this.createToken(newUser._id, newUser.role);
    return {
      ...requestResponse.success,
      name: newUser.name,
      role,
      token,
    };
  }
}

module.exports = new AuthService();
