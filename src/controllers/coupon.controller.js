const couponService = require('../services/coupon.service')

class CouponController {
    getAllCoupon = async (req, res, next) => {
        try {
            return res.status(201).json(await couponService.getAllCoupon())
        } catch (error){
            next(error)
        }
    }

    getCouponById = async (req, res, next) => {
        try {
            return res.status(201).json(await couponService.getCouponById(req.params))
        } catch (error){
            next(error)
        }
    }

    addCoupon = async (req, res, next) => {
        try {
            return res.status(201).json(await couponService.addCoupon(req.body))
        } catch (error){
            next(error)
        }
    }

    updateCoupon = async (req, res, next) => {
        try {
            return res.status(201).json(await couponService.updateCoupon(req.body))
        } catch (error){
            next(error)
        }
    }

    deleteCoupon = async (req, res, next) => {
        try {
            return res.status(201).json(await couponService.deleteCoupon(req.body))
        } catch (error){
            next(error)
        }
    }
    
    confirmCoupon = async (req, res, next) => {
        try {
            return res.status(201).json(await couponService.confirmCoupon(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new CouponController();