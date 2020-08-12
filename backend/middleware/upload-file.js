const multer = require('multer');
// const uploadFile = multer({dest: 'uploads/'});

const storage = multer.diskStorage({
  destination (req,file,cb) {
    cb(null, './uploads/')
  },
  filename (req,file,cb) {
    cb(null, `${Date.now()}-blog-app-${file.originalname}`)
  }
});

const limits = {fileSize: 1024*1024*5}; //accepts up to 5MB

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('please upload only images.', false);
  }
}

const uploadFile = multer({storage, limits, fileFilter})

module.exports = uploadFile;
