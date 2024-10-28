const categorieService = require('../services/categorie.service')

class CategorieController {
    getAllCategorie = async (req, res, next) => {
        try {
            return res.status(201).json(await categorieService.getAllCategorie())
        } catch (error){
            next(error)
        }
    }

    getCategorieById = async (req, res, next) => {
        try {
            return res.status(201).json(await categorieService.getCategorieById(req.params))
        } catch (error){
            next(error)
        }
    }

    addCategorie = async (req, res, next) => {
        try {
            return res.status(201).json(await categorieService.addCategorie(req.body))
        } catch (error){
            next(error)
        }
    }

    updateCategorie = async (req, res, next) => {
        try {
            return res.status(201).json(await categorieService.updateCategorie(req.body))
        } catch (error){
            next(error)
        }
    }

    deleteCategorie = async (req, res, next) => {
        try {
            return res.status(201).json(await CategorieService.deleteCategorie(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new CategorieController();