const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel.js");
const { requestResponse } = require("../utils/requestResponse.js");
let response;

const createToken = ({ _id, role }) => {
  return jwt.sign({ _id, role }, process.env.SECRET_TOKEN, { expiresIn: "3d" });
};

class AuthService {
  async loginStudent({ nis, password }) {
    // Check if the user with the given username and role 'student' exists
    // const error = "Invalid username or password";
    const user = await Student.findOne({ nis, role: "student" });
    if (!user) {
      throw (response = { ...requestResponse.unauthorized });
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw requestResponse.unauthorized;
    }

    // Generate a JWT token
    const token = createToken(user._id, user.role);

    return (response = {
      ...requestResponse.success,
      name: user.name,
      role: user.role,
      token,
    });
  }

  async registerStudent(data) {
    const exist = await Student.findOne({ nis: data.nis });
    if (exist) throw (response = { ...requestResponse.conflict });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    const user = await Student.create({
      ...data,
      role: "student",
      password: hash,
    });
    const token = createToken(user._id);
    return (response = {
      ...requestResponse.success,
      name: user.name,
      role: user.role,
      token,
    });
  }
}

module.exports = new AuthService();
