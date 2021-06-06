const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize( env.database, env.username, env.password ,{
    host: env.host,
    dialect: env.dialect,
    operatorAliases: false,
});

//testa a conexão 
// sequelize.authenticate().then(function(){
//     console.log("Conectado com sucesso")
// }).catch(function(error){
//     console.log("Falha ao se conectar:"+error)
// })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Categoria = require('../models/categoria')(sequelize, Sequelize);
db.Video = require('../models/video')(sequelize, Sequelize);

module.exports = db;