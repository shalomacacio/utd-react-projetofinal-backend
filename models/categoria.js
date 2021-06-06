module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define( 'categorias', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type:Sequelize.STRING
        },
        descricao: {
            type:Sequelize.STRING
        }
    });

    return Categoria;
}
