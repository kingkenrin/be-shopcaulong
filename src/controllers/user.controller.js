const userService = require('../services/user.service')

class UserController {
    getAllUser = async (req, res, next) => {
        try {
            return res.status(201).json(await userService.getAlluser())
        } catch (error){
            next(error)
        }
    }

    getUserById = async (req, res, next) => {
        try {
            return res.status(201).json(await userService.getUserById(req.params))
        } catch (error){
            next(error)
        }
    }

    addUser = async (req, res, next) => {
        try {
            return res.status(201).json(await userService.addUser(req.file, req.body))
        } catch (error){
            next(error)
        }
    }

    updateUser = async (req, res, next) => {
        try {
            return res.status(201).json(await userService.updateUser(req.file, req.body))
        } catch (error){
            next(error)
        }
    }

    deleteUser = async (req, res, next) => {
        try {
            return res.status(201).json(await userService.deleteUser(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new UserController();