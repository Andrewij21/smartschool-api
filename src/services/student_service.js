const Student = require("../models/studentModel.js");
class StudentService {
  async getStudent() {
    const student = await Student.find({}, { password: 0 });
    return student;
  }
  async removeStudent(_id) {
    const student = await Student.findByIdAndRemove({ _id });
    return student;
  }
  async updateStudent(data) {
    try {
      const student = await Student.findOneAndUpdate(
        { _id: data._id },
        { ...data },
        { new: true }
      );
      return student;
    } catch (error) {
      console.error({ error: error.toString() });
    }
  }
}

module.exports = new StudentService();
