const authService = require("../services/auth_service.js");
let response;

class AuthController {
  async login(req, res) {
    try {
      const data = await authService.login(req.body, req.params.role);
      response = data;
    } catch (error) {
      console.error({ error });
      response = error;
    }
    if (!response.code)
      return res.status(400).json({ error: response.toString() });
    res.status(response.code).json({ ...response });
  }
  async register(req, res) {
    try {
      const data = await authService.register(req.body, req.params.role);
      response = data;
    } catch (error) {
      console.error({ error });
      response = error;
    }
    if (!response.code)
      return res.status(400).json({ error: response.toString() });
    res.status(response.code).json({ ...response });
  }
}

module.exports = new AuthController();
