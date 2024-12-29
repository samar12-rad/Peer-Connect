// cloudinary.js
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'driiwjpqc',
  api_key: '342835513219975',
  api_secret: 'BRizel2b6a7j_F-Rz9Az3BUJMjI',
});

// Function to upload an image
const uploadImage = async (imageUrl, publicId) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      public_id: publicId,
    });
    return uploadResult;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

// Function to optimize image
const optimizeImage = (publicId) => {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
  });
};

// Function to auto-crop image
const autoCropImage = (publicId) => {
  return cloudinary.url(publicId, {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
  });
};

module.exports = {
  uploadImage,
  optimizeImage,
  autoCropImage,
};
