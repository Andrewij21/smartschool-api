const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel.js");
const Admin = require("../models/adminModel.js");
const Teacher = require("../models/teacherModel.js");
const { requestResponse } = require("../utils/requestResponse.js");
const {
  ROLES: { admin, teacher, parent, student },
} = require("../utils/roles.js");
const { SECRET_TOKEN } = process.env;

const DB = {
  admin: Admin,
  student: Student,
  teacher: Teacher,
};

class AuthService {
  createToken(_id, role) {
    return jwt.sign({ _id, role }, SECRET_TOKEN, {
      expiresIn: "3d",
    });
  }
  checkRole(role, data) {
    switch (role) {
      case admin:
        return { user: admin, item: { email: data.email } };
      case teacher:
        return { user: teacher, item: { nuptk: data.nuptk } };
      case parent:
        break;
      case student:
        return { user: student, item: { nis: data.nis } };
      default:
        throw { ...requestResponse.not_found, message: "Role not found" };
    }
  }
  async login(data, role) {
    const userStatus = this.checkRole(role, data);
    const user = await DB[userStatus.user].findOne(userStatus.item);

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
    const userStatus = this.checkRole(role, data);
    const user = await DB[userStatus.user].findOne(userStatus.item);

    // const exist = await Student.findOne({ nis: data.nis });
    if (user) throw requestResponse.conflict;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    const item = {
      ...data,
      role,
      password: hash,
    };
    const newUser = await DB[userStatus.user].create(item);
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
