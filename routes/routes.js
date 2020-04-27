const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
const uploadRoute = require('./uploadRoutes')

const routes = [
  {
    path: '/auth',
    handler: authRoute
  },
  {
    path: '/dashboard',
    handler: dashboardRoute
  },
  {
    path: '/uploads',
    handler: uploadRoute
  },
  {
    path: '/',
    handler: (req, res) => {
      res.json({
        message: 'Hello'
      })
    }
  }
]

module.exports = app => {
  routes.forEach(r => {
    if(r.path === '/'){
      app.get(r.path, r.handler)
    } else {
      app.use(r.path, r.handler)
    }
  })
}