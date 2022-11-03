const express = require('express');
const signUpRoutes = require('./routes/signUp-routes')
const loginRoutes = require('./routes/login-routes')
const conteudoRoutes = require('./routes/conteudo-routes')

const app = express();

const PORT = 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use(signUpRoutes)
app.use(loginRoutes)
app.use(conteudoRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});