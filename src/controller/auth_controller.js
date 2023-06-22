const authService = require("../services/auth_service.js");
const { Requestresponse } = require("../utils/requestResponse.js");
let response;

class AuthController {
  async loginStudent(req, res) {
    try {
      const data = await authService.loginStudent(req.body);
      response = { ...data };
    } catch (error) {
      // console.error(error);
      response = { ...error };
    }
    res.status(response.code).json({ ...response });
  }
  async registerStudent(req, res) {
    try {
      const data = await authService.registerStudent(req.body);
      response = { ...data };
    } catch (error) {
      // console.error({ error });
      response = { ...error };
    }
    res.status(response.code).json({ ...response });
  }
}

module.exports = new AuthController();
