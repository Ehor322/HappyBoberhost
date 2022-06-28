const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('config');

cloudinary.config({
  cloud_name: config.get('cloudinary_name'),
  api_key: config.get('cloudinary_api_key'),
  api_secret: config.get('cloudinary_api_secret'),
});

const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'images',
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

const uploader = multer({ storage });

export default uploader;