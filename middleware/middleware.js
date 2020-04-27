const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const MongoDBStore = require('connect-mongodb-session')(session)
const {bindUserWithRequest} = require('./authMiddleware')
const setLocals = require('./setLocals')
const config = require('config')

// const MONGODB_URI = 'mongodb://localhost:27017/blog'
const MONGODB_URI = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@eyakub-mzmnx.mongodb.net/blog`
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2
})

// if(app.get('env').toLowerCase() === 'development'){
//   app.use(morgan('dev'))
// }

// Middleware Array
const middleware = [
  morgan('dev'),
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


module.exports = app => {
  middleware.forEach(m => {
    app.use(m)
  })
}