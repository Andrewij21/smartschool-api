const route = require("express").Router();
const morgan = require("morgan");
const studentRoutes = require("./studentRoutes");
const teacherRoutes = require("./teacherRoutes");
const authRoutes = require("./authRoutes");
const subjectRoutes = require("./subjectRoutes");
const classRoutes = require("./classRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const coordinateRoutes = require("./coordinateRouter");
const ORIGIN_URI = "/api/v1";

// Use LOG request
route.use(
  morgan(
    ":date[Asia/Jakarta] :method :url :status :response-time ms - :res[content-length]"
  )
);
// route.use((req, res, next) => {
//   console.info(req.method, req.url);
//   next();
// });

route.get(ORIGIN_URI + "/", (req, res) => {
  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  let hour = new Date().getHours();
  res.json({ start, end, hour });
});

route.use(ORIGIN_URI + "/student", studentRoutes);
route.use(ORIGIN_URI + "/teacher", teacherRoutes);
route.use(ORIGIN_URI + "/auth", authRoutes);
route.use(ORIGIN_URI + "/subject", subjectRoutes);
route.use(ORIGIN_URI + "/class", classRoutes);
route.use(ORIGIN_URI + "/attendance", attendanceRoutes);
route.use(ORIGIN_URI + "/coordinate", coordinateRoutes);

module.exports = route;
