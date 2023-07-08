const Attendance = require("../models/attendanceModel.js");
const mongoose = require("mongoose");
const { requestResponse } = require("../utils/requestResponse.js");

class AttendanceService {
  isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }
  async createAttendance(data) {
    if (!this.isValidId(data.class))
      throw { ...requestResponse.bad_request, message: "Invalid class id" };
    const exist = await Attendance.findOne({
      year: data.year,
      semester: data.semester,
      class: data.class,
    });
    if (exist) throw requestResponse.conflict;
    const item = await Attendance.create(data);
    return { ...requestResponse.success, data: item };
  }
  async addStudentToAttendance(id, data) {
    const currentDate = new Date();

    let start = new Date(currentDate.setHours(0, 0, 0, 0));

    let end = new Date(currentDate.setHours(23, 59, 59, 999));

    if (!this.isValidId(id))
      throw { ...requestResponse.bad_request, message: "Invalid class id" };

    const attendance = await Attendance.findById(id);
    if (!attendance) throw requestResponse.not_found;

    if (!this.isValidId(data.studentId))
      throw { ...requestResponse.bad_request, message: "Invalid class id" };

    let hour = new Date().getHours();
    // if (hour < 6)
    //   return {
    //     ...requestResponse.success,
    //     message: "Belum waktu nya absen",
    //   };
    const matchingStudents = attendance.students.filter((student) => {
      return (
        student.time >= start &&
        student.time < end &&
        student.studentId.toString() === data.studentId
      );
    });

    if (matchingStudents.length > 0)
      return {
        ...requestResponse.success,
        message: "Anda sudah absen",
        matchingStudents,
      };
    attendance.students.push(data);
    const item = await attendance.save();
    return { ...requestResponse.success, data: item };
  }
  async getAttendance() {
    const data = await Attendance.find({});
    // const populateData = await this.populateData(data);
    return { ...requestResponse.success, data };
  }

  async removeAttendance(_id) {
    if (!this.isValidId(_id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const data = await Attendance.findByIdAndRemove({ _id });

    // const populateData = await this.populateData(data);

    if (!data) throw { ...requestResponse.not_found };
    return { ...requestResponse.success, data };
  }

  async updateAttendance(data) {
    if (!this.isValidId(data._id))
      throw { ...requestResponse.bad_request, message: "Invalid id" };
    const item = await Attendance.findOneAndUpdate(
      { _id: data._id },
      { ...data },
      { new: true }
    );
    if (!item) throw { ...requestResponse.not_found };

    return { ...requestResponse.success, data: item };
  }
}

module.exports = new AttendanceService();
