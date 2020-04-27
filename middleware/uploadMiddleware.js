const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  // cb = callback
  destination: (req, res, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5 * 8
  },
  fileFilter: (req, file, cb) => {
    const types = /jpeg|jpg|png|gif/
    const extName = types.test(path.extname(file.originalname).toLowerCase())
    const mimeType = types.test(file.mimetype)

    if(extName && mimetype){
      cb(null, true)
    } else {
      new Error('Only support JPG || JPEG || PNG || GIF file')
    }
  }
})

module.exports = upload