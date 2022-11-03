const express = require('express')
const signUpController = require('../controllers/signup-controller')

const midlewares = require('../midlewares/index')

const router = express.Router();

router.post('/signup', 
    midlewares.checkExistPassword,
    midlewares.checkExistEmail,
    midlewares.checkExistName,
    midlewares.validEmail,
    midlewares.checkIfemailIsinUse,
    signUpController.signUpController
)

module.exports = router