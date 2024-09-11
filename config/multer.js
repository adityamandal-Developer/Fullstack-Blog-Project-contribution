const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("./cloudinary");
console.log(cloudinary)
const storage = new CloudinaryStorage({

  cloudinary,
  // params: {
  //   folder: "fullstack-blog-project",    //uncommented it later
  //   // allowedFormats: ["jpg", "png"],
  // },
});

const upload = multer({ storage });
console.log(upload)
module.exports = upload;
