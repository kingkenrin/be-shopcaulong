const manufactuerService = require('../services/manufactuer.service')

class ManufactuerController {
    getAllManufactuer = async (req, res, next) => {
        try {
            return res.status(201).json(await manufactuerService.getAllManufactuer())
        } catch (error){
            next(error)
        }
    }

    getManufactuerById = async (req, res, next) => {
        try {
            return res.status(201).json(await manufactuerService.getManufactuerById(req.params))
        } catch (error){
            next(error)
        }
    }

    addManufactuer = async (req, res, next) => {
        try {
            return res.status(201).json(await manufactuerService.addManufactuer(req.body))
        } catch (error){
            next(error)
        }
    }

    updateManufactuer = async (req, res, next) => {
        try {
            return res.status(201).json(await manufactuerService.updateManufactuer(req.body))
        } catch (error){
            next(error)
        }
    }

    deleteManufactuer = async (req, res, next) => {
        try {
            return res.status(201).json(await manufactuerService.deleteManufactuer(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new ManufactuerController();