const cartModel = require('../models/cart.model')
const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class CartService {
    static getAllCart = async () => {
        try {
            const carts = await cartModel.find({}).populate({
                path: "userId",
                select: '_id avatar username name phone email address birthday role discount'
            }).populate('items.productId')

            return carts.map(cart =>
                getData({ fields: ['_id', 'userId', 'items', 'totalPrice'], object: cart })
            )
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getCartById = async ({ id }) => {
        try {
            const cart = await cartModel.findById(id).populate({
                path: "userId",
                select: '_id avatar username name phone email address birthday role discount'
            }).populate('items.productId')

            if (!cart) {
                return {
                    success: false,
                    message: "wrong cart"
                }
            }

            return getData({ fields: ['_id', 'userId', 'items', 'totalPrice'], object: cart })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addCart = async ({ userId, items }) => {
        try {
            const newCart = new cartModel({
                userId,
                items,
            })

            const savedCart = await newCart.save()

            return getData({ fields: ['_id', 'userId', 'items', 'totalPrice'], object: savedCart })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addItemCart = async ({ userId, productId, color, quantity }) => {
        try {
            const user = await userModel.findById(userId)
            const product = await productModel.findById(productId)

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            if (!product) {
                return {
                    success: false,
                    message: "wrong product"
                }
            }

            if(!product.type.some(p => p.color == color)){
                return {
                    success: false,
                    message: "wrong color"
                }
            }

            let cart = await cartModel.findOne({ userId: userId })

            if (!cart) {
                const newCart = new cartModel({
                    userId,
                })

                const savedCart = await newCart.save()
            }

            cart = await cartModel.findOne({ userId: userId })

            if (cart.items.some((item) => item.productId == productId) && cart.items.some((item) => item.color == color)) {
                cart.items.forEach(item => {
                    if (item.productId == productId && item.color == color) {
                        item.quantity += quantity
                    }
                })

                await cart.save()

                return getData({ fields: ['_id', 'userId', 'items', 'totalPrice'], object: cart })
            }
            else {
                cart.items.push({
                    productId,
                    quantity,
                    color
                })

                await cart.save()

                return getData({ fields: ['_id', 'userId', 'items', 'totalPrice'], object: cart })
            }

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteItemCart = async ({ userId, productId,color, quantity }) => {
        try {
            const user = await userModel.findById(userId)
            const product = await productModel.findById(productId)

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            if (!product) {
                return {
                    success: false,
                    message: "wrong product"
                }
            }

            if(!product.type.some(p => p.color == color)){
                return {
                    success: false,
                    message: "wrong color"
                }
            }

            const cart = await cartModel.findOne({ userId: userId })

            if (quantity) {
                if (cart.items.some((item) => item.productId == productId) && cart.items.some((item) => item.color == color)) {
                    cart.items.forEach(item => {
                        if (item.productId == productId && item.color == color) {
                            if (item.quantity > quantity) {
                                item.quantity -= quantity
                            }
                        }
                    })

                    await cart.save()

                    return getData({ fields: ['_id', 'userId', 'items', 'totalPrice'], object: cart })
                }
                else {
                    return {
                        success: false,
                        message: "product not found in cart"
                    }
                }
            }
            else {
                if (cart.items.some((item) => item.productId == productId) && cart.items.some((item) => item.color == color)) {
                    cart.items.forEach((item, index) => {
                        if (item.productId == productId && item.color == color) {
                            cart.items.splice(index, 1)
                        }
                    })

                    await cart.save()

                    return getData({ fields: ['_id', 'userId', 'items', 'totalPrice'], object: cart })
                }
                else {
                    return {
                        success: false,
                        message: "product not found in cart"
                    }
                }
            }


        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteCart = async ({ id }) => {
        try {
            const cart = await cartModel.findByIdAndDelete(id)

            if (!cart) {
                return {
                    success: false,
                    message: "wrong cart"
                }
            }

            return {
                success: true,
                message: "delete successfully"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = CartService;