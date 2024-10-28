const orderService = require('../services/order.service')

class OrderController {
    getAllOrder = async (req, res, next) => {
        try {
            return res.status(201).json(await orderService.getAllOrder())
        } catch (error){
            next(error)
        }
    }

    getOrderById = async (req, res, next) => {
        try {
            return res.status(201).json(await orderService.getOrderById(req.params))
        } catch (error){
            next(error)
        }
    }

    addOrder = async (req, res, next) => {
        try {
            return res.status(201).json(await orderService.addOrder(req.body))
        } catch (error){
            next(error)
        }
    }

    updateOrder = async (req, res, next) => {
        try {
            return res.status(201).json(await orderService.updateOrder(req.body))
        } catch (error){
            next(error)
        }
    }

    deleteOrder = async (req, res, next) => {
        try {
            return res.status(201).json(await orderService.deleteOrder(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new OrderController();