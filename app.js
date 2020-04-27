const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Import Routes
const authRoutes = require("./routes/authRoute");
//Play ground routes
// const validatorRoutes = require('./playground/validator')
const app = express();

// Setup View Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware Array
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
];
app.use(middleware);

app.use("/auth", authRoutes);
// app.use('/playground', validatorRoutes)

// Router
app.get("/", (req, res) => {
  // res.render('pages/auth/signup', { title: 'Create a new Account'})
  res.send("Hi");
});




const PORT = process.env.PORT || 7777;
mongoose
  .connect("mongodb://localhost:27017/blog", { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((e) => {
    console.log('DB connection failed', e);
  });
