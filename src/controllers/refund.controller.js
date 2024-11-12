const refundService = require('../services/refund.service')

class RefundController {
    getAllRefund = async (req, res, next) => {
        try {
            return res.status(201).json(await refundService.getAllRefund())
        } catch (error){
            next(error)
        }
    }

    getRefundById = async (req, res, next) => {
        try {
            return res.status(201).json(await refundService.getRefundById(req.params))
        } catch (error){
            next(error)
        }
    }

    addRefund = async (req, res, next) => {
        try {
            return res.status(201).json(await refundService.addRefund(req.body))
        } catch (error){
            next(error)
        }
    }

    updateRefund = async (req, res, next) => {
        try {
            return res.status(201).json(await refundService.updateRefund(req.body))
        } catch (error){
            next(error)
        }
    }

    deleteRefund = async (req, res, next) => {
        try {
            return res.status(201).json(await refundService.deleteRefund(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new RefundController();