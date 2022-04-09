const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class posts extends Model {}

posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
<<<<<<< HEAD:models/posts.js
    // img: {
    //   type:DataTypes.BLOB,
    //   allowNull: false,
     
    // },
    image_url:{
=======
    image_url: {//the UUID of the post
>>>>>>> parent of 6be9ada (Merge pull request #13 from csnyder332/main):models/Posts.js
      type: DataTypes.STRING,
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
    modelName: 'posts',
  }
);

module.exports = posts;