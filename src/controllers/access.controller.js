const AccessService = require('../services/access.service')

class AccessController {
    signUp = async (req, res, next) => {
        try {
            return res.status(201).json(await AccessService.signUp(req.body))
        } catch (error){
            next(error)
        }
    }
    
    login = async (req, res, next) => {
        try {
            return res.status(201).json(await AccessService.login(req.body))
        } catch (error){
            next(error)
        }
    }

    forgotPassword = async (req, res, next) => {
        try {
            return res.status(201).json(await AccessService.forgotPassword(req.body))
        } catch (error){
            next(error)
        }
    }

    confirmCode = async (req, res, next) => {
        try {
            return res.status(201).json(await AccessService.confirmCode(req.body))
        } catch (error){
            next(error)
        }
    }
}

module.exports = new AccessController();