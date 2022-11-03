const db = require('../conf/db.connection')

const recuperaConteudos = async () => {
    const conteudos = await db.select()
    .table('conteudo')
    return conteudos
}

module.exports = {
    recuperaConteudos
}