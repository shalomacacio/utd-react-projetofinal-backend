module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define( 'videos', {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type:Sequelize.STRING
        },
        categoria: {
            type:Sequelize.INTEGER
        },
        descricao: {
            type:Sequelize.STRING
        },
        imagem: {
            type:Sequelize.TEXT
        }
    });

    return Video;
}
