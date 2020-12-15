const express = require("express");

const router = express.Router();

const { uploadImage } = require("../../multer/uploadimg");

//Authentication
const { register, login, auth } = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
///////////

//Post
const {
  addPost,
  getPosts,
  getPostById,
  deletePost,
} = require("../controllers/post");
router.post("/post/add", auth, uploadImage("images"), addPost);
router.get("/posts", getPosts);
router.get("/post/:id", getPostById);
router.delete("/post/:id", deletePost);

module.exports = router;
