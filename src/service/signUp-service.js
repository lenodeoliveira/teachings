const bcrypt = require('bcrypt')
const db = require('../conf/db.connection')

const adicionaUsuarioService = async (usuario) => {
    const salt = 12
    const hashedPassword = await bcrypt.hash(usuario.senha, salt)

    const user = { ...usuario, senha: hashedPassword }

    const createdUser = await db('usuarios').insert(user).then(res => res)
    .catch(err => err.sqlMessage)
    return createdUser ? true : false
}

const findUserService = async (email) => {
    const [ RowDataPacket ] = await db('usuarios').where('email', email)

    return RowDataPacket

}

module.exports = {
    adicionaUsuarioService,
    findUserService
}