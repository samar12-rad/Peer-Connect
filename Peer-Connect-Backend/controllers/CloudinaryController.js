const multer = require('multer');
const {
  uploadImage,
  optimizeImage,
  autoCropImage,
} = require('../utils/cloudinary'); //

const path = require('path');
const cloudinary = require('cloudinary').v2;

const storage = multer.memoryStorage(); // Use memoryStorage for Cloudinary
const upload = multer({ storage });

async function Upload(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file Found' });
    }

    const public_id = `uploaded_omr_sheet_${Date.now()}`;

    // Optionally, upload to Cloudinary or any other storage
    const imageUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const result = await uploadImage(imageUrl, public_id);

    // Send the Cloudinary URL back to the frontend
    res.json({
      message: 'File uploaded successfully',
      url: result.secure_url,
      public_id: public_id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function removeFile(req, res) {
  try {
    const { public_id } = req.body;
    const result = await cloudinary.uploader.destroy(public_id);
    res.json({ message: 'File deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  Upload,
  removeFile,
};
