const express = require('express')
const accessController = require('../../controllers/access.controller.js')
const userController = require('../../controllers/user.controller.js')
const productController = require('../../controllers/product.controller.js')
const manufactuerController = require('../../controllers/manufactuer.controller.js')
const categorieController = require('../../controllers/categorie.controller.js')

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

//Product
//[GET] Lay Product theo id
router.get('/getProduct/:id', productController.getProductById)

//[GET] Lay tat ca Product
router.get('/getAllProduct', productController.getAllProduct)

//[POST] Them Product
router.post('/addProduct', uploader.array('productImage'), productController.addProduct)

//[PUT] Sua Product
router.put('/updateProduct',uploader.array('productImage'),  productController.updateProduct)

//[DELETE] Xoa Product
router.delete('/deleteProduct', productController.deleteProduct)

//manufactuer
//[GET] Lay manufactuer theo id
router.get('/getManufactuer/:id', manufactuerController.getManufactuerById)

//[GET] Lay tat ca Manufactuer
router.get('/getAllManufactuer', manufactuerController.getAllManufactuer)

//[POST] Them Manufactuer
router.post('/addManufactuer', manufactuerController.addManufactuer)

//[PUT] Sua Manufactuer
router.put('/updateManufactuer',manufactuerController.updateManufactuer)

//[DELETE] Xoa Manufactuer
router.delete('/deleteManufactuer', manufactuerController.deleteManufactuer)

//Categorie
//[GET] Lay Categorie theo id
router.get('/getCategorie/:id', categorieController.getCategorieById)

//[GET] Lay tat ca Categorie
router.get('/getAllCategorie', categorieController.getAllCategorie)

//[POST] Them Categorie
router.post('/addCategorie', categorieController.addCategorie)

//[PUT] Sua Categorie
router.put('/updateCategorie',categorieController.updateCategorie)

//[DELETE] Xoa Categorie
router.delete('/deleteCategorie', categorieController.deleteCategorie)

module.exports = router
