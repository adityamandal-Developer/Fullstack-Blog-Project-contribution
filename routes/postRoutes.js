const express = require("express");
const { getPostForm, createPost } = require("../controllers/postController");
const upload = require("../config/multer");
const postRoutes = express.Router();

// get post form
postRoutes.get("/add", getPostForm);

// post logic
postRoutes.post("/add", upload.single("image"), createPost);

module.exports = postRoutes;
