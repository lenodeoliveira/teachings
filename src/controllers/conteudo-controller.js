const rescue = require('express-rescue')
const conteudoService = require('../service/conteudo-service')

const conteudoController = rescue(async(req, res, _next) => {
    try {
        const conteudo = await conteudoService.recuperaConteudos()

        return res.status(200).json(conteudo)

    }catch (error) {
        return res.status(500).json({ error: 'Server error' })
    }
})

module.exports = {
    conteudoController
}