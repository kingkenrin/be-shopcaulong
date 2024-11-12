const shopService = require('../services/shop.service')

class ShopController {
    getShop = async (req, res, next) => {
        try {
            return res.status(201).json(await shopService.getShop())
        } catch (error){
            next(error)
        }
    }

    updateShop = async (req, res, next) => {
        try {
            return res.status(201).json(await shopService.updateShop(req.files, req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new ShopController();