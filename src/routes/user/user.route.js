const express = require('express')
const accessController = require('../../controllers/access.controller.js')
const userController = require('../../controllers/user.controller.js')
const productController = require('../../controllers/product.controller.js')
const manufactuerController = require('../../controllers/manufactuer.controller.js')
const categorieController = require('../../controllers/categorie.controller.js')
const cartController = require('../../controllers/cart.controller.js')
const orderController = require('../../controllers/order.controller.js')
const couponController = require('../../controllers/coupon.controller.js')

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

//Cart
//[GET] Lay Cart theo id
router.get('/getCart/:id', cartController.getCartById)

//[GET] Lay tat ca Cart
router.get('/getAllCart', cartController.getAllCart)

//[POST] Them Cart
router.post('/addCart', cartController.addCart)

//[POST] Them item Cart
router.post('/addItemCart', cartController.addItemCart)

//[POST] Them item Cart
router.post('/deleteItemCart', cartController.deleteItemCart)

//[PUT] Sua Cart
router.put('/updateCart',cartController.updateCart)

//[DELETE] Xoa Cart
router.delete('/deleteCart', cartController.deleteCart)

//order
//[GET] Lay Order theo id
router.get('/getOrder/:id', orderController.getOrderById)

//[GET] Lay tat ca Order
router.get('/getAllOrder', orderController.getAllOrder)

//[POST] Them Order
router.post('/addOrder', orderController.addOrder)

//[PUT] Sua Order
router.put('/updateOrder',orderController.updateOrder)

//[DELETE] Xoa Order
router.delete('/deleteOrder', orderController.deleteOrder)

//Coupon
//[GET] Lay Coupon theo id
router.get('/getCoupon/:id', couponController.getCouponById)

//[GET] Lay tat ca Coupon
router.get('/getAllCoupon', couponController.getAllCoupon)

//[POST] Them Coupon
router.post('/addCoupon', couponController.addCoupon)

//[PUT] Sua Coupon
router.put('/updateCoupon',couponController.updateCoupon)

//[DELETE] Xoa Coupon
router.delete('/deleteCoupon', couponController.deleteCoupon)

//[POST] Xac nhan Coupon
router.post('/confirmCoupon', couponController.confirmCoupon)

module.exports = router
