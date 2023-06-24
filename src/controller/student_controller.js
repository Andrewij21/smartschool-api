const StudentService = require("../services/student_service.js");
let response;

class StudentController {
  async students(req, res) {
    try {
      const data = await StudentService.getStudent();
      response = data;
    } catch (error) {
      response = error;
    }
    res.status(response.code).json({ ...response });
  }
  async removeStudent(req, res) {
    try {
      const data = await StudentService.removeStudent(req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    res.status(response.code).json({ ...response });
  }
  async updateStudent(req, res) {
    try {
      const data = await StudentService.updateStudent(req.body);
      response = data;
    } catch (error) {
      response = error;
    }
    res.status(response.code).json({ ...response });
  }
}

module.exports = new StudentController();
