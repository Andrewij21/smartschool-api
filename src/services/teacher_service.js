const Teacher = require("../models/teacherModel.js");
const mongoose = require("mongoose");
const { requestResponse } = require("../utils/requestResponse.js");

class TeacherService {
  isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  async getTeacher() {
    const data = await Teacher.find({}, { password: 0 });
    return { ...requestResponse.success, data };
  }
  async removeTeacher(_id) {
    if (!this.isValidId(_id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Teacher.findByIdAndRemove({ _id }).select("-password");
    if (!data) throw { ...requestResponse.not_found };
    return { ...requestResponse.success, data };
  }
  async updateTeacher(teacher) {
    if (!this.isValidId(teacher._id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Teacher.findOneAndUpdate(
      { _id: teacher._id },
      { ...teacher },
      { new: true, projection: { password: 0 } }
    );
    if (!data) throw { ...requestResponse.not_found };

    return { ...requestResponse.success, data };
  }
}

module.exports = new TeacherService();
