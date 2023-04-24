const express = require("express");
const postController = require("../controllers/post");
const router = express.Router();

router.route('/')
    .post(postController.createPost)
    .get(postController.allPosts)
module.exports = router;