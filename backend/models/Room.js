const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

class Room extends Model {}

Room.init({
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Anonymous'
    }
}, {
    sequelize,
    modelName: 'Room'
});
module.exports = { Room, sequelize };
