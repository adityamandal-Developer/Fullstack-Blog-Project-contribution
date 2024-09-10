const Post = require("../models/Post");

// Rendering post form
exports.getPostForm = (req, res) => {
  res.render("newPost", { title: "Create Post", user: req.user });
};

exports.createPost = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  log(req.file);
  const { title, content } = req.body;
  // console.log(req.file);

  const newPost = await Post.create({
    title,
    content,
    author: req.user._conditions._id,
  });
  console.log(newPost);
  res.redirect("/posts");
};
