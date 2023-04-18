const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.post('/create', userController.create);
router.post('/createBulk', userController.createBulk);
router.get('/all', userController.allUsers);
router.get('/allWithPagination', userController.allWithPagination);
router.get('/byId/:id', userController.specificUser);
router.put('/updateUser', userController.updateUser);
router.delete('/remove/:id', userController.deleteUser);
router.get('/selectAttributes', userController.selectAttributes);
router.get('/sorting', userController.sorting);

// example for like operator -> fetch record where account from gmail.com
router.get('/isGmailDomainEmail', userController.isGmailDomainEmail);

module.exports = router;