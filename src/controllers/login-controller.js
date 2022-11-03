const rescue = require('express-rescue')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const loginController = rescue(async(req, res, _next) => {
    try {
        const acessToken = jwt.sign({ email: req.body.email }, process.env.SECRET, {
            expiresIn: '2 days',
        })
        res.status(200).json({token: acessToken})
    }catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
})


module.exports = {
    loginController
}