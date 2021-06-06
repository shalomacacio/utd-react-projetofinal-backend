const express = require('express');
const app = express();

var bodyParser = require('body-parser');

global.__basedir = __dirname;

const db = require('./config/db.config');

const Categoria = db.Categoria;

const Video = db.Video;

let router = require('./routes/router');

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

const server = app.listen(8080, function(){
    let host = server.address().address;
    let port = server.address().port;

    console.log("Executando na em http://%s:%s", host , port);
})

db.sequelize.sync({force: true}).then( () => {
   
  Categoria.sync().then( () => {
        const categorias = [
            {nome: 'Comedia', descricao: 'filmes engraçados' },
            {nome: 'Drama', descricao: 'filmes desgraçados' },
            {nome: 'Terror', descricao: 'pra se cagar de medo' },
            {nome: 'Documentario', descricao: 'auto explicativo' },

        ]

        for( let i=0; i<categorias.length; i++){
            Categoria.create(categorias[i]);
        }
    });


    Video.sync().then( () => {
      const videos = [
          {titulo: 'Minha Mãe é uma Peça', categoria:1 ,   descricao: 'sem graça', imagem: 'https://i.pinimg.com/236x/db/76/3c/db763c88aff6f9d276dcac1d7be2adfe--movies-books.jpg' },
          {titulo: 'Marley e Eu ', categoria:1 ,   descricao:'cursos para chorar', imagem: 'https://upload.wikimedia.org/wikipedia/pt/thumb/0/09/Marley_Me_2008.jpg/230px-Marley_Me_2008.jpg' },

      ]

      for( let i=0; i<videos.length; i++){
          Video.create(videos[i]);
      }
  });



});