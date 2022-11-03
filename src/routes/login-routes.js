const express = require('express')
const router = express.Router();

const midlewares = require('../midlewares/')
const loginController = require('../controllers/login-controller')

router.post('/login', midlewares.checkExistEmail, 
    midlewares.checkExistPassword,
    midlewares.validEmail,
    midlewares.authentication,
    loginController.loginController
    )

module.exports = router