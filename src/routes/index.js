const route = require("express").Router();
const morgan = require("morgan");
const studentRoutes = require("./studentRoutes");
const teacherRoutes = require("./teacherRoutes");
const authRoutes = require("./authRoutes");
const subjectRoutes = require("./subjectRoutes");
const classRoutes = require("./classRoutes");
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

route.use(ORIGIN_URI + "/student", studentRoutes);
route.use(ORIGIN_URI + "/teacher", teacherRoutes);
route.use(ORIGIN_URI + "/auth", authRoutes);
route.use(ORIGIN_URI + "/subject", subjectRoutes);
route.use(ORIGIN_URI + "/class", classRoutes);

module.exports = route;
