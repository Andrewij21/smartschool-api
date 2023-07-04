const Class = require("../models/classModel.js");
const mongoose = require("mongoose");
const { requestResponse } = require("../utils/requestResponse.js");

class ClassService {
  isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  async populateData(data) {
    // let populatedData = await Class.populate(data, [
    //   {
    //     path: "subjects",
    //     populate: {
    //       path: "teacher",
    //       model: "teacher",
    //       select: "-password -subject",
    //     },
    //   },
    //   {
    //     path: "teacher",
    //     select: "-password -subject",
    //   },
    // ]);
    let populatedData = await Class.aggregate([
      {
        $match: { _id: { $in: data.map((item) => item._id) } },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subjects",
          foreignField: "_id",
          as: "subjects",
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "teacher",
          foreignField: "_id",
          as: "teacher",
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "class",
          as: "students",
        },
      },
      {
        $project: {
          "teacher.password": 0,
          "students.password": 0,
          "students.nis": 0,
          "students.birthDate": 0,
          "students.gender": 0,
          "students.address": 0,
          "students.createdAt": 0,
          "students.updatedAt": 0,
          "students.role": 0,
        },
      },
    ]);

    return populatedData;
  }

  async getClassById(id) {
    if (!this.isValidId(id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Class.findById(id);
    const populateData = await this.populateData(data);
    return { ...requestResponse.success, data: populateData };
  }
  async getClass() {
    const data = await Class.find({});
    const populateData = await this.populateData(data);
    return { ...requestResponse.success, data: populateData };
  }
  async createClass(data) {
    const exist = await Class.findOne({ class: data.class });
    if (exist) throw requestResponse.conflict;

    if (!this.isValidId(data.teacher))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const item = await Class.create(data);
    const populateData = await this.populateData([item]);
    return { ...requestResponse.success, data: populateData };
  }
  async removeClass(_id) {
    if (!this.isValidId(_id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Class.findByIdAndRemove({ _id });

    const populateData = await this.populateData(data);

    if (!data) throw { ...requestResponse.not_found };
    return { ...requestResponse.success, data: populateData };
  }
  async updateClass(subject) {
    if (!this.isValidId(subject._id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Class.findOneAndUpdate(
      { _id: subject._id },
      { ...subject },
      { new: true }
    );
    if (!data) throw { ...requestResponse.not_found };

    return { ...requestResponse.success, data };
  }
}

module.exports = new ClassService();
