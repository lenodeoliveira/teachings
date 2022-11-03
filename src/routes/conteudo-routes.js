const express = require('express')
const router = express.Router();

const midlewares = require('../midlewares/')
const conteudoController = require('../controllers/conteudo-controller')

router.get('/conteudo', midlewares.authorization,conteudoController.conteudoController)

module.exports = router