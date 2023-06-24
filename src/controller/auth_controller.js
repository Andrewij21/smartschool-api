const authService = require("../services/auth_service.js");
const { checkResponse } = require("../utils/checkResponse.js");
let response;

class AuthController {
  async login(req, res) {
    try {
      const data = await authService.login(req.body, req.params.role);
      response = data;
    } catch (error) {
      // console.error({ error });
      response = error;
    }
    checkResponse(res, response);
  }
  async register(req, res) {
    try {
      const data = await authService.register(req.body, req.params.role);
      response = data;
    } catch (error) {
      // console.error({ error });
      response = error;
    }
    checkResponse(res, response);
  }
}

module.exports = new AuthController();
