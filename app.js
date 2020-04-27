const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

// Import Routes
const authRoutes = require("./routes/authRoute");
const dashboardRoutes = require('./routes/dashboardRoute')

// Import Middleware
const { bindUserWithRequest } = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')

// MongoDB session
// const MONGODB_URI = 'mongodb://localhost:27017/blog'
const DB_ADMIN = process.env.DB_ADMIN
const DB_PASSWORD = process.env.DB_PASSWORD
const MONGODB_URI = `mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@eyakub-mzmnx.mongodb.net/blog`
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2
})

const app = express();

// Setup View Engine
app.set("view engine", "ejs");
app.set("views", "views");

if(app.get('env').toLowerCase() === 'development'){
  app.use(morgan('dev'))
}

// Middleware Array
const middleware = [
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRET_KEY || 'SECRET_KEY',
    resave: false,
    saveUninitialized: false,
    store: store
    // cookie: {
    //   maxAge: 60* 60 * 2 
    // }
  }),
  bindUserWithRequest(),
  setLocals(),
  flash(),
];

app.use(middleware);
app.use("/auth", authRoutes);
app.use('/dashboard', dashboardRoutes)

// Router
app.get("/", (req, res) => {
  // res.render('pages/auth/signup', { title: 'Create a new Account'})
  res.send("Hi");
});

const PORT = process.env.PORT || 7777;
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("DB connection failed", e);
  });
