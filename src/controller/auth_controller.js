const authService = require("../services/auth_service.js");

class AuthController {
  async loginStudent(req, res) {
    try {
      //   const { username, password } = req.body;
      const data = await authService.loginStudent(req.body);
      res.status(200).json({ status: "ok", data });
    } catch (error) {
      // console.log(error);
      res.status(401).json({ status: "failed", error });
    }
  }
  async registerStudent(req, res) {
    try {
      const data = await authService.registerStudent(req.body);
      res.status(201).json({ status: "ok", data });
    } catch (error) {
      console.error({ error });
      res.status(500).json({ status: "failed", error });
    }
  }
}

module.exports = new AuthController();
