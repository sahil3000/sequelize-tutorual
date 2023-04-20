const { Op } = require('sequelize');
const db = require('../models/connection');
const client = require('../redisConnection');
const Users = db.users;

const userController = {
    create: async function (req, res) {
        const {name, email, gender} = req.body;
        if (!name || !email || !gender) {
            return res.status(401).json({
                error: true,
                body: [],
                msg: 'all field are mandatory'
             })
        }
        try {
            const data = await Users.create({
                name, gender, email
            })

            res.status(201).json({
                error: false,
                body: data,
                msg: 'user successfully created'
            });
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    createBulk: async function (req, res) {
        
        try {
            const data = await Users.bulkCreate(req.body)

            res.status(201).json({
                error: false,
                body: data,
                msg: 'users successfully created'
            });
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    allUsers: async function (req, res) {
        const {email} = req.query
        let findData = {};

        // if email pass as query paramter
        if (email) {
            findData = {
                where: {
                    email: email
                }
            }
        }

        try {
            const response = await Users.findAll(findData);
            return res.json({
                error: false,
                body: response,
                msg: 'all users successfully get'
            })
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    allWithPagination: async function (req, res) {
        const {email, page, limit} = req.query;
        // page start from 1
        const pageNo  = page ? page: 1;
        const recordPerPage  = limit ? limit : 10;
        console.log("recordPerPage",recordPerPage)
        const start = (Number(pageNo) - 1) * recordPerPage;
        if (start < 0) {
            return res.status(401).json({
                error: true,
                body: [],
                msg: "page number should be 1 or more"
            });
        }
        let findData = {
            limit: Number(recordPerPage),
            offset: start,
        };

        // if email pass as query paramter
        if (email) {
            findData = {
                where: {
                    email: email
                },
                limit: Number(recordPerPage),
                offset: start,
            }
        }

        try {
            const response = await Users.findAndCountAll(findData);
            return res.json({
                error: false,
                body: response,
                msg: 'all users successfully get'
            })
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    specificUser: async function (req, res) {
        const {id} = req.params;
        
        try {
            const response = await Users.findOne({ where: {
                id: id
            }});
            return res.status(200).json({
                error: false,
                body: response,
                msg: 'user successfully get'
            })
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    updateUser: async function (req, res) {
        try {
            const findUser = await Users.findOne({ where: {id: req.body.id} })
            if (findUser) {
                const updateData = {
                    name: req.body.name ? req.body.name: findUser.name,
                    email: req.body.email ? req.body.email: findUser.email,
                    gender: req.body.gender ? req.body.gender: findUser.gender,
                };
                const response = await Users.update(updateData, { where: {id: req.body.id} })
                
                return res.status(200).json({
                    error: false,
                    body: response,
                    msg: 'user successfully updated'
                })
            } else {
                res.status(403).json({
                    error: true,
                    body: [],
                    msg: "user not valid"
                });    
            }
            
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    deleteUser: async function (req, res) {
        try {
            const {id} = req.params;
            const response = await Users.destroy({ where: { id: id } })
            return res.status(200).json({
                error: false,
                body: response,
                msg: 'user successfully deleted'
            })
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    selectAttributes: async function (req, res) {
        try {
            const response = await Users.findAll({
                attributes: ["email","name"]
            });
            return res.json({
                error: false,
                body: response,
                msg: 'all users successfully get'
            })
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    isGmailDomainEmail: async function (req, res) {
        try {
            const response = await Users.findAll({
                where : {
                    email: { [Op.like]: '%@gmail.com' }
                },
                attributes: ["email","name"],

            });
            return res.json({
                error: false,
                body: response,
                msg: 'gmail domain records'
            })
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },
    
    sorting: async function (req, res) {
        try {
            const response = await Users.findAll({
                attributes: ["email", "name", "gender", "id"],
                order: [
                    ['id', "DESC"]
                ]
            });
            return res.json({
                error: false,
                body: response,
                msg: 'gmail domain records'
            })
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    register: async function (req, res) {
        const {name, email, gender} = req.body;
        if (!name || !email || !gender) {
            return res.status(401).json({
                error: true,
                body: [],
                msg: 'all field are mandatory'
             })
        }
        try {
            const [data, isCreated] = await Users.findOrCreate({
                where: {
                    email: email
                },
                defaults: {
                    name, gender, email
                }
            });

            res.status(201).json({
                error: false,
                body: data,
                msg: isCreated ? 'user successfully created': 'User already exist'
            });
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    getUsers: async function (req, res) {
        try {
            let data = await client.get("UserDetails"); 
            if (data) {
                data = JSON.parse(data);
            } else {
                data = await Users.findAll();
                // expire in 15 seconds
                client.set('UserDetails', JSON.stringify(data),{ EX: 15 })
            }

            res.status(200).json({
                error: false,
                body: data,
                msg: 'users list successfully get'
            });
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    getUsers: async function (req, res) {
        try {
            let data = await client.get("UserDetails"); 
            if (data) {
                data = JSON.parse(data);
            } else {
                data = await Users.findAll();
                // expire in 15 seconds
                client.set('UserDetails', JSON.stringify(data),{ EX: 15 })
            }

            res.status(200).json({
                error: false,
                body: data,
                msg: 'users list successfully get'
            });
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },

    getUsersWithAPiHitLimit: async function (req, res) {
        try {
            let data = await Users.findAll();

            res.status(200).json({
                error: false,
                body: data,
                apiHitCount: req.request,
                msg: 'users list successfully get'
            });
        } catch (err) {
            res.status(500).json({
                error: true,
                body: [],
                msg: err.message
            });
        }
    },
}
module.exports = userController;