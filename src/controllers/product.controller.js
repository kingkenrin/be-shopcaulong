const productService = require('../services/product.service')

class ProductController {
    getAllProduct = async (req, res, next) => {
        try {
            return res.status(201).json(await productService.getAllProduct())
        } catch (error){
            next(error)
        }
    }

    getProductById = async (req, res, next) => {
        try {
            return res.status(201).json(await productService.getProductById(req.params))
        } catch (error){
            next(error)
        }
    }

    addProduct = async (req, res, next) => {
        try {
            return res.status(201).json(await productService.addProduct(req.files, req.body))
        } catch (error){
            next(error)
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            return res.status(201).json(await productService.updateProduct(req.files, req.body))
        } catch (error){
            next(error)
        }
    }

    deleteProduct = async (req, res, next) => {
        try {
            return res.status(201).json(await productService.deleteProduct(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new ProductController();