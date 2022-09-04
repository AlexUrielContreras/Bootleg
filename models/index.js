const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')
//const likes=require("../[DEPRECATED WORK]/likes")
User.hasMany(Post, {
  foreignKey: 'user_id',
});
Post.belongsTo(User, {
  foreignKey: 'user_id',
});
Post.hasMany(Comment,{
  foreignKey:"post_id"
})
Comment.belongsTo(Post,{
  foreignKey:"post_id"
})
User.hasMany(Comment,{
  foreignKey:"user_id"
})
Comment.belongsTo(User,{
  foreignKey:"user_id"
})
/*
likes.belongsTo(Comment,{
  foreignKey:"Comment_id"
})
Comment.hasOne(likes,{
  foreignKey:"Comment_id"
})
likes.belongsTo(Post,{
  foreignKey:"post_id"
})
*/


module.exports = { User, Post,Comment};
