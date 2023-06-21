require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

// ORIGIN
// const corsOptions = { origin: "https://poetic-halva-a0d5af.netlify.app" };
app.use(cors());

// POST json data
app.use(express.json());

// Use LOG request
app.use((req, res, next) => {
  console.info(req.method, req.url);
  next();
});

app.use(routes);

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
