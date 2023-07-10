const Student = require("../models/studentModel.js");
const mongoose = require("mongoose");
const { requestResponse } = require("../utils/requestResponse.js");

class StudentService {
  isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  async getStudent() {
    const data = await Student.find({}, { password: 0 });
    return { ...requestResponse.success, data };
  }
  async getStudentById(_id) {
    if (!this.isValidId(_id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Student.findOne({ _id }, { password: 0 });
    if (!data) throw { ...requestResponse.not_found };
    return { ...requestResponse.success, data };
  }
  async removeStudent(_id) {
    if (!this.isValidId(_id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Student.findByIdAndRemove({ _id }).select("-password");
    if (!data) throw { ...requestResponse.not_found };
    return { ...requestResponse.success, data };
  }
  async updateStudent(student) {
    if (!this.isValidId(student._id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Student.findOneAndUpdate(
      { _id: student._id },
      { ...student },
      { new: true, projection: { password: 0 } }
    );
    if (!data) throw { ...requestResponse.not_found };

    return { ...requestResponse.success, data };
  }
}

module.exports = new StudentService();
