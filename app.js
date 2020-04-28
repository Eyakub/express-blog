const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const dotenv = require('dotenv')

const setMiddleware = require("./middleware/middleware");
const setRoutes = require("./routes/routes");

dotenv.config();
console.log(`port is: ${process.env.PORT}`)
const DB_ADMIN = process.env.DB_ADMIN;
const DB_PASSWORD = process.env.DB_PASSWORD;
const MONGODB_URI = `mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@eyakub-mzmnx.mongodb.net/blog`;

const app = express();

// Setup View Engine
app.set("view engine", "ejs");
app.set("views", "views");

// using middleware from middleware directory
setMiddleware(app);

// using routes from Route directory
setRoutes(app);

app.use((req, res, next) => {
  let error = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  if (error.status === 404) {
    return res.render("pages/error/404", {flashMessage: {}});
  }
  console.log(error)
  res.render('pages/error/500', {flashMessage: {}})
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log("DB connection failed", e);
  });
