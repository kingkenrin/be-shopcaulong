const categorieModel = require('../models/categorie.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class CategorieService {
    static getAllCategorie = async () => {
        try {
            const categories = await categorieModel.find({})

            return categories.map(cat =>
                getData({ fields: ['_id', 'name'], object: cat })
            )
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getCategorieById = async ({ id }) => {
        try {
            const categorie = await categorieModel.findById(id)

            if (!categorie) {
                return {
                    success: false,
                    message: "wrong categorie"
                }
            }

            return getData({ fields: ['_id', 'name'], object: categorie })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addCategorie = async ({ name, information }) => {
        try {
            const categorie = await categorieModel.findOne({ name: name })

            if (categorie) {
                return {
                    success: false,
                    message: "categorie exists"
                }
            }

            const newcategorie = new categorieModel({
                name
            })

            const savedcategorie = await newcategorie.save()

            return getData({ fields: ['_id', 'name'], object: savedcategorie })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateCategorie = async ({ id, name, information }) => {
        try {
            const categorie = await categorieModel.findById(id)

            if (!categorie) {
                return {
                    success: false,
                    message: "wrong categorie"
                }
            }

            if (name)
                categorie.name = name

            const savedcategorie = await categorie.save()

            return getData({ fields: ['_id', 'name'], object: savedcategorie })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteCategorie = async ({ id }) => {
        try {
            const categorie = await categorieModel.findByIdAndDelete(id)

            if (!categorie) {
                return {
                    success: false,
                    message: "wrong categorie"
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

module.exports = CategorieService;