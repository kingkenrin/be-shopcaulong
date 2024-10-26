const express = require('express')
const accessController = require('../../controllers/access.controller.js')
const userController = require('../../controllers/user.controller.js')

const uploader = require('../../configs/config.cloudinary.js')

const router = express.Router()

//SIGNUP
router.post('/signUp', accessController.signUp)

//LOGIN
router.post('/login', accessController.login)

//FORGOTPASSWORD
router.post('/forgotPassword', accessController.forgotPassword)

//CONFIRMCODE
router.post('/confirmCode', accessController.confirmCode)

//USER
//[GET] Lay user theo id
router.get('/getUser/:id', userController.getUserById)

//[GET] Lay tat ca user
router.get('/getAllUser', userController.getAllUser)

//[POST] Them user
router.post('/addUser', uploader.single('avatar'), userController.addUser)

//[PUT] Sua user
router.put('/updateUser',uploader.single('avatar'),  userController.updateUser)

//[DELETE] Xoa user
router.delete('/deleteUser', userController.deleteUser)

module.exports = router
