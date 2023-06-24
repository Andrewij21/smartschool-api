const teacherService = require("../services/teacher_service.js");
let response;

class TeacherController {
  async teachers(req, res) {
    try {
      const data = await teacherService.getTeacher();
      response = data;
    } catch (error) {
      response = error;
    }
    res.status(response.code).json({ ...response });
  }
  async removeTeacher(req, res) {
    try {
      const data = await teacherService.removeTeacher(req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    res.status(response.code).json({ ...response });
  }
  async updateTeacher(req, res) {
    try {
      const data = await teacherService.updateTeacher(req.body);
      response = data;
    } catch (error) {
      response = error;
    }
    res.status(response.code).json({ ...response });
  }
}

module.exports = new TeacherController();
