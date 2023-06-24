const subjectService = require("../services/subject_service.js");
const { checkResponse } = require("../utils/checkResponse.js");
let response;

class SubjectController {
  async subjects(req, res) {
    try {
      const data = await subjectService.getSubject();
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async createSubject(req, res) {
    try {
      const data = await subjectService.createSubject(req.body);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async removeSubject(req, res) {
    try {
      const data = await subjectService.removeSubject(req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async updateSubject(req, res) {
    try {
      const data = await subjectService.updateSubject(req.body);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
}

module.exports = new SubjectController();
