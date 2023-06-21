const Student = require("../models/studentModel.js");
class StudentService {
  async getStudent() {
    const data = await Student.find({}, { password: 0 });
    return data;
  }
  async removeStudent(id) {
    const data = await Student.findByIdAndRemove({ id });
    return data;
  }
}

module.exports = new StudentService();
