const orderModel = require('../models/order.model')
const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class OrderService {
    static getAllOrder = async () => {
        try {
            const orders = await orderModel.find({}).populate({
                path: "userId",
                select: '_id avatar username name phone email address birthday role discount'
            }).populate('items.productId')

            return orders.map(order =>
                getData({ fields: ['_id', 'userId', 'items', 'address', 'note', 'state', 'discount', 'totalPrice',], object: order })
            )
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getOrderById = async ({ id }) => {
        try {
            const order = await orderModel.findById(id).populate({
                path: "userId",
                select: '_id avatar username name phone email address birthday role discount'
            }).populate('items.productId')

            if (!order) {
                return {
                    success: false,
                    message: "wrong order"
                }
            }

            return getData({ fields: ['_id', 'userId', 'items', 'address', 'note', 'state', 'discount', 'totalPrice',], object: order })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addOrder = async ({ userId, items, address, note, discount, }) => {
        try {
            const products = await productModel.find({})
            const user = await userModel.findById(userId)

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            for (let item of items) {
                let flag = false

                products.forEach(product => {
                    if (product.id == item.productId) {
                        product.type.forEach(p => {
                            if (p.color == item.color) {
                                item.price = p.price - product.discount

                                flag = true
                            }
                        })
                    }
                })

                if (!flag) {
                    return {
                        success: false,
                        message: "wrong items in order"
                    }
                }
            }

            const newOrder = new orderModel({
                userId,
                items,
                address,
                note,
                state: 'Pending',
                discount,
            })

            const savedOrder = await newOrder.save()

            return getData({ fields: ['_id', 'userId', 'items', 'address', 'note', 'state', 'discount', 'totalPrice', 'createdAt'], object: savedOrder })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateOrder = async ({ id, address, note, state, discount, }) => {
        try {
            const products = await productModel.find({})
            const order = await orderModel.findById(id)

            if (!order) {
                return {
                    success: false,
                    message: "wrong order"
                }
            }

            if (address)
                order.address = address

            if (note)
                order.note = note

            if (state) {
                if (state == "Done") {
                    for (const item of order.items) {
                        for (const product of products) {
                            if (product.id == item.productId) {
                                for (const t of product.type) {
                                    if (t.color == item.color) {
                                        if (t.quantity >= item.quantity) {
                                            t.quantity -= item.quantity;

                                            await product.save();
                                        }
                                        else {
                                            return {
                                                success: false,
                                                message: "item in order are out of stock"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                order.state = state
            }

            if (discount)
                order.discount = discount

            const savedOrder = await order.save()

            return getData({ fields: ['_id', 'userId', 'items', 'address', 'note', 'state', 'discount', 'totalPrice', 'createdAt'], object: savedOrder })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteOrder = async ({ id }) => {
        try {
            const order = await orderModel.findById(id)

            if (!order) {
                return {
                    success: false,
                    message: "wrong order"
                }
            }

            if (order.state != "Pending") {
                return {
                    success: false,
                    message: "can only delete in pending state"
                }
            }

            await orderModel.findByIdAndDelete(id)

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

module.exports = OrderService;