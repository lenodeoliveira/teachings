const bcrypt = require('bcrypt')
const findUserService = require('../service/signUp-service')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const existField = (object) => {
    const fieldName = Object.keys(object);
  
    if (!object[fieldName] && object[fieldName] !== '') {
      return { isExists: true, message: `"${fieldName}" is required` };
    }
  
    return { isExists: false };
  };

const checkExistPassword = (req, res, next) => {
    const { senha } = req.body;
    const { isExists, message } = existField({ senha });
  
    if (isExists) {
      return res.status(400).json({ message });
    }
    next();
};

const checkExistEmail = (req, res, next) => {
    const { email } = req.body
    const {isExists, message } = existField({ email })

    if(isExists) {
        return res.status(400).json({ message })
    }

    next()
}

const checkExistName = (req, res, next) => {
    const { nome } = req.body

    const { isExists, message } = existField( { nome} )

    if(isExists) {
        return res.status(400).json({ message })
    }

    next()
}

const validEmail = (req, res, next) => {
    const { email } = req.body

    const regEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

     if(!regEmail.test(email)) {
        return res.status(400).json( { message: 'Email invalido' })
     }

    next()
}

const checkIfemailIsinUse = async (req, res, next) => {
    const { email } = req.body

    const user = await findUserService.findUserService(email)

     if(user) {
        return res.status(400).json( { message: 'Email já está em uso' })
     }

    next()
}

const authentication = async (req, res, next) => {
    const { email, senha } = req.body

    const user = await findUserService.findUserService(email)
    if(!user) {
        return res.status(401).json( { message: 'Usuário não existe!' })
    }

    const isValid = await bcrypt.compare(senha, user.senha)
    if (!isValid) return res.status(401).json( { message: 'Não autorizado' }) 

    next()
}

const authorization = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).json( { message: 'Necessário enviar token de acesso!' }) 
    
    const auth = req.headers.authorization
    
    const token = auth.replace('Bearer', '')

    if(!token) return res.status(403).json( { message: 'Necessário enviar token de acesso!' })

    try {
        const data = jwt.verify(token.trim(), process.env.SECRET);
        const user = await findUserService.findUserService(data.email)
        if (!user) {
          return res.status(403).json({ message: 'Acesso negado!' });
        }
        req.user = user;
        next();
      } catch (error) {
        if (error.message === 'jwt expired') return res.status(403).json({ message: 'Expired token' });
        return res.status(403).json({ message: 'Invalid token' });
      }
}

module.exports = {
    checkExistPassword,
    checkExistEmail,
    checkExistName,
    validEmail,
    checkIfemailIsinUse,
    authentication,
    authorization
}