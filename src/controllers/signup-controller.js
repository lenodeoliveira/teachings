const rescue = require('express-rescue')
const signUpService = require('../service/signUp-service')

const signUpController = rescue(async (req, res, next) => {
    try {
        const usuario = await signUpService.adicionaUsuarioService(req.body)
        
        if(!usuario) throw new Error()

        res.status(201).json()
    } catch (err) {
        res.status(500).json({message: 'Server Error'})
    }
})

module.exports = {
    signUpController
}