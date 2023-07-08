const attendanceService = require("../services/attendance_service.js");
const { checkResponse } = require("../utils/checkResponse.js");
let response;

class AttendanceController {
  async attendances(req, res) {
    try {
      const data = await attendanceService.getAttendance();
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async createAttendance(req, res) {
    try {
      const data = await attendanceService.createAttendance(req.body);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async addStudentToAttendance(req, res) {
    try {
      const data = await attendanceService.addStudentToAttendance(
        req.params.id,
        req.body
      );
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async removeAttendance(req, res) {
    try {
      const data = await attendanceService.removeAttendance(req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async updateAttendance(req, res) {
    try {
      const data = await attendanceService.updateAttendance(req.body);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
}

module.exports = new AttendanceController();
