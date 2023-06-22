require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const helmet = require("helmet");
// const compression = require("compression");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

// ORIGIN
// const corsOptions = { origin: "https://poetic-halva-a0d5af.netlify.app" };
app.use(cors()); //Handle premission
app.use(express.json()); // POST json data
app.use(helmet()); // Secure HTTP headers
// app.use(
//   compression({
//     level: 6,
//     threshold: 0,
//   })
// ); //Compress response
app.use(routes); // Handle all routes

// Use LOG request
app.use((req, res, next) => {
  console.info(req.method, req.url);
  next();
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.info(`Connect to DB and Listening on http://localhost:${PORT}`)
    );
  })
  .catch((e) => {
    console.error(e.message);
  });
