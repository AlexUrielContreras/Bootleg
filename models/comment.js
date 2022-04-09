const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class comment extends Model {}

comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {//the comment data to display to users
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    user_id: {//the user id of whoever posted said comment. used to display their name next to their comment
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    post_id: {//a place where the comment should be found. 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'comment'
})


module.exports = comment;
