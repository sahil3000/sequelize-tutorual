const db = require("../models/connection");
const Posts = db.posts
const Users = db.users
const postController = {
    createPost: async function (req, res) {
        const { title, description, userId } = req.body;

        if (!title || !description || !userId) {
            return res.status(401).json({
                msg: "all field are mandatory",
                error: true,
                body: []
            })
        }
        try {
            const response = await Posts.create({title, description, userId});
            return res.status(201).json({
                error: false,
                msg: 'post successfully created',
                body: response
            });
        } catch (err) {
            return res.status(500).json({
                error: true,
                msg: err.message,
                body: []
            });
        }

    },
    allPosts: async function (req, res) {
        try {
            console.log("innnnnnnnnnn")
            const response = await Posts.findAll({
                attributes: ['id', 'title', 'description'],
                include: {
                    model: Users,
                    attributes: ['id', 'name', 'gender'],
                    as: 'userDetail'
                }
            });
            return res.status(200).json({
                error: false,
                msg: 'post successfully get',
                body: response
            });
        } catch (err) {
            return res.status(500).json({
                error: true,
                msg: err.message,
                body: []
            });
        }

    }
}
module.exports = postController;