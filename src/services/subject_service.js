const Subject = require("../models/subjectModel.js");
const mongoose = require("mongoose");
const { requestResponse } = require("../utils/requestResponse.js");

class SubjectService {
  isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  async populateData(data) {
    return await Subject.populate(data, {
      path: "teacher",
      select: "-password -subject",
    });
  }

  async getSubject() {
    const data = await Subject.find({});
    const populateData = await this.populateData(data);
    return { ...requestResponse.success, data: populateData };
  }
  async createSubject(subject) {
    const exist = await Subject.findOne({ subject: subject.subject });
    if (exist) throw requestResponse.conflict;

    if (!this.isValidId(subject.teacher))
      throw { ...requestResponse.bad_request, message: "Invalid id" };

    const data = await Subject.create(subject);
    const populateData = await this.populateData(data);
    return { ...requestResponse.success, data: populateData };
  }
  async removeSubject(_id) {
    if (!this.isValidId(_id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Subject.findByIdAndRemove({ _id });

    const populateData = await this.populateData(data);

    if (!data) throw { ...requestResponse.not_found };
    return { ...requestResponse.success, data: populateData };
  }
  async updateSubject(subject) {
    if (!this.isValidId(subject._id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Subject.findOneAndUpdate(
      { _id: subject._id },
      { ...subject },
      { new: true }
    );
    if (!data) throw { ...requestResponse.not_found };

    return { ...requestResponse.success, data };
  }
}

module.exports = new SubjectService();
