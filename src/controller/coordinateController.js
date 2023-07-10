const { requestResponse } = require("../utils/requestResponse");
const { checkResponse } = require("../utils/checkResponse.js");
const coordinateService = require("../services/coordinate_services");
let response;

class CoordinateController {
  async getCoordinate(req, res) {
    try {
      const coordinate = await coordinateService.get();
      response = coordinate;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
  async createCoordinate(req, res) {
    try {
      const coordinate = await coordinateService.create(req.body);
      response = coordinate;
    } catch (error) {
      response = error;
    }
    checkResponse(res, response);
  }
}

module.exports = new CoordinateController();
