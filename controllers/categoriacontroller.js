const db =  require('../config/db.config')
const Categoria = db.Categoria;

exports.createCategoria = (req, res) => {

    let categoria = {};

    try {

        categoria.nome = req.body.nome;
        categoria.email = req.body.descricao;

        Categoria.create(categoria, { attributes: ['id', 'nome', 'descricao']
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


exports.getCategoria = (req, res) => {

    Categoria.findByPk(req.params.id, 
        {attributes: ['id', 'nome', 'descricao']})
        .then(categoria => {
            res.status(200).json(categoria);
        }).catch(error => {
            console.log(error);

            res.staus(500).json({
                message:"Error !",
                error: error
            });
        });
}

exports.categorias = (req, res) => {

    Categoria.findAll(
        {attributes: ['id', 'nome', 'descricao']})
        .then(categorias => {
            res.status(200).json(categorias);
        }).catch(error => {
            console.log(error);

            res.staus(500).json({
                message:"Error !",
                error: error
            });
        });
}

exports.deleteCategoria = async (req, res) => {

    try {
        let categoriaId = req.params.id;
        let categoria = await categoria.findByPk(categoriaId);

        if(!categoria){
            res.status(404).json({
                message: categoriaId + " Não existe",
                error: "404"
            });
        }else {
            await categoria.destroy();
            res.status(200).json('deletado com sucesso.');
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: categoriaId + " Não é possível deletar",
            error: error.error
        });
    }
}

exports.updateCategoria = async (req, res) => {

    try {

        let categoria = await categoria.findByPk(req.body.id);

        if(!categoria){
            res.status(404).json({
                message: categoriaId + " Não existe",
                error: "404"
            });
        }else {

            let updateObject = {
                nome: req.body.nome,
                nome: req.body.descricao,
            }

            let result = await categoria.update(updateObject, 
                {
                    returning: true,
                    where: {id: req.body.id},
                    attributes: ['id', 'nome', 'descricao']

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
            message: categoriaId + " Não é possível deletar",
            error: error.error
        });
    }
}