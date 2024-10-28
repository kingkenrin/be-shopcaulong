const couponModel = require('../models/coupon.model');
const userModel = require('../models/user.model');
const getData = require('../utils/formatRes')
const _ = require('lodash');

class CouponService {
    static getAllCoupon = async () => {
        try {
            const coupon = await couponModel.find({})

            return coupon.map(man =>
                getData({ fields: ['_id', 'name', 'userId', 'code', 'discount', 'startDay', 'endDay',], object: man })
            )
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getCouponById = async ({ id }) => {
        try {
            const coupon = await couponModel.findById(id)

            if (!coupon) {
                return {
                    success: false,
                    message: "wrong coupon"
                }
            }

            return getData({ fields: ['_id', 'name', 'userId', 'code', 'discount', 'startDay', 'endDay',], object: coupon })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addCoupon = async ({ name, code, discount, startDay, endDay }) => {
        try {
            const coupon = await couponModel.findOne({ name: name })

            if (coupon) {
                return {
                    success: false,
                    message: "coupon exists"
                }
            }

            let startdayTemp = undefined
            let enddayTemp = undefined

            if (startDay) {
                const time = startDay.split('/')
                startdayTemp = new Date(time[2], time[1] - 1, time[0])
            }

            if (endDay) {
                const time = endDay.split('/')
                enddayTemp = new Date(time[2], time[1] - 1, time[0])
            }

            if (startdayTemp.getTime() >= enddayTemp.getTime()) {
                return {
                    success: false,
                    message: "start day must be less than end day"
                }
            }

            const newCoupon = new couponModel({
                name,
                userId: [],
                code,
                discount,
                startDay: startdayTemp,
                endDay: enddayTemp,
            })

            const savedCoupon = await newCoupon.save()

            return getData({ fields: ['_id', 'name', 'userId', 'code', 'discount', 'startDay', 'endDay',], object: savedCoupon })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateCoupon = async ({ id, name, discount, startDay, endDay }) => {
        try {
            const coupon = await couponModel.findById(id)

            if (!coupon) {
                return {
                    success: false,
                    message: "wrong coupon"
                }
            }

            if (name)
                coupon.name = name

            if (discount)
                coupon.discount = discount

            if (startDay) {
                const time = startDay.split('/')
                const startdayTemp = new Date(time[2], time[1] - 1, time[0])
                coupon.startDay = startdayTemp
            }

            if (endDay) {
                const time = endDay.split('/')
                const enddayTemp = new Date(time[2], time[1] - 1, time[0])
                coupon.endDay = enddayTemp
            }

            if (coupon.startDay.getTime() >= coupon.endDay.getTime()) {
                return {
                    success: false,
                    message: "start day must be less than end day"
                }
            }

            const savedCoupon = await coupon.save()

            return getData({ fields: ['_id', 'name', 'userId', 'code', 'discount', 'startDay', 'endDay',], object: savedCoupon })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteCoupon = async ({ id }) => {
        try {
            const coupon = await couponModel.findByIdAndDelete(id)

            if (!coupon) {
                return {
                    success: false,
                    message: "wrong coupon"
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

    static confirmCoupon = async ({ userId, code }) => {
        try {
            const user = await userModel.findById(userId)

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            const coupons = await couponModel.find({})

            if (coupons.some(coupon => coupon.code == code)) {
                for (const coupon of coupons) {
                    if (coupon.code == code) {

                        const currentTime = new Date().getTime()

                        if (coupon.startDay.getTime() <= currentTime && coupon.endDay.getTime() >= currentTime) {
                            if (coupon.userId.some(user => user == userId)) {
                                return {
                                    success: false,
                                    message: "coupon can only be used once"
                                }
                            }
                            else {

                                coupon.userId.push(userId)

                                await coupon.save()

                                return {
                                    success: true,
                                    message: "used successfully",
                                    discount: coupon.discount
                                }
                            }
                        }
                        else {
                            if (coupon.startDay.getTime() > currentTime) {
                                return {
                                    success: false,
                                    message: "coupon cannot be used yet"
                                }
                            }

                            if (coupon.endDay.getTime() < currentTime) {
                                return {
                                    success: false,
                                    message: "coupon expires"
                                }
                            }
                        }
                    }
                }
            }
            else {
                return {
                    success: false,
                    message: "invalid code"
                }
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = CouponService;