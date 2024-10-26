const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer');

cloudinary.config({ 
  cloud_name: 'dxtslecpc', 
  api_key: '378364589594615', 
  api_secret: 'x2vmAq4Xy0EXdu3d0UpeG0eFIh4'
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'Avatar', 
  allowedFormats: ['jpg', 'png'],
  filename: function (req, res, cb) {
    cb(null, res.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

module.exports = multer({ storage })