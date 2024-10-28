const orderModel = require('../models/order.model')
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
            const newOrder = new orderModel({
                userId,
                items,
                address,
                note,
                state: 'Pending',
                discount,
            })

            const savedOrder = await newOrder.save()

            return getData({ fields: ['_id', 'userId', 'items', 'address', 'note', 'state', 'discount', 'totalPrice',], object: savedOrder })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateOrder = async ({ id, address, note, state, discount, }) => {
        try {
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

            if (state)
                order.state = state

            if (discount)
                order.discount = discount

            const savedOrder = await order.save()

            return getData({ fields: ['_id', 'userId', 'items', 'address', 'note', 'state', 'discount', 'totalPrice',], object: savedOrder })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteOrder = async ({ id }) => {
        try {
            const order = await orderModel.findByIdAndDelete(id)

            if (!order) {
                return {
                    success: false,
                    message: "wrong order"
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

module.exports = OrderService;