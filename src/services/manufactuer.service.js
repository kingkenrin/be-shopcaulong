const manufactuerModel = require('../models/manufactuer.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class ManufactuerService {
    static getAllManufactuer = async () => {
        try {
            const manufactuer = await manufactuerModel.find({})

            return manufactuer.map(man =>
                getData({ fields: ['_id', 'name', 'information'], object: man })
            )
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getManufactuerById = async ({ id }) => {
        try {
            const manufactuer = await manufactuerModel.findById(id)

            if (!manufactuer) {
                return {
                    success: false,
                    message: "wrong manufactuer"
                }
            }

            return getData({ fields: ['_id', 'name', 'information'], object: manufactuer })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addManufactuer = async ({ name, information }) => {
        try {
            const manufactuer = await manufactuerModel.findOne({ name: name })

            if (manufactuer) {
                return {
                    success: false,
                    message: "manufactuer exists"
                }
            }

            const newManufactuer = new manufactuerModel({
                name, 
                information
            })

            const savedManufactuer = await newManufactuer.save()

            return getData({ fields: ['_id', 'name', 'information'], object: savedManufactuer })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateManufactuer = async ({ id, name, information }) => {
        try {
            const manufactuer = await manufactuerModel.findById(id)

            if (!manufactuer) {
                return {
                    success: false,
                    message: "wrong manufactuer"
                }
            }

            if (name)
                manufactuer.name = name

            if (information)
                manufactuer.information = information

            const savedManufactuer = await manufactuer.save()

            return getData({ fields: ['_id', 'name', 'information'], object: savedManufactuer })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteManufactuer = async ({ id }) => {
        try {
            const manufactuer = await manufactuerModel.findByIdAndDelete(id)

            if (!manufactuer) {
                return {
                    success: false,
                    message: "wrong manufactuer"
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

module.exports = ManufactuerService;