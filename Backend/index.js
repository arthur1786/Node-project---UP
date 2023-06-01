//configuracao inicial
// Não me resposabilizo por qualquer irritação de usabilidade dessa gambiarra abaixo.
const express = require('express');
const mongoose = require('mongoose')
const uploadRouter = require('./upload'); // Caminho para o arquivo upload.js
const app = express();

const Person = require('./models/Person')

//Ler json - Middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


// Rotas da API - 

// Cadastrar usuário
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// Rota para obter todos os usuarios 
const listUsersRoutes = require('./routes/listUsersRoutes');
app.use('/users', listUsersRoutes);

//Rota para obter usuario pelo codigo
const getUserByCode = require('./routes/getUserByCode');
app.use('/person/code', getUserByCode);

// Rota para listar usuários por critérios
const searchUsersRoutes = require('./routes/searchUsersRoutes');
app.use('/users/search', searchUsersRoutes);

//Rota para editar status e imagem do usuario por codigo
const editUserRoutes = require('./routes/editUser');
app.use('/person/edit', editUserRoutes);

// Rota para excluir usuário pelo código
const deleteUserByCode = require('./routes/deleteUserByCode');
app.use('/person/delete', deleteUserByCode);



//Para Cadastrar a imagem via PostMan
//Selecionar o método POST
//utilizar a rota: http://localhost:3000/upload-profile-image
//selecionar a opcao - Body -> Form Data
//Inserir a Key: profileImage, marcar a opção File, no canto direito de profileImage
//Inserir a imagem desejada no campo "Value"
//Enviar a requisição
app.use(uploadRouter)


//Neste projeto utilizei o Atlas como gerenciador do Banco de dados
// Essas configuracoes sao responsaveis por manter a conexao com o banco, para testar essa api
// deve-se criar uma conta no Atlas e cadastrar com seu usuario e senha do projeto
// assim poderá testar a API 100%
const DB_USER = 'UserAccess'
const DB_PASSWORD = encodeURIComponent('UserPassword')
//
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterpositivotrabalho.0egsdz8.mongodb.net/?retryWrites=true&w=majority`)
.then(()=> {
    console.log("Conectamos ao Banco")
    app.listen(3000)
})
.catch((err) =>console.log(err))


