const StudentService = require("../services/student_service.js");
const { checkResponse } = require("../utils/checkResponse.js");
let response;

class StudentController {
  async students(req, res) {
    try {
      const data = await StudentService.getStudent();
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async studentById(req, res) {
    try {
      const data = await StudentService.getStudentById(req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async removeStudent(req, res) {
    try {
      const data = await StudentService.removeStudent(req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async updateStudent(req, res) {
    try {
      const data = await StudentService.updateStudent(req.body);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
}

module.exports = new StudentController();
