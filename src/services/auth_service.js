const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel.js");

const createToken = ({ _id, role }) => {
  return jwt.sign({ _id, role }, process.env.SECRET_TOKEN, { expiresIn: "3d" });
};

class AuthService {
  async loginStudent({ nis, password }) {
    // Check if the user with the given username and role 'student' exists
    const error = "Invalid username or password";
    const user = await Student.findOne({ nis, role: "student" });
    if (!user) {
      throw error;
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw error;
    }

    // Generate a JWT token
    const token = createToken(user._id, user.role);

    return { name: user.name, role: user.role, token };
  }

  async registerStudent(data) {
    const exist = await Student.findOne({ nis: data.nis });
    if (exist) throw "Student already exist!";

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    const user = await Student.create({
      ...data,
      role: "student",
      password: hash,
    });
    const token = createToken(user._id);
    return { name: user.name, token };
  }
}

module.exports = new AuthService();
