let express = require('express');
let router = new express.Router();

const categorias = require('../controllers/categoriacontroller');
const videos = require('../controllers/videocontroller');

//categorias
router.post('/api/categoria', categorias.createCategoria);
router.get('/api/categoria/:id', categorias.getCategoria);
router.get('/api/categorias', categorias.categorias);
router.put('/api/categoria', categorias.updateCategoria);
router.delete('/api/categoria/:id', categorias.deleteCategoria);

//videos
router.post('/api/video', videos.createVideo);
router.get('/api/video/:id', videos.getVideo);
router.get('/api/videos', videos.videos);
router.put('/api/video', videos.updateVideo);
router.delete('/api/video/:id', videos.deleteVideo);

module.exports = router;
