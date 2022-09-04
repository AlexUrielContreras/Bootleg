const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    img: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },

    caption: {//The top/bottom text to display with the image
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    user_id:{//used to display the username alongside the post
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'post',
  }
);

module.exports = Post;
