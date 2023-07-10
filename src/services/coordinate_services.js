const coordinateModel = require("../models/coordinateModel");
const { requestResponse } = require("../utils/requestResponse");

class CoordinateService {
  async get() {
    const coordinate = await coordinateModel.find({}, { _id: 0, __v: 0 });
    if (coordinate <= 0)
      throw { ...requestResponse.success, msg: "Data is empty" };
    return { ...requestResponse.success, coordinate };
  }

  async create({ lat, long, range }) {
    await coordinateModel.deleteMany();
    await coordinateModel.create({ lat, long, range });
    return {
      ...requestResponse.success,
      msg: "Coordinate been add",
    };
  }
}

module.exports = new CoordinateService();
