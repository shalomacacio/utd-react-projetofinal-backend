const db =  require('../config/db.config')
const Video = db.Video;

exports.createVideo = (req, res) => {

    let video = {};

    try {

        video.nome = req.body.titulo;
        video.categoria = req.body.categoria;
        video.email = req.body.descricao;

        Video.create(video, { attributes:  ['id', 'titulo', 'categoria' , 'descricao', 'imagem']
        }).then( result => {
            res.status(200).json(result);
        })
    } catch (error) {
        res.status(500).json({
            message:"Fail",
            error: error.message
        })
        
    }


}


exports.getVideo = (req, res) => {

    video.findByPk(req.params.id, 
        {attributes:  ['id', 'titulo', 'categoria' , 'descricao', 'imagem']})
        .then(video => {
            res.status(200).json(video);
        }).catch(error => {
            console.log(error);

            res.staus(500).json({
                message:"Error !",
                error: error
            });
        });
}

exports.videos = (req, res) => {

    Video.findAll(
        {attributes:  ['id', 'titulo', 'categoria' , 'descricao', 'imagem']})
        .then(videos => {
            res.status(200).json(videos);
        }).catch(error => {
            console.log(error);

            res.staus(500).json({
                message:"Error !",
                error: error
            });
        });
}

exports.deleteVideo = async (req, res) => {

    try {
        let videoId = req.params.id;
        let video = await video.findByPk(videoId);

        if(!video){
            res.status(404).json({
                message: videoId + " Não existe",
                error: "404"
            });
        }else {
            await Video.destroy();
            res.status(200).json('deletado com sucesso.');
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: videoId + " Não é possível deletar",
            error: error.error
        });
    }
}

exports.updateVideo = async (req, res) => {

    try {

        let video = await video.findByPk(req.body.id);

        if(!video){
            res.status(404).json({
                message: videoId + " Não existe",
                error: "404"
            });
        }else {

            let updateObject = {
                nome: req.body.nome,
                nome: req.body.descricao,
            }

            let result = await Video.update(updateObject, 
                {
                    returning: true,
                    where: {id: req.body.id},
                    attributes:  ['id', 'titulo', 'categoria' , 'descricao', 'imagem']

                }
            );

            if(!result) {
                res.status(500).json({
                    message: "Erro não alterou",
                    error: "Não pode ser alterado"
                });
            }

            res.status(200).json(result);
     
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: videoId + " Não é possível deletar",
            error: error.error
        });
    }
}