const cartService = require('../services/cart.service')

class CartController {
    getAllCart = async (req, res, next) => {
        try {
            return res.status(201).json(await cartService.getAllCart())
        } catch (error){
            next(error)
        }
    }

    getCartById = async (req, res, next) => {
        try {
            return res.status(201).json(await cartService.getCartById(req.params))
        } catch (error){
            next(error)
        }
    }

    addCart = async (req, res, next) => {
        try {
            return res.status(201).json(await cartService.addCart(req.body))
        } catch (error){
            next(error)
        }
    }

    addItemCart = async (req, res, next) => {
        try {
            return res.status(201).json(await cartService.addItemCart(req.body))
        } catch (error){
            next(error)
        }
    }

    deleteItemCart = async (req, res, next) => {
        try {
            return res.status(201).json(await cartService.deleteItemCart(req.body))
        } catch (error){
            next(error)
        }
    }

    updateCart = async (req, res, next) => {
        try {
            return res.status(201).json(await cartService.updateCart(req.body))
        } catch (error){
            next(error)
        }
    }

    deleteCart = async (req, res, next) => {
        try {
            return res.status(201).json(await cartService.deleteCart(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new CartController();