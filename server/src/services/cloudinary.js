const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images (JPEG/PNG) are allowed'));
  },
});

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'hrms_profiles',
      allowed_formats: ['jpg', 'jpeg', 'png'],
    });
    return result.secure_url;
  } catch (err) {
    throw new Error(`Cloudinary upload failed: ${err.message}`);
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(`hrms_profiles/${publicId}`);
  } catch (err) {
    console.error(`Cloudinary deletion failed: ${err.message}`);
  }
};

module.exports = { upload, uploadToCloudinary, deleteFromCloudinary, cloudinary };