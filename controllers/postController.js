const Post = require("../models/Post");

// Rendering post form
exports.getPostForm = (req, res) => {
  res.render("newPost", { title: "Create Post", user: req.user });
};

exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const { title, content } = req.body;

    const newPost = await Post.create({
      title,
      content,
      // author: req.user._id,    // Uncomment this line later
      image: {
        url: req.file.path,
        public_id: req.file.filename
      }
    });

    console.log(newPost);
    res.redirect("/posts");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("An error occurred while creating the post");
  }
};