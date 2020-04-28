const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');

router.get('/admins', userCtrl.getAdmins); //recup tous les admins
router.post('/', userCtrl.newUser); // creation user
router.get('/:fbId', userCtrl.getOneUser); // recup 1 user
router.put('/:fbId', userCtrl.updateUser); // update user

module.exports = router;