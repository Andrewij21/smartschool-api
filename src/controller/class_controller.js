const classService = require("../services/class_service.js");
const { checkResponse } = require("../utils/checkResponse.js");
let response;

class ClassController {
  async classes(req, res) {
    try {
      const data = await classService.getClass();
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async createClass(req, res) {
    try {
      const data = await classService.createClass(req.body);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async removeClass(req, res) {
    try {
      const data = await classService.removeClass(req.params.id);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async updateClass(req, res) {
    try {
      const data = await classService.updateClass(req.body);
      response = data;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
}

module.exports = new ClassController();
