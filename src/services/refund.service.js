const refundModel = require('../models/refund.model')
const productModel = require('../models/product.model')
const orderModel = require('../models/order.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class RefundService {
    static getAllRefund = async () => {
        try {
            const refund = await refundModel.find({})

            return refund.map(re =>
                getData({ fields: ['_id', 'orderId', 'reason', 'state'], object: re })
            )
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getRefundById = async ({ id }) => {
        try {
            const refund = await refundModel.findById(id)

            if (!refund) {
                return {
                    success: false,
                    message: "wrong refund"
                }
            }

            return getData({ fields: ['_id', 'orderId', 'reason', 'state'], object: refund })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addRefund = async ({ orderId, reason }) => {
        try {
            const order = await orderModel.findById(orderId)
            const refund = await refundModel.findOne({ orderId: orderId })

            if (refund) {
                return {
                    success: false,
                    message: "refund exists"
                }
            }

            if (!order) {
                return {
                    success: false,
                    message: "wrong order"
                }
            }
            else{
                if(order.state != "Done"){
                    return {
                        success: false,
                        message: "only received order can be refund"
                    }
                }
            }

            const newRefund = new refundModel({
                orderId,
                reason,
                state: "Pending"
            })

            const savedRefund = await newRefund.save()

            return getData({ fields: ['_id', 'orderId', 'reason', 'state'], object: savedRefund })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateRefund = async ({ id, reason, state }) => {
        try {
            const refund = await refundModel.findById(id)

            if (!refund) {
                return {
                    success: false,
                    message: "wrong refund"
                }
            }

            if (refund.state == "Done") {
                if (state != "Done") {
                    return {
                        success: false,
                        message: "product is refunded"
                    }
                }
            }
            else {
                if (state == "Done") {
                    const products = await productModel.find({})

                    const order = await orderModel.findById(refund.orderId)

                    for (const item of order.items) {
                        for (const product of products) {
                            if (product.id == item.productId) {
                                for (const t of product.type) {
                                    if (t.color == item.color) {
                                        t.quantity += item.quantity;

                                        await product.save();
                                    }
                                }
                            }
                        }
                    }

                    refund.state = "Done"
                    order.state = "Refund"

                    await order.save()
                    await refund.save()
                }
            }

            if (state)
                refund.state = state

            if (reason)
                refund.reason = reason

            const savedRefund = await refund.save()

            return getData({ fields: ['_id', 'orderId', 'reason', 'state'], object: savedRefund })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteRefund = async ({ id }) => {
        try {
            const refund = await refundModel.findByIdAndDelete(id)

            if (!refund) {
                return {
                    success: false,
                    message: "wrong refund"
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

module.exports = RefundService;